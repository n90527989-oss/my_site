const enc=new TextEncoder();
export const hex=b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('');
export const unhex=h=>new Uint8Array((h.match(/../g)||[]).map(x=>parseInt(x,16)));
const key=(s,u,hash='SHA-256')=>crypto.subtle.importKey('raw',typeof s==='string'?enc.encode(s):s,{name:'HMAC',hash},false,u);
export const json=(o,s=200,h={})=>new Response(JSON.stringify(o),{status:s,headers:{'content-type':'application/json','cache-control':'no-store',...h}});
export async function mac(secret,m){return crypto.subtle.sign('HMAC',await key(secret,['sign']),enc.encode(m))}
export function eq(a,b){a=String(a);b=String(b);if(a.length!==b.length)return false;let d=0;for(let i=0;i<a.length;i++)d|=a.charCodeAt(i)^b.charCodeAt(i);return d===0}

/* ---------- passwords ---------- */
export async function hashPw(pw,saltHex){
  const salt=saltHex?unhex(saltHex):crypto.getRandomValues(new Uint8Array(16));
  const k=await crypto.subtle.importKey('raw',enc.encode(pw),'PBKDF2',false,['deriveBits']);
  const bits=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt,iterations:100000},k,256);
  return hex(salt)+':'+hex(bits);
}
export async function checkPw(pw,stored){return eq(await hashPw(pw,stored.split(':')[0]),stored)}

/* ---------- user session ---------- */
export async function setUserCookie(env,id){
  const r=await env.DB.prepare('SELECT sv FROM users WHERE id=?').bind(id).first(),sv=r?(+r.sv||0):0;
  const exp=Date.now()+30*864e5,sig=hex(await mac(env.SESSION_SECRET,'u'+id+'.'+exp+'.'+sv));
  return `usr=${id}.${exp}.${sv}.${sig}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=2592000`;
}
/* session = id.exp.version.sig ; the version (users.sv) rises on password change, which ends every older session.
   Old cookies (id.exp.sig) are still accepted while the version is 0. */
export async function userId(req,env){
  const c=req.headers.get('cookie')||'';
  let m=c.match(/(?:^|; )usr=(\d+)\.(\d+)\.(\d+)\.([0-9a-f]{64})/),id,exp,sv,sig,msg;
  if(m){id=m[1];exp=m[2];sv=+m[3];sig=m[4];msg='u'+id+'.'+exp+'.'+sv}
  else{m=c.match(/(?:^|; )usr=(\d+)\.(\d+)\.([0-9a-f]{64})/);if(!m)return 0;id=m[1];exp=m[2];sv=0;sig=m[3];msg='u'+id+'.'+exp}
  if(+exp<Date.now()||!env.SESSION_SECRET||!env.DB)return 0;
  if(!eq(hex(await mac(env.SESSION_SECRET,msg)),sig))return 0;
  try{const r=await env.DB.prepare('SELECT sv FROM users WHERE id=?').bind(+id).first();return r&&(+r.sv||0)===sv?+id:0}catch(e){return 0}
}

/* ---------- key/value (kv table) ---------- */
export async function kvGet(env,k){const r=await env.DB.prepare('SELECT v FROM kv WHERE k=?').bind(k).first();return r?r.v:null}
export const kvSet=(env,k,v)=>env.DB.prepare('INSERT OR REPLACE INTO kv (k,v) VALUES (?,?)').bind(k,String(v)).run();
export const kvDel=(env,k)=>env.DB.prepare('DELETE FROM kv WHERE k=?').bind(k).run();

/* ---------- admin session (versioned: "logout everywhere" bumps the version) ---------- */
export async function adminVer(env){return +(await kvGet(env,'sv'))||0}
export async function adminCookie(env){
  const exp=Date.now()+12*3600e3,ver=await adminVer(env),sig=hex(await mac(env.SESSION_SECRET,'a'+exp+'.'+ver));
  return `adm=${exp}.${ver}.${sig}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=43200`;
}
export const adminClear='adm=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0';
export async function adminOk(req,env){
  const m=(req.headers.get('cookie')||'').match(/(?:^|; )adm=(\d+)\.(\d+)\.([0-9a-f]{64})/);
  if(!m||+m[1]<Date.now()||!env.SESSION_SECRET||!env.DB)return false;
  if(!eq(hex(await mac(env.SESSION_SECRET,'a'+m[1]+'.'+m[2])),m[3]))return false;
  try{return +m[2]===await adminVer(env)}catch(e){return false}
}

