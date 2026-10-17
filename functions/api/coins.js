import {json,adminOk,kvGet,kvSet,slog} from '../_auth.js';
const SYM=/^[A-Z0-9]{2,10}$/;
const NAME=/^[\p{L}\p{N} \u200c.\-]{1,30}$/u;
const EMPTY='{"add":[],"hide":[],"names":{}}';

export async function onRequestGet({env}){
  let v=null;
  try{if(env.DB)v=await kvGet(env,'coins')}catch(e){}
  return new Response(v||EMPTY,{headers:{'content-type':'application/json','cache-control':'public, max-age=15'}});
}

export async function onRequestPut({request,env}){
  if(!env.ADMIN_PASSWORD||!env.SESSION_SECRET||!env.DB)return json({error:'setup'},500);
  if(!(await adminOk(request,env)))return json({error:'auth'},401);
  if(+(request.headers.get('content-length')||0)>20000)return json({error:'big'},413);
  let b;try{b=await request.json()}catch(e){return json({error:'bad'},400)}
  if(!b||typeof b!=='object')return json({error:'bad'},400);
  const clean=a=>[...new Set((Array.isArray(a)?a:[]).map(x=>String(x).toUpperCase()).filter(x=>SYM.test(x)))].slice(0,80);
  const names={};
  if(b.names&&typeof b.names==='object'){
    for(const k of Object.keys(b.names).slice(0,200)){
      const s=k.toUpperCase(),n=String(b.names[k]==null?'':b.names[k]).trim();
      if(SYM.test(s)&&NAME.test(n))names[s]=n;
    }
  }
  const out={add:clean(b.add),hide:clean(b.hide),names};
  await kvSet(env,'coins',JSON.stringify(out));
  await slog(env,request,'coins_edit','اضافه '+out.add.length+' / مخفی '+out.hide.length);
  return json({ok:true,coins:out});
}
