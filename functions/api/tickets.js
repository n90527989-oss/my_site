import {userId} from '../_auth.js';
const clip=(s,n)=>String(s==null?'':s).slice(0,n);
export async function onRequestPost({request,env}){
  let b;try{b=await request.json()}catch(e){return new Response('bad',{status:400})}
  const msg=clip(b.message,1500).trim();
  if(msg.length<3)return new Response('bad',{status:400});
  const uid=(await userId(request,env))||null;
  let id=/^[A-Za-z0-9_-]{3,24}$/.test(b.id||'')?b.id:'T'+Date.now().toString(36).toUpperCase();
  const ins=()=>env.DB.prepare("INSERT OR IGNORE INTO tickets (id,name,contact,message,status,created,user_id) VALUES (?,?,?,?, 'new', ?, ?)")
    .bind(id,clip(b.name,80),clip(b.contact,120),msg,Date.now(),uid).run();
  let r=await ins();
  if(!r.meta.changes){id='T'+Date.now().toString(36).toUpperCase()+Math.floor(Math.random()*99);r=await ins()}
  return Response.json({ok:true,id});
}