/* ---------- client info, security log, rate limit ---------- */
export const ip=req=>(req.headers.get('cf-connecting-ip')||'unknown').slice(0,64);
export async function slog(env,req,type,info){
  try{
    await env.DB.prepare('INSERT INTO sec_log (t,type,ip,ua,info) VALUES (?,?,?,?,?)').bind(Date.now(),type,ip(req),(req.headers.get('user-agent')||'').slice(0,160),String(info||'').slice(0,200)).run();
    if(Math.random()<.02)await env.DB.prepare('DELETE FROM sec_log WHERE id<(SELECT MAX(id)-1500 FROM sec_log)').run();
  }catch(e){}
}
export async function rlGet(env,k,win){const r=await env.DB.prepare('SELECT n,t FROM rl WHERE k=?').bind(k).first();return r&&Date.now()-r.t<win*1000?r.n:0}
/* atomic: one SQL statement counts the hit and returns the new count (no read-then-write race) */
export async function rlInc(env,k,win){
  const now=Date.now(),w=win*1000;
  if(Math.random()<.02)await env.DB.prepare('DELETE FROM rl WHERE t<?').bind(now-864e5).run();
  const r=await env.DB.prepare('INSERT INTO rl (k,n,t) VALUES (?,1,?) ON CONFLICT(k) DO UPDATE SET n=CASE WHEN excluded.t-rl.t>=? THEN 1 ELSE rl.n+1 END, t=CASE WHEN excluded.t-rl.t>=? THEN excluded.t ELSE rl.t END RETURNING n').bind(k,now,w,w).first();
  return r?r.n:1;
}
export const rlClear=(env,k)=>env.DB.prepare('DELETE FROM rl WHERE k=?').bind(k).run();
/* counts this request; true when the caller went over `max` inside `win` seconds */
export async function limited(env,req,name,max,win){return (await rlInc(env,name+':'+ip(req),win))>max}

/* ---------- TOTP (RFC 6238, Google Authenticator compatible) ---------- */
const B32='ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
export function newSecret(){let bits='';for(const x of crypto.getRandomValues(new Uint8Array(20)))bits+=x.toString(2).padStart(8,'0');let s='';for(let i=0;i<160;i+=5)s+=B32[parseInt(bits.slice(i,i+5),2)];return s}
function b32dec(s){let bits='';for(const c of s.toUpperCase().replace(/[^A-Z2-7]/g,''))bits+=B32.indexOf(c).toString(2).padStart(5,'0');const o=[];for(let i=0;i+8<=bits.length;i+=8)o.push(parseInt(bits.slice(i,i+8),2));return new Uint8Array(o)}
async function hotp(secret,counter){
  const buf=new ArrayBuffer(8);new DataView(buf).setUint32(4,counter);
  const h=new Uint8Array(await crypto.subtle.sign('HMAC',await key(b32dec(secret),['sign'],'SHA-1'),buf)),o=h[19]&15;
  return String((((h[o]&127)<<24)|(h[o+1]<<16)|(h[o+2]<<8)|h[o+3])%1e6).padStart(6,'0');
}
/* returns the matched time-step (>0) or 0; a step can only be used once (see kv 'totp_last') */
export async function totpCheck(env,secret,code){
  code=String(code||'').replace(/\s/g,'');if(!/^\d{6}$/.test(code))return 0;
  const c=Math.floor(Date.now()/30000),last=+(await kvGet(env,'totp_last'))||0;
  for(const d of[0,-1,1])if(c+d>last&&eq(await hotp(secret,c+d),code)){await kvSet(env,'totp_last',c+d);return c+d}
  return 0;
}
