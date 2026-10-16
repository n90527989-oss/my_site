import {json,userId,hashPw,checkPw} from '../../_auth.js';
const clip=(s,n)=>String(s==null?'':s).trim().slice(0,n);
const SYM=s=>String(s).toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,12);
export async function onRequest({request,env,params}){
  const id=await userId(request,env);if(!id)return json({error:'auth'},401);
  const p=params.path||[],m=request.method,db=env.DB;
  let b={};if(m!=='GET'&&m!=='DELETE'){try{b=await request.json()}catch(e){}}
  const me=await db.prepare('SELECT id,username,email,created,pw,favs FROM users WHERE id=?').bind(id).first();
  if(!me)return json({error:'auth'},401);
  if(p[0]==='profile')return json({username:me.username,email:me.email,created:me.created});
  if(p[0]==='password'&&m==='POST'){
    const nw=String(b.new||'');
    if(nw.length<8||nw.length>72)return json({error:'رمز جدید باید ۸ تا ۷۲ کاراکتر باشد.'},400);
    await new Promise(r=>setTimeout(r,400));
    if(!(await checkPw(String(b.old||''),me.pw)))return json({error:'رمز فعلی اشتباه است.'},400);
    await db.prepare('UPDATE users SET pw=? WHERE id=?').bind(await hashPw(nw),id).run();
    return json({ok:true});
  }
  if(p[0]==='favs'){
    if(m==='GET'){let l=[];try{l=JSON.parse(me.favs||'[]')}catch(e){}return json(l)}
    if(m==='PUT'){
      const l=(Array.isArray(b.list)?b.list:[]).map(SYM).filter(Boolean).filter((s,i,a)=>a.indexOf(s)===i).slice(0,50);
      await db.prepare('UPDATE users SET favs=? WHERE id=?').bind(JSON.stringify(l),id).run();
      return json(l);
    }
  }
  if(p[0]==='tickets'){
    const tid=p[1];
    if(!tid&&m==='GET')return json((await db.prepare('SELECT t.id,t.subject,t.message,t.status,t.created,(SELECT author FROM ticket_msgs g WHERE g.ticket_id=t.id ORDER BY g.id DESC LIMIT 1) last_author FROM tickets t WHERE t.user_id=? ORDER BY t.created DESC LIMIT 50').bind(id).all()).results);
    if(!tid&&m==='POST'){
      const msg=clip(b.message,1500),sub=clip(b.subject,80)||'بدون موضوع';
      if(msg.length<3)return json({error:'متن پیام خیلی کوتاه است.'},400);
      const n=await db.prepare('SELECT COUNT(*) c FROM tickets WHERE user_id=? AND created>?').bind(id,Date.now()-36e5).first();
      if(n.c>=5)return json({error:'در یک ساعت حداکثر ۵ تیکت می‌توانی بفرستی.'},429);
      const tk='T'+Date.now().toString(36).toUpperCase()+Math.floor(Math.random()*90+10);
      await db.prepare("INSERT INTO tickets (id,name,contact,message,status,created,user_id,subject) VALUES (?,?,?,?, 'new', ?, ?, ?)").bind(tk,me.username,me.email,msg,Date.now(),id,sub).run();
      return json({ok:true,id:tk});
    }
    if(tid){
      const t=await db.prepare('SELECT id,subject,message,status,created FROM tickets WHERE id=? AND user_id=?').bind(tid,id).first();
      if(!t)return json({error:'nf'},404);
      if(m==='GET')return json({ticket:t,msgs:(await db.prepare('SELECT author,body,created FROM ticket_msgs WHERE ticket_id=? ORDER BY id').bind(tid).all()).results});
      if(m==='POST'){
        const body=clip(b.body,1500);if(!body)return json({error:'bad'},400);
        const c=await db.prepare("SELECT COUNT(*) c FROM ticket_msgs WHERE ticket_id=? AND author='user' AND created>?").bind(tid,Date.now()-36e5).first();
        if(c.c>=20)return json({error:'پیام‌ها زیاد است؛ کمی بعد تلاش کن.'},429);
        await db.batch([db.prepare("INSERT INTO ticket_msgs (ticket_id,author,body,created) VALUES (?, 'user', ?, ?)").bind(tid,body,Date.now()),db.prepare("UPDATE tickets SET status='new' WHERE id=?").bind(tid)]);
        return json({ok:true});
      }
    }
  }
  if(p[0]==='alerts'){
    if(m==='GET')return json((await db.prepare('SELECT id,coin,dir,price,cur,done FROM alerts WHERE user_id=? ORDER BY id DESC LIMIT 50').bind(id).all()).results);
    if(m==='POST'&&!p[1]){
      const coin=SYM(b.coin||''),price=+b.price,dir=b.dir==='lte'?'lte':'gte',cur=b.cur==='USDT'?'USDT':'IRT';
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
