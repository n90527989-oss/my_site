import {json,adminOk,kvGet,kvSet,slog} from '../../_auth.js';
export async function onRequest({request,env}){
  if(!(await adminOk(request,env)))return json({error:'auth'},401);
  let c={};try{c=JSON.parse((await kvGet(env,'ai_cfg'))||'{}')}catch(e){}
  if(request.method==='PUT'){
    let b={};try{b=await request.json()}catch(e){}
    c={on:b.on!==false,hourly:Math.min(200,Math.max(1,Math.floor(+b.hourly)||20))};
    await kvSet(env,'ai_cfg',JSON.stringify(c));await slog(env,request,'admin_action','تنظیم هوش مصنوعی: '+(c.on?'روشن':'خاموش')+' / '+c.hourly+' در ساعت');
  }
  const d=await env.DB.prepare("SELECT n,t FROM rl WHERE k='ai:day'").first();
  return json({on:c.on!==false,hourly:c.hourly||20,cap:1500,today:d&&Date.now()-d.t<864e5?d.n:0});
}
