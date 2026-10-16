import {json,mac,eq,hex,adminOk,adminCookie,adminClear,adminVer,kvGet,kvSet,kvDel,ip,slog,rlGet,rlInc,rlClear,newSecret,totpCheck} from '../../_auth.js';
const WIN=900,MAXFAIL=5;               // 5 wrong attempts per IP -> locked for 15 minutes
const IPRX=/^[0-9a-fA-F:.]{3,45}$/;
async function samePw(a,env){return eq(hex(await mac(env.SESSION_SECRET,'pw:'+a)),hex(await mac(env.SESSION_SECRET,'pw:'+env.ADMIN_PASSWORD)))}
async function body(req){try{return await req.json()}catch(e){return {}}}
function strength(pw){pw=String(pw||'');return pw.length>=12&&/[a-z]/.test(pw)&&/[A-Z]/.test(pw)&&/\d/.test(pw)&&/[^A-Za-z0-9]/.test(pw)}

export async function onRequest({request,env,params}){
  if(!env.ADMIN_PASSWORD||!env.SESSION_SECRET||!env.DB)return json({error:'setup'},500);
  const path=(params.path||[]).join('/'),method=request.method,me=ip(request);

  /* ---------- login ---------- */
  if(path==='login'&&method==='POST'){
    const b=await body(request),lk='adm:'+me;
    if(await rlGet(env,lk,WIN)>=MAXFAIL){await slog(env,request,'admin_locked','ورود در حالت قفل');return json({error:'locked'},429)}
    await new Promise(r=>setTimeout(r,600));
    const fail=async(type,info)=>{const n=await rlInc(env,lk,WIN);await slog(env,request,type,info);return json({error:n>=MAXFAIL?'locked':'bad'},n>=MAXFAIL?429:401)};
    if(!(await samePw(String(b.password||''),env)))return fail('admin_login_fail','رمز اشتباه');
    const totp=await kvGet(env,'totp');
    if(totp&&env.ADMIN_2FA_OFF!=='1'){
      if(!b.code)return json({need2fa:true});
      if(!(await totpCheck(env,totp,b.code)))return fail('admin_2fa_fail','کد دومرحله‌ای اشتباه');
    }
    await rlClear(env,lk);await slog(env,request,'admin_login_ok','');
    return json({ok:true},200,{'set-cookie':await adminCookie(env)});
  }
  if(path==='logout')return json({ok:true},200,{'set-cookie':adminClear});
  if(!(await adminOk(request,env)))return json({error:'auth'},401);
  if(path==='me')return json({ok:true});

  /* ---------- security panel ---------- */
  if(path==='security'&&method==='GET'){
    const day=Date.now()-864e5,cnt=async t=>(await env.DB.prepare('SELECT COUNT(*) c FROM sec_log WHERE type=? AND t>?').bind(t,day).first()).c;
    const twofa=!!(await kvGet(env,'totp')),maint=(await kvGet(env,'maint'))==='1';
    let ban=[];try{ban=JSON.parse((await kvGet(env,'ban'))||'[]')}catch(e){}
    const logs=(await env.DB.prepare('SELECT t,type,ip,info FROM sec_log ORDER BY id DESC LIMIT 80').all()).results;
    return json({twofa,maint,ban,logs,me,
      stats:{fail:await cnt('admin_login_fail')+await cnt('admin_2fa_fail'),locked:await cnt('admin_locked'),userfail:await cnt('user_login_fail'),limited:await cnt('rate_limited')},
      checks:[
        {t:'کلید نشست (SESSION_SECRET) تنظیم شده و قوی است',ok:String(env.SESSION_SECRET).length>=32,tip:'یک رشتهٔ تصادفی حداقل ۳۲ کاراکتری در Cloudflare بگذار.'},
        {t:'رمز مدیریت قوی است (۱۲+ کاراکتر، حروف بزرگ و کوچک، عدد و نماد)',ok:strength(env.ADMIN_PASSWORD),tip:'متغیر ADMIN_PASSWORD را قوی‌تر کن.'},
        {t:'ورود دومرحله‌ای (2FA) فعال است',ok:twofa,tip:'از بخش «ورود دومرحله‌ای» پایین همین صفحه فعالش کن.'},
        {t:'قفل خودکار بعد از ۵ تلاش اشتباه فعال است',ok:true},
        {t:'هدرهای امنیتی (CSP، HSTS، ضد کلیک‌دزدی) فعال است',ok:true},
        {t:'ایمیل کد تأیید ثبت‌نام تنظیم شده (MAIL_URL / MAIL_KEY)',ok:!!(env.MAIL_URL&&env.MAIL_KEY),tip:'بدون آن ثبت‌نام کاربر کار نمی‌کند.'},
        {t:'حالت بازگشت اضطراری 2FA خاموش است (ADMIN_2FA_OFF)',ok:env.ADMIN_2FA_OFF!=='1',tip:'این متغیر را بعد از استفاده حذف کن.'}
      ]});
  }
  if(path.startsWith('security/')&&method==='POST'){
    const sub=path.slice(9),b=await body(request);
    if(sub==='logout-all'){await kvSet(env,'sv',(await adminVer(env))+1);await slog(env,request,'admin_action','خروج همهٔ نشست‌ها');return json({ok:true},200,{'set-cookie':await adminCookie(env)})}
    if(sub==='maint'){await kvSet(env,'maint',b.on?'1':'0');await slog(env,request,'admin_action','حالت بروزرسانی: '+(b.on?'روشن':'خاموش'));return json({ok:true})}
    if(sub==='ban'){
      const a=String(b.ip||'').trim();if(!IPRX.test(a))return json({error:'IP معتبر نیست.'},400);if(a===me)return json({error:'نمی‌توانی IP خودت را مسدود کنی.'},400);
      let l=[];try{l=JSON.parse((await kvGet(env,'ban'))||'[]')}catch(e){}
      if(!l.includes(a))l.push(a);await kvSet(env,'ban',JSON.stringify(l.slice(-300)));await slog(env,request,'admin_action','مسدود شد: '+a);return json({ok:true});
    }
    if(sub==='unban'){
      const a=String(b.ip||'');let l=[];try{l=JSON.parse((await kvGet(env,'ban'))||'[]')}catch(e){}
      await kvSet(env,'ban',JSON.stringify(l.filter(x=>x!==a)));await slog(env,request,'admin_action','آزاد شد: '+a);return json({ok:true});
    }
    if(sub==='clear-logs'){await env.DB.prepare('DELETE FROM sec_log').run();return json({ok:true})}
    if(sub==='unlock'){await env.DB.prepare("DELETE FROM rl WHERE k LIKE 'adm:%' OR k LIKE 'ul:%' OR k LIKE 'ui:%'").run();return json({ok:true})}
    if(sub==='2fa/setup'){
      if(await kvGet(env,'totp'))return json({error:'2FA از قبل فعال است.'},400);
      const s=newSecret();await kvSet(env,'totp_pending',s);
      return json({secret:s,uri:'otpauth://totp/Tahlilgaram:admin?secret='+s+'&issuer=Tahlilgaram&digits=6&period=30'});
    }
    if(sub==='2fa/enable'){
      const s=await kvGet(env,'totp_pending');if(!s)return json({error:'اول «شروع» را بزن.'},400);
      if(!(await totpCheck(env,s,b.code)))return json({error:'کد درست نیست؛ ساعت گوشی را بررسی کن.'},400);
      await kvSet(env,'totp',s);await kvDel(env,'totp_pending');await kvSet(env,'sv',(await adminVer(env))+1);await slog(env,request,'admin_action','2FA فعال شد');
      return json({ok:true},200,{'set-cookie':await adminCookie(env)});
    }
    if(sub==='2fa/disable'){
      const s=await kvGet(env,'totp');if(!s)return json({ok:true});
      if(!(await samePw(String(b.password||''),env))||!(await totpCheck(env,s,b.code))){await slog(env,request,'admin_2fa_fail','تلاش ناموفق برای خاموش‌کردن 2FA');return json({error:'رمز یا کد درست نیست.'},400)}
      await kvDel(env,'totp');await slog(env,request,'admin_action','2FA خاموش شد');return json({ok:true});
    }
    return json({error:'nf'},404);
  }

  /* ---------- site config ---------- */
  if(path==='config'){
    if(method==='GET'){const r=await env.DB.prepare("SELECT v FROM kv WHERE k='config'").first();return json(r?JSON.parse(r.v):{})}
    if(method==='PUT'){
      const b=await body(request);
      const c={
        banner:{on:!!(b.banner&&b.banner.on),text:String((b.banner&&b.banner.text)||'').slice(0,200),color:/^#[0-9a-fA-F]{3,8}$/.test(String(b.banner&&b.banner.color))?String(b.banner.color):'#0fae78'},
        hero:{title:String((b.hero&&b.hero.title)||'').slice(0,120),sub:String((b.hero&&b.hero.sub)||'').slice(0,300)},
        faq:(Array.isArray(b.faq)?b.faq:[]).slice(0,40).map(i=>({q:String(i.q||'').slice(0,200),a:String(i.a||'').slice(0,1500)})).filter(i=>i.q&&i.a),
        hidden:(Array.isArray(b.hidden)?b.hidden:[]).slice(0,200).map(s=>String(s).toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,12)).filter(Boolean)
      };
      await kvSet(env,'config',JSON.stringify(c));
      return json({ok:true});
    }
  }
  if(path==='tickets'&&method==='GET'){
    const r=await env.DB.prepare("SELECT id,name,contact,message,status,created FROM tickets ORDER BY created DESC LIMIT 300").all();
    return json(r.results);
  }
  if(path.startsWith('tickets/')){
    const id=decodeURIComponent(path.slice(8));
    if(method==='PATCH'){const b=await body(request);const st=['new','open','done'].includes(b.status)?b.status:'open';
      await env.DB.prepare("UPDATE tickets SET status=? WHERE id=?").bind(st,id).run();return json({ok:true})}
    if(method==='DELETE'){await env.DB.prepare("DELETE FROM tickets WHERE id=?").bind(id).run();return json({ok:true})}
  }
  return json({error:'nf'},404);
}
