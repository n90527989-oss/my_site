import {json,adminOk} from '../../_auth.js';
const clip=(s,n)=>String(s==null?'':s).trim().slice(0,n);
const LAST="(SELECT MAX(created) FROM ticket_msgs g WHERE g.ticket_id=t.id)";
export async function onRequest({request,env}){
  if(!(await adminOk(request,env)))return json({error:'auth'},401);
  const db=env.DB,m=request.method,q=new URL(request.url).searchParams.get('ticket');
  let b={};if(m==='POST'||m==='PATCH'){try{b=await request.json()}catch(e){}}
  if(m==='GET'&&!q)return json((await db.prepare(`SELECT t.id,t.subject,t.message,t.name,t.contact,t.status,t.created,t.user_id,us.username,(SELECT COUNT(*) FROM ticket_msgs g WHERE g.ticket_id=t.id) msgs,(SELECT author FROM ticket_msgs g WHERE g.ticket_id=t.id ORDER BY g.id DESC LIMIT 1) last_author,${LAST} last_at FROM tickets t LEFT JOIN users us ON us.id=t.user_id ORDER BY COALESCE(${LAST},t.created) DESC LIMIT 300`).all()).results);
  if(m==='GET'){
    const t=await db.prepare('SELECT t.id,t.subject,t.message,t.name,t.contact,t.status,t.created,t.user_id,us.username,us.email FROM tickets t LEFT JOIN users us ON us.id=t.user_id WHERE t.id=?').bind(q).first();
    if(!t)return json({error:'nf'},404);
    return json({ticket:t,msgs:(await db.prepare('SELECT author,body,created FROM ticket_msgs WHERE ticket_id=? ORDER BY id').bind(q).all()).results});
  }
  if(m==='POST'){
    const body=clip(b.body,3000),id=String(b.ticket||'');if(!body||!id)return json({error:'bad'},400);
    if(!(await db.prepare('SELECT 1 FROM tickets WHERE id=?').bind(id).first()))return json({error:'nf'},404);
    await db.batch([db.prepare("INSERT INTO ticket_msgs (ticket_id,author,body,created) VALUES (?, 'admin', ?, ?)").bind(id,body,Date.now()),db.prepare('UPDATE tickets SET status=? WHERE id=?').bind(b.close?'done':'open',id)]);
    return json({ok:true});
  }
  if(m==='PATCH'){
    const st=['new','open','done'].includes(b.status)?b.status:'open';
    await db.prepare('UPDATE tickets SET status=? WHERE id=?').bind(st,String(b.ticket||'')).run();return json({ok:true});
  }
  if(m==='DELETE'&&q){await db.batch([db.prepare('DELETE FROM ticket_msgs WHERE ticket_id=?').bind(q),db.prepare('DELETE FROM tickets WHERE id=?').bind(q)]);return json({ok:true})}
  return json({error:'nf'},404);
}
