const enc=new TextEncoder();
const hex=b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('');
const unhex=h=>new Uint8Array(h.match(/../g).map(x=>parseInt(x,16)));
const key=s=>crypto.subtle.importKey('raw',enc.encode(s),{name:'HMAC',hash:'SHA-256'},false,['sign','verify']);
const mac=async(s,m)=>crypto.subtle.sign('HMAC',await key(s),enc.encode(m));
const json=(o,s=200,h={})=>new Response(JSON.stringify(o),{status:s,headers:{'content-type':'application/json','cache-control':'no-store',...h}});
async function authed(req,env){
  const m=(req.headers.get('cookie')||'').match(/(?:^|; )adm=(\d+)\.([0-9a-f]{64})/);
  if(!m||+m[1]<Date.now())return false;
  try{return await crypto.subtle.verify('HMAC',await key(env.SESSION_SECRET),unhex(m[2]),enc.encode(m[1]))}catch(e){return false}
}
async function samePw(a,env){
  const x=await mac(env.SESSION_SECRET,'pw:'+a),y=await mac(env.SESSION_SECRET,'pw:'+env.ADMIN_PASSWORD);
  return crypto.subtle.timingSafeEqual(x,y);
}
export async function onRequest({request,env,params}){
  if(!env.ADMIN_PASSWORD||!env.SESSION_SECRET||!env.DB)return json({error:'setup'},500);
  const path=(params.path||[]).join('/'),method=request.method;
  if(path==='login'&&method==='POST'){
    let b={};try{b=await request.json()}catch(e){}
    await new Promise(r=>setTimeout(r,600));
    if(!(await samePw(String(b.password||''),env)))return json({error:'bad'},401);
    const exp=String(Date.now()+12*3600e3),sig=hex(await mac(env.SESSION_SECRET,exp));
    return json({ok:true},200,{'set-cookie':`adm=${exp}.${sig}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=43200`});
  }
  if(path==='logout')return json({ok:true},200,{'set-cookie':'adm=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0'});
  if(!(await authed(request,env)))return json({error:'auth'},401);
  if(path==='me')return json({ok:true});
  if(path==='config'){
    if(method==='GET'){const r=await env.DB.prepare("SELECT v FROM kv WHERE k='config'").first();return json(r?JSON.parse(r.v):{})}
    if(method==='PUT'){
      const b=await request.json();
      const c={
        banner:{on:!!(b.banner&&b.banner.on),text:String((b.banner&&b.banner.text)||'').slice(0,200),color:String((b.banner&&b.banner.color)||'#0fae78').slice(0,9)},
        hero:{title:String((b.hero&&b.hero.title)||'').slice(0,120),sub:String((b.hero&&b.hero.sub)||'').slice(0,300)},
        faq:(Array.isArray(b.faq)?b.faq:[]).slice(0,40).map(i=>({q:String(i.q||'').slice(0,200),a:String(i.a||'').slice(0,1500)})).filter(i=>i.q&&i.a),
        hidden:(Array.isArray(b.hidden)?b.hidden:[]).slice(0,200).map(s=>String(s).toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,12)).filter(Boolean)
      };
      await env.DB.prepare("INSERT OR REPLACE INTO kv (k,v) VALUES ('config',?)").bind(JSON.stringify(c)).run();
      return json({ok:true});
    }
  }
  if(path==='tickets'&&method==='GET'){
    const r=await env.DB.prepare("SELECT id,name,contact,message,status,created FROM tickets ORDER BY created DESC LIMIT 300").all();
    return json(r.results);
  }
  if(path.startsWith('tickets/')){
    const id=decodeURIComponent(path.slice(8));
    if(method==='PATCH'){const b=await request.json();const st=['new','open','done'].includes(b.status)?b.status:'open';
      await env.DB.prepare("UPDATE tickets SET status=? WHERE id=?").bind(st,id).run();return json({ok:true})}
    if(method==='DELETE'){await env.DB.prepare("DELETE FROM tickets WHERE id=?").bind(id).run();return json({ok:true})}
  }
  return json({error:'nf'},404);
}
