import {json,hashPw,checkPw,setUserCookie,userId} from '../../_auth.js';
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
  if(p==='register'){
    const em=String(b.email||'').trim().toLowerCase();
    if(!/^[a-z0-9_]{3,20}$/.test(un))return json({error:'نام کاربری ۳ تا ۲۰ حرف انگلیسی، عدد یا _ باشد.'},400);
    if(em.length>120||!/^[^@\s]{1,64}@[^@\s]{1,200}\.[^@\s]{2,}$/.test(em))return json({error:'ایمیل معتبر نیست.'},400);
    if(pw.length<8||pw.length>72)return json({error:'رمز باید ۸ تا ۷۲ کاراکتر باشد.'},400);
    const dup=()=>json({error:'این نام کاربری یا ایمیل قبلاً ثبت شده.'},409);
    if(await env.DB.prepare('SELECT 1 FROM users WHERE username=? OR email=?').bind(un,em).first())return dup();
    try{
      const r=await env.DB.prepare('INSERT INTO users (username,email,pw,created) VALUES (?,?,?,?)').bind(un,em,await hashPw(pw),Date.now()).run();
      const id=r.meta.last_row_id;
      return json({ok:true,user:{id,username:un}},200,{'set-cookie':await setUserCookie(env,id)});
    }catch(e){return dup()}
  }
  if(p==='login'){
    await new Promise(r=>setTimeout(r,500));
    const u=await env.DB.prepare('SELECT id,username,pw FROM users WHERE username=?').bind(un).first();
    if(!u||!(await checkPw(pw,u.pw)))return json({error:'نام کاربری یا رمز اشتباه است.'},401);
    return json({ok:true,user:{id:u.id,username:u.username}},200,{'set-cookie':await setUserCookie(env,u.id)});
  }
  return json({error:'nf'},404);
}
