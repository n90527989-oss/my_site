const clip=(s,n)=>String(s==null?'':s).slice(0,n);
export async function onRequestPost({request,env}){
  let b;try{b=await request.json()}catch(e){return new Response('bad',{status:400})}
  const msg=clip(b.message,1500).trim();
  if(msg.length<3)return new Response('bad',{status:400});
  const id=/^[A-Za-z0-9_-]{3,24}$/.test(b.id||'')?b.id:'T'+Date.now().toString(36).toUpperCase();
  await env.DB.prepare("INSERT OR REPLACE INTO tickets (id,name,contact,message,status,created) VALUES (?,?,?,?, 'new', ?)")
    .bind(id,clip(b.name,80),clip(b.contact,120),msg,Date.now()).run();
  return Response.json({ok:true,id});
}
