import {json,hex,mac,hashPw,checkPw,setUserCookie,userId,limited,rlGet,rlInc,rlClear,ip,slog} from '../../_auth.js';
async function sendCode(env,em,code){
  if(!env.MAIL_URL||!env.MAIL_KEY)return false;
  try{
    const r=await fetch(env.MAIL_URL,{method:'POST',redirect:'follow',headers:{'content-type':'text/plain'},body:JSON.stringify({key:env.MAIL_KEY,to:em,subject:'کد تایید: '+code,html:'<div dir="rtl" style="font-family:Tahoma,sans-serif;font-size:16px">کد تایید شما:<br><b style="font-size:28px;letter-spacing:4px;direction:ltr;display:inline-block">'+code+'</b><br>این کد ۱۰ دقیقه اعتبار دارد.</div>'})});
    return (await r.text()).trim()==='ok';
  }catch(e){return false}
}
const newCode=()=>String(crypto.getRandomValues(new Uint32Array(1))[0]%1000000).padStart(6,'0');
const codeHash=async(env,em,code)=>hex(await mac(env.SESSION_SECRET,'c'+em+'.'+code));
export async function onRequest({request,env,params}){
  if(!env.DB||!env.SESSION_SECRET)return json({error:'setup'},500);
  const p=(params.path||[]).join('/'),m=request.method;
  if(p==='me'){
    const id=await userId(request,env);if(!id)return json({user:null});
    return json({user:(await env.DB.prepare('SELECT id,username FROM users WHERE id=?').bind(id).first())||null});
  }
  if(p==='logout')return json({ok:true},200,{'set-cookie':'usr=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0'});
  if(m!=='POST')return json({error:'nf'},404);
  let b={};try{b=await request.json()}catch(e){}
  const un=String(b.username||'').trim().toLowerCase(),pw=String(b.password||'');
  if(p==='send-code'){
    if(await limited(env,request,'sc',6,3600)){await slog(env,request,'rate_limited','ارسال کد');return json({error:'درخواست‌های زیادی فرستادی؛ بعداً تلاش کن.'},429)}
    const em=String(b.email||'').trim().toLowerCase();
    if(em.length>120||!/^[^@\s]{1,64}@[^@\s]{1,200}\.[^@\s]{2,}$/.test(em))return json({error:'ایمیل معتبر نیست.'},400);
    if(await env.DB.prepare('SELECT 1 FROM users WHERE email=?').bind(em).first())return json({error:'این ایمیل قبلاً ثبت شده.'},409);
    const old=await env.DB.prepare('SELECT created FROM pending WHERE email=?').bind(em).first();
    if(old&&Date.now()-old.created<60000)return json({error:'کمی صبر کن و دوباره تلاش کن.',wait:Math.ceil((60000-(Date.now()-old.created))/1000)},429);
    const n=await env.DB.prepare('SELECT COUNT(*) c FROM pending WHERE created>?').bind(Date.now()-36e5).first();
    if(n.c>=60)return json({error:'ظرفیت ارسال کد پر است؛ کمی بعد تلاش کن.'},429);
    const code=newCode();
    await env.DB.prepare("INSERT OR REPLACE INTO pending (email,username,pw,code,tries,created) VALUES (?,'','',?,0,?)").bind(em,await codeHash(env,em,code),Date.now()).run();
    if(!(await sendCode(env,em,code))){
      await env.DB.prepare('DELETE FROM pending WHERE email=?').bind(em).run();
      return json({error:'ارسال ایمیل ناموفق بود. بعداً دوباره تلاش کن.'},502);
    }
    return json({ok:true,wait:60});
  }
  if(p==='register'){
    if(await limited(env,request,'rg',12,3600)){await slog(env,request,'rate_limited','ثبت‌نام');return json({error:'تلاش‌های زیاد؛ بعداً دوباره امتحان کن.'},429)}
    const em=String(b.email||'').trim().toLowerCase(),code=String(b.code||'').trim();
    if(!/^[a-z0-9_]{3,20}$/.test(un))return json({error:'نام کاربری ۳ تا ۲۰ حرف انگلیسی، عدد یا _ باشد.'},400);
    if(em.length>120||!/^[^@\s]{1,64}@[^@\s]{1,200}\.[^@\s]{2,}$/.test(em))return json({error:'ایمیل معتبر نیست.'},400);
    if(pw.length<8||pw.length>72)return json({error:'رمز باید ۸ تا ۷۲ کاراکتر باشد.'},400);
    if(!/^\d{6}$/.test(code))return json({error:'کد ۶ رقمی ایمیل را وارد کن.'},400);
    const row=await env.DB.prepare('SELECT code,tries,created FROM pending WHERE email=?').bind(em).first();
    if(!row||Date.now()-row.created>600000)return json({error:'کد منقضی شده یا ارسال نشده؛ دوباره کد بگیر.'},400);
    if(row.tries>=5){await env.DB.prepare('DELETE FROM pending WHERE email=?').bind(em).run();return json({error:'تلاش‌های زیاد؛ دوباره کد بگیر.'},429)}
    if(await codeHash(env,em,code)!==row.code){
      await env.DB.prepare('UPDATE pending SET tries=tries+1 WHERE email=?').bind(em).run();
      return json({error:'کد اشتباه است.'},400);
    }
    if(await env.DB.prepare('SELECT 1 FROM users WHERE username=? OR email=?').bind(un,em).first())return json({error:'این نام کاربری یا ایمیل قبلاً ثبت شده.'},409);
    try{
      const r=await env.DB.prepare('INSERT INTO users (username,email,pw,created) VALUES (?,?,?,?)').bind(un,em,await hashPw(pw),Date.now()).run();
      await env.DB.prepare('DELETE FROM pending WHERE email=?').bind(em).run();
      const id=r.meta.last_row_id;
      return json({ok:true,user:{id,username:un}},200,{'set-cookie':await setUserCookie(env,id)});
    }catch(e){return json({error:'این نام کاربری یا ایمیل قبلاً ثبت شده.'},409)}
  }
  if(p==='login'){
    const kI='ui:'+ip(request),kU='ul:'+un.slice(0,40);
    if(await rlGet(env,kI,900)>=15||await rlGet(env,kU,900)>=6){await slog(env,request,'rate_limited','قفل ورود کاربر: '+un.slice(0,30));return json({error:'تلاش‌های ناموفق زیاد بود؛ ۱۵ دقیقه بعد دوباره امتحان کن.'},429)}
    await new Promise(r=>setTimeout(r,500));
    const u=await env.DB.prepare('SELECT id,username,pw FROM users WHERE username=?').bind(un).first();
    if(!u||!(await checkPw(pw,u.pw))){await rlInc(env,kI,900);await rlInc(env,kU,900);await slog(env,request,'user_login_fail',un.slice(0,30));return json({error:'نام کاربری یا رمز اشتباه است.'},401)}
    await rlClear(env,kU);
    return json({ok:true,user:{id:u.id,username:u.username}},200,{'set-cookie':await setUserCookie(env,u.id)});
  }
  return json({error:'nf'},404);
}
