export async function onRequestGet({env}){
  const r=await env.DB.prepare("SELECT v FROM kv WHERE k='config'").first();
  return new Response(r?r.v:'{}',{headers:{'content-type':'application/json','cache-control':'public, max-age=30'}});
}
