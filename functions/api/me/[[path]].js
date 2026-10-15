import {json,userId} from '../../_auth.js';
export async function onRequest({request,env,params}){
  const id=await userId(request,env);if(!id)return json({error:'auth'},401);
  const p=params.path||[],m=request.method,db=env.DB;
  if(p[0]==='tickets'&&m==='GET')
    return json((await db.prepare('SELECT id,message,status,created FROM tickets WHERE user_id=? ORDER BY created DESC LIMIT 50').bind(id).all()).results);
  if(p[0]==='alerts'){
    if(m==='GET')return json((await db.prepare('SELECT id,coin,dir,price,cur,done FROM alerts WHERE user_id=? ORDER BY id DESC LIMIT 50').bind(id).all()).results);
    if(m==='POST'&&!p[1]){
      let b={};try{b=await request.json()}catch(e){}
      const coin=String(b.coin||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,12),price=+b.price,dir=b.dir==='lte'?'lte':'gte',cur=b.cur==='USDT'?'USDT':'IRT';
      if(!coin||!(price>0))return json({error:'اطلاعات هشدار درست نیست.'},400);
      const n=await db.prepare('SELECT COUNT(*) c FROM alerts WHERE user_id=? AND done=0').bind(id).first();
      if(n.c>=20)return json({error:'حداکثر ۲۰ هشدار فعال می‌توانی داشته باشی.'},400);
      const r=await db.prepare('INSERT INTO alerts (user_id,coin,dir,price,cur,done,created) VALUES (?,?,?,?,?,0,?)').bind(id,coin,dir,price,cur,Date.now()).run();
      return json({ok:true,id:r.meta.last_row_id});
    }
    const aid=+p[1];
    if(aid&&m==='PATCH'){await db.prepare('UPDATE alerts SET done=1 WHERE id=? AND user_id=?').bind(aid,id).run();return json({ok:true})}
    if(aid&&m==='DELETE'){await db.prepare('DELETE FROM alerts WHERE id=? AND user_id=?').bind(aid,id).run();return json({ok:true})}
  }
  return json({error:'nf'},404);
}
