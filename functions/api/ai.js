import {json,userId,rlInc} from '../_auth.js';
export async function onRequestPost({request,env}){
  if(!env.GROQ_KEY)return json({error:'setup'},500);
  const uid=await userId(request,env);
  if(!uid)return json({error:'login'},401);
  if(+(request.headers.get('content-length')||0)>30000)return json({error:'big'},413);
  if(await rlInc(env,'ai:'+uid,3600)>20)return json({error:'limit'},429);
  let b;try{b=await request.json()}catch(e){return json({error:'bad'},400)}
  const p=String(b.prompt||'').slice(0,8000);
  if(p.length<2)return json({error:'bad'},400);
  let r;
  try{
    r=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'content-type':'application/json',authorization:'Bearer '+env.GROQ_KEY},body:JSON.stringify({model:'llama-3.3-70b-versatile',max_tokens:1200,messages:[{role:'user',content:p}]})});
  }catch(e){return json({error:'ai'},502)}
  if(!r.ok)return json({error:'ai'},502);
  const j=await r.json();
  return json({text:(j.choices&&j.choices[0]&&j.choices[0].message&&j.choices[0].message.content)||''});
}
