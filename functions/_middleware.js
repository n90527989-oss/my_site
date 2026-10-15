export async function onRequest(ctx){
  const r=await ctx.next();
  const p=new URL(ctx.request.url).pathname;
  if(!(r.headers.get('content-type')||'').includes('text/html')||p.startsWith('/admin'))return r;
  return new HTMLRewriter().on('body',{element(e){e.append('<script src="/account.js"></script>',{html:true})}}).transform(r);
}
