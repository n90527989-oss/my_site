import {adminOk} from './_auth.js';

/* ============ 1) database schema: created / upgraded automatically (once per isolate) ============ */
const TABLES=[
 'CREATE TABLE IF NOT EXISTS kv (k TEXT PRIMARY KEY, v TEXT NOT NULL)',
 "CREATE TABLE IF NOT EXISTS tickets (id TEXT PRIMARY KEY, name TEXT, contact TEXT, message TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'new', created INTEGER NOT NULL, user_id INTEGER, subject TEXT)",
 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, email TEXT UNIQUE NOT NULL, pw TEXT NOT NULL, created INTEGER NOT NULL, favs TEXT)',
 'CREATE TABLE IF NOT EXISTS pending (email TEXT PRIMARY KEY, username TEXT, pw TEXT, code TEXT NOT NULL, tries INTEGER NOT NULL DEFAULT 0, created INTEGER NOT NULL)',
 'CREATE TABLE IF NOT EXISTS alerts (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, coin TEXT NOT NULL, dir TEXT NOT NULL, price REAL NOT NULL, cur TEXT NOT NULL, done INTEGER NOT NULL DEFAULT 0, created INTEGER NOT NULL)',
 'CREATE TABLE IF NOT EXISTS ticket_msgs (id INTEGER PRIMARY KEY AUTOINCREMENT, ticket_id TEXT NOT NULL, author TEXT NOT NULL, body TEXT NOT NULL, created INTEGER NOT NULL)',
 'CREATE TABLE IF NOT EXISTS sec_log (id INTEGER PRIMARY KEY AUTOINCREMENT, t INTEGER NOT NULL, type TEXT NOT NULL, ip TEXT, ua TEXT, info TEXT)',
 'CREATE TABLE IF NOT EXISTS rl (k TEXT PRIMARY KEY, n INTEGER NOT NULL, t INTEGER NOT NULL)'
];
const COLS=[['tickets','user_id','INTEGER'],['tickets','subject','TEXT'],['users','favs','TEXT']];
const INDEXES=[
 'CREATE INDEX IF NOT EXISTS i_tk_user ON tickets(user_id)','CREATE INDEX IF NOT EXISTS i_msg_tk ON ticket_msgs(ticket_id)',
 'CREATE INDEX IF NOT EXISTS i_al_user ON alerts(user_id)','CREATE INDEX IF NOT EXISTS i_log_t ON sec_log(t)'
];
let ready=null;
function schema(env){
  return ready||(ready=(async()=>{
    await env.DB.batch(TABLES.map(q=>env.DB.prepare(q)));
    for(const [t,c,ty] of COLS){
      const r=await env.DB.prepare(`PRAGMA table_info(${t})`).all();
      if(!r.results.some(x=>x.name===c)){try{await env.DB.prepare(`ALTER TABLE ${t} ADD COLUMN ${c} ${ty}`).run()}catch(e){}}
    }
    await env.DB.batch(INDEXES.map(q=>env.DB.prepare(q)));
  })().catch(e=>{ready=null;throw e}));
}

/* ============ 2) live flags (maintenance, banned IPs) cached 15 s per isolate ============ */
let FL={t:0,maint:false,ban:new Set()};
async function flags(env){
  if(Date.now()-FL.t<15000)return FL;
  try{
    const r=await env.DB.prepare("SELECT k,v FROM kv WHERE k IN ('maint','ban')").all(),o={t:Date.now(),maint:false,ban:new Set()};
    for(const x of r.results){if(x.k==='maint')o.maint=x.v==='1';if(x.k==='ban'){try{JSON.parse(x.v).forEach(i=>o.ban.add(i))}catch(e){}}}
    FL=o;
  }catch(e){FL.t=Date.now()}
  return FL;
}

