import {adminOk,json} from '../_auth.js';
export async function onRequestGet({request,env}){
  if(!(await adminOk(request,env)))return json({ok:true});
  const o={ok:true,db:!!env.DB,secret:!!env.SESSION_SECRET,admin:!!env.ADMIN_PASSWORD,mail:!!(env.MAIL_URL&&env.MAIL_KEY),tables:{},cols:{}};
  if(env.DB){
    for(const t of ['kv','tickets','users','alerts','ticket_msgs','pending','sec_log','rl']){
      try{o.tables[t]=!!(await env.DB.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?").bind(t).first())}catch(e){o.tables[t]=false}
    }
    for(const [t,c] of [['tickets','user_id'],['tickets','subject'],['users','favs']]){
      try{await env.DB.prepare(`SELECT ${c} FROM ${t} LIMIT 1`).first();o.cols[t+'.'+c]=true}catch(e){o.cols[t+'.'+c]=false}
    }
  }
  return json(o);
}
