const enc=new TextEncoder();
export const hex=b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('');
export const unhex=h=>new Uint8Array((h.match(/../g)||[]).map(x=>parseInt(x,16)));
const key=(s,u)=>crypto.subtle.importKey('raw',enc.encode(s),{name:'HMAC',hash:'SHA-256'},false,u);
export const json=(o,s=200,h={})=>new Response(JSON.stringify(o),{status:s,headers:{'content-type':'application/json','cache-control':'no-store',...h}});
export async function mac(secret,m){return crypto.subtle.sign('HMAC',await key(secret,['sign']),enc.encode(m))}
function eq(a,b){if(a.length!==b.length)return false;let d=0;for(let i=0;i<a.length;i++)d|=a.charCodeAt(i)^b.charCodeAt(i);return d===0}
export async function hashPw(pw,saltHex){
  const salt=saltHex?unhex(saltHex):crypto.getRandomValues(new Uint8Array(16));
  const k=await crypto.subtle.importKey('raw',enc.encode(pw),'PBKDF2',false,['deriveBits']);
  const bits=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt,iterations:100000},k,256);
  return hex(salt)+':'+hex(bits);
}
export async function checkPw(pw,stored){return eq(await hashPw(pw,stored.split(':')[0]),stored)}
export async function setUserCookie(env,id){
  const exp=Date.now()+30*864e5,sig=hex(await mac(env.SESSION_SECRET,'u'+id+'.'+exp));
  return `usr=${id}.${exp}.${sig}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=2592000`;
}
export async function userId(req,env){
  const m=(req.headers.get('cookie')||'').match(/(?:^|; )usr=(\d+)\.(\d+)\.([0-9a-f]{64})/);
  if(!m||+m[2]<Date.now()||!env.SESSION_SECRET)return 0;
  return eq(hex(await mac(env.SESSION_SECRET,'u'+m[1]+'.'+m[2])),m[3])?+m[1]:0;
}
export async function adminOk(req,env){
  const m=(req.headers.get('cookie')||'').match(/(?:^|; )adm=(\d+)\.([0-9a-f]{64})/);
  if(!m||+m[1]<Date.now()||!env.SESSION_SECRET)return false;
  try{return await crypto.subtle.verify('HMAC',await key(env.SESSION_SECRET,['verify']),unhex(m[2]),enc.encode(m[1]))}catch(e){return false}
}