/* ============ 3) security headers ============ */
const CSP=[
 "default-src 'self'","base-uri 'self'","object-src 'none'","frame-ancestors 'none'","form-action 'self'",
 "script-src 'self' 'unsafe-inline'","style-src 'self' 'unsafe-inline' https://fonts.googleapis.com","font-src 'self' https://fonts.gstatic.com data:",
 "img-src 'self' data: https://s2.coinmarketcap.com https://assets.coincap.io https://cdn.jsdelivr.net",
 "connect-src 'self' https://api.bitpin.ir https://api.bitpin.org https://text.pollinations.ai https://api.groq.com https://generativelanguage.googleapis.com https://api.anthropic.com",
 'upgrade-insecure-requests'
].join('; ');
function sec(r,admin){
  const h=new Headers(r.headers),ct=h.get('content-type')||'';
  h.set('X-Content-Type-Options','nosniff');h.set('X-Frame-Options','DENY');h.set('Referrer-Policy','strict-origin-when-cross-origin');
  h.set('Permissions-Policy','camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()');
  h.set('Strict-Transport-Security','max-age=31536000');h.set('Cross-Origin-Opener-Policy','same-origin');h.set('Cross-Origin-Resource-Policy','same-origin');
  h.delete('X-Powered-By');
  if(ct.includes('text/html'))h.set('Content-Security-Policy',CSP);
  if(admin){h.set('Cache-Control','no-store');h.set('X-Robots-Tag','noindex, nofollow')}
  else if(!h.has('Cache-Control')||/max-age=\d{4,}/.test(h.get('Cache-Control')))if(/text\/html|javascript|text\/css/.test(ct))h.set('Cache-Control','no-cache');
  return new Response(r.status===101||r.status===204||r.status===304?null:r.body,{status:r.status,statusText:r.statusText,headers:h});
}
const text=(t,s)=>sec(new Response(t,{status:s,headers:{'content-type':'text/plain;charset=utf-8','cache-control':'no-store'}}));

/* ============ 4) junk / scanner paths and private files ============ */
const BAD=/(^|\/)\.(?!well-known)|\.(sql|md|mdsite|bak|old|log|env|php\d?|asp|aspx|jsp|cgi|ini|ya?ml|toml|map|sh|git)(\/|$)|^\/(functions|db|node_modules|wp-[a-z]+|phpmyadmin|pma|xmlrpc|cgi-bin|vendor)(\/|$)|\(schema/i;

const MAINT=`<!DOCTYPE html>
<html lang="fa" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex"><meta http-equiv="refresh" content="120"><title>در حال به‌روزرسانی</title>
<style>
:root{--bg:#f4f7f9;--ink:#101b25;--mu:#64748a;--ac:#0fae78;--ed:#e0e6eb;color-scheme:light}
@media(prefers-color-scheme:dark){:root{--bg:#080b0e;--ink:#eaf0f3;--mu:#8a96a2;--ac:#1bc48a;--ed:#232d36;color-scheme:dark}}
*{box-sizing:border-box}html,body{height:100%}
body{margin:0;display:grid;place-items:center;padding:24px;background:var(--bg);color:var(--ink);font:16px/1.9 Vazirmatn,Tahoma,sans-serif;text-align:center}
main{max-width:420px}
.g{width:84px;height:84px;margin:0 auto 22px;border-radius:50%;border:4px solid var(--ed);border-top-color:var(--ac);animation:s 1.1s linear infinite;display:grid;place-items:center}
.g::after{content:"";width:34px;height:34px;border-radius:50%;background:var(--ac);opacity:.2;animation:p 1.6s ease-in-out infinite}
@keyframes s{to{transform:rotate(360deg)}}@keyframes p{50%{transform:scale(1.5);opacity:.05}}
h1{font-size:1.5rem;margin:0 0 8px}p{margin:0;color:var(--mu)}
@media(prefers-reduced-motion:reduce){.g,.g::after{animation:none}}
</style></head><body><main role="status"><div class="g" aria-hidden="true"></div><h1>در حال به‌روزرسانی</h1><p>در حال بهتر کردن سایت هستیم. کمی بعد دوباره سر بزن؛ این صفحه خودش هم تازه می‌شود.</p></main></body></html>
`;

export async function onRequest(ctx){
  const {request,env}=ctx,url=new URL(request.url),p=url.pathname;
  let dp=p;try{dp=decodeURIComponent(p)}catch(e){return text('Bad request',400)}
  if(BAD.test(dp))return text('Not found',404);
  const admin=p==='/admin'||p.startsWith('/admin/')||p==='/admin.html'||p.startsWith('/api/admin');
  if(env.DB){
    try{await schema(env)}catch(e){}
    const f=await flags(env),ip=request.headers.get('cf-connecting-ip')||'';
    if(ip&&f.ban.has(ip))return text('Forbidden',403);
    if(f.maint&&!admin&&!(await adminOk(request,env))){
      if(p.startsWith('/api/'))return sec(new Response('{"error":"maintenance"}',{status:503,headers:{'content-type':'application/json','retry-after':'300','cache-control':'no-store'}}));
      if(request.method==='GET'&&(/\.html$/.test(p)||!/\.[a-z0-9]{2,5}$/i.test(p)))
        return sec(new Response(MAINT,{status:503,headers:{'content-type':'text/html;charset=utf-8','retry-after':'300','cache-control':'no-store'}}));
    }
  }
  let r;try{r=await ctx.next()}catch(e){return text('Server error',500)}
  return sec(r,admin);
}
