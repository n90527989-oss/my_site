import {json,adminOk,slog} from '../../_auth.js';
export async function onRequest({request,env}){
  if(!(await adminOk(request,env)))return json({error:'auth'},401);
  const m=request.method,db=env.DB;
  if(m==='GET')return json((await db.prepare('SELECT u.id,u.username,u.email,u.created,(SELECT COUNT(*) FROM tickets t WHERE t.user_id=u.id) tickets,(SELECT COUNT(*) FROM alerts a WHERE a.user_id=u.id) alerts FROM users u ORDER BY u.id DESC LIMIT 500').all()).results);
  if(m==='POST'){let b={};try{b=await request.json()}catch(e){}const id=+b.id;if(!id)return json({error:'bad'},400);
    await db.prepare('UPDATE users SET sv=COALESCE(sv,0)+1 WHERE id=?').bind(id).run();await slog(env,request,'admin_action','خروج اجباری کاربر '+id);return json({ok:true})}
  if(m==='DELETE'){
    const id=+new URL(request.url).searchParams.get('id');if(!id)return json({error:'bad'},400);
    await db.batch([db.prepare('DELETE FROM alerts WHERE user_id=?').bind(id),db.prepare('UPDATE tickets SET user_id=NULL WHERE user_id=?').bind(id),db.prepare('DELETE FROM users WHERE id=?').bind(id)]);
    return json({ok:true});
  }
  return json({error:'nf'},404);
}
