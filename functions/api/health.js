export async function onRequestGet({env}){
  const o={db:!!env.DB,secret:!!env.SESSION_SECRET,admin:!!env.ADMIN_PASSWORD,tables:{},cols:{}};
  if(env.DB){
    for(const t of ['kv','tickets','users','alerts','ticket_msgs']){
      try{o.tables[t]=!!(await env.DB.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?").bind(t).first())}catch(e){o.tables[t]=false}
    }
    for(const [t,c] of [['tickets','user_id'],['tickets','subject'],['users','favs']]){
      try{await env.DB.prepare(`SELECT ${c} FROM ${t} LIMIT 1`).first();o.cols[t+'.'+c]=true}catch(e){o.cols[t+'.'+c]=false}
    }
  }
  return Response.json(o,{headers:{'cache-control':'no-store'}});
}
