(function(){
if(window.__acct)return;window.__acct=1;
var U=null,TAB='ov',MODE='login',OPEN=false,AL=[],TKS=[],FAV=[],PROF=null,TH=null,PR={};
var ST={new:'ارسال‌شده',open:'در حال بررسی',done:'بسته‌شده'};
function h(t,a,k){var e=document.createElement(t);for(var x in a||{}){if(x==='text')e.textContent=a[x];else if(x.slice(0,2)==='on')e[x]=a[x];else e.setAttribute(x,a[x])}(k||[]).forEach(function(c){e.appendChild(typeof c==='string'?document.createTextNode(c):c)});return e}
function api(p,o){o=o||{};o.credentials='same-origin';if(o.body&&typeof o.body!=='string'){o.body=JSON.stringify(o.body);o.headers={'content-type':'application/json'}}
  return fetch('/api/'+p,o).then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok)throw j;return j})})}
var fa=new Intl.NumberFormat('fa-IR'),en=new Intl.NumberFormat('en-US',{maximumFractionDigits:8});
function dt(t){return new Date(t).toLocaleDateString('fa-IR')}
var css=document.createElement('style');
css.textContent='#tpage{display:none!important}'
+'.ac-b{background:var(--ac,#1bc48a);color:var(--ai,#04140d);border:0;border-radius:999px;padding:6px 14px;font-weight:700;font-size:.85rem;font-family:inherit;cursor:pointer;margin-inline-end:8px;white-space:nowrap}.ac-b.fl{position:fixed;z-index:9998;top:10px;left:10px}'
+'#ac-ov{position:fixed;inset:0;z-index:9999;background:var(--bg,#080b0e);color:var(--ink,#eaf0f3);overflow:auto;direction:rtl;font-family:inherit;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}'
+'#ac-ov *{box-sizing:border-box}.ac-bar{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:10px;padding:12px 16px;background:var(--sf,#11171c);border-bottom:1px solid var(--ed,#232d36)}'
+'.ac-w{max-width:980px;margin:0 auto;padding:14px}.ac-g{display:grid;gap:14px;grid-template-columns:1fr}@media(min-width:760px){.ac-g{grid-template-columns:210px 1fr}}'
+'.ac-n{display:flex;gap:6px;overflow-x:auto}@media(min-width:760px){.ac-n{flex-direction:column;position:sticky;top:70px;align-self:start}}'
+'.ac-n button{white-space:nowrap;text-align:right;position:relative}.ac-n button[aria-pressed=true]{background:var(--ac,#1bc48a);color:var(--ai,#04140d);border-color:var(--ac,#1bc48a);font-weight:700}'
+'#ac-ov button,#ac-ov select{font:inherit;color:var(--ink,#eaf0f3);background:var(--s2,#1a2229);border:1px solid var(--ed,#232d36);border-radius:11px;padding:8px 14px;cursor:pointer}'
+'#ac-ov button.p{background:var(--ac,#1bc48a);border-color:var(--ac,#1bc48a);color:var(--ai,#04140d);font-weight:800}#ac-ov button.d{color:var(--down,#ff5c6a)}#ac-ov button:disabled{opacity:.5}'
+'#ac-ov input,#ac-ov textarea,#ac-ov select{font:inherit;color:var(--ink,#eaf0f3);background:var(--s2,#1a2229);border:1px solid var(--ed,#232d36);border-radius:11px;padding:9px 12px;width:100%;margin-bottom:8px}'
+'#ac-ov :focus-visible{outline:2px solid var(--ac,#1bc48a);outline-offset:2px}'
+'.cd{background:var(--sf,#11171c);border:1px solid var(--ed,#232d36);border-radius:16px;padding:14px;margin-bottom:12px}.cd h3{margin:0 0 10px;font-size:1rem}'
+'.ac-s{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px}@media(min-width:600px){.ac-s{grid-template-columns:repeat(4,1fr)}}.ac-s div{background:var(--sf,#11171c);border:1px solid var(--ed,#232d36);border-radius:16px;padding:12px}.ac-s b{display:block;font-size:1.6rem;line-height:1.3}'
+'.mu{color:var(--mu,#8a96a2);font-size:.84rem}.er{color:var(--down,#ff5c6a);min-height:1.5em}.rw{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.sp{flex:1}.it{border-top:1px solid var(--ed,#232d36);padding:10px 0}.it:first-of-type{border-top:0}'
+'.bd{display:inline-block;padding:1px 10px;border-radius:8px;font-size:.78rem;font-weight:700;background:var(--s2,#1a2229)}.bd.a{background:rgba(27,196,138,.18);color:var(--ac,#1bc48a)}.dt{display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--ac,#1bc48a)}'
+'.bb{max-width:85%;padding:9px 13px;border-radius:14px;margin-bottom:8px;white-space:pre-wrap;word-break:break-word}.bb.u{background:var(--ac,#1bc48a);color:var(--ai,#04140d);margin-inline-start:auto;border-end-start-radius:4px}.bb.s{background:var(--s2,#1a2229);border-end-end-radius:4px}'
+'.tm{position:fixed;z-index:10000;top:calc(12px + env(safe-area-inset-top,0px));left:50%;transform:translateX(-50%);background:var(--ink,#eaf0f3);color:var(--bg,#080b0e);padding:10px 18px;border-radius:12px;font-weight:700;max-width:90vw;text-align:center}';
document.head.appendChild(css);
var fab=h('button',{class:'ac-b',onclick:function(){go('ov')}}),host=document.querySelector('.stt');
if(host)host.insertBefore(fab,host.firstChild);else{fab.className+=' fl';document.body.appendChild(fab)}
function setFab(){fab.textContent=U?'حساب من ('+U.username+')':'ورود / ثبت‌نام'}
function toast(m,ms){var t=h('div',{class:'tm',role:'status',text:m});document.body.appendChild(t);setTimeout(function(){t.remove()},ms||3500)}
function go(t){OPEN=true;if(t)TAB=t;TH=null;draw();if(U)load()}
document.querySelectorAll('a[href="#/support"]').forEach(function(a){if(a.closest('.nv'))a.textContent='پشتیبانی'});
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href="#/support"]');if(a){e.preventDefault();go('sup')}},true);
if(location.hash==='#/support')location.hash='#/';
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&OPEN){OPEN=false;draw()}});

function price(sym,cur){return h('span',{'data-pr':sym+'_'+cur,dir:'ltr',text:'—'})}
function upd(){document.querySelectorAll('#ac-ov [data-pr]').forEach(function(e){var v=PR[e.getAttribute('data-pr')];e.textContent=v?(/_IRT$/.test(e.getAttribute('data-pr'))?fa.format(Math.round(v)):en.format(v)):'—'})}
function nAl(){return AL.filter(function(a){return!a.done}).length}
function nTk(){return TKS.filter(function(t){return t.status!=='done'}).length}
function nNew(){return TKS.filter(function(t){return t.last_author==='admin'&&t.status!=='done'}).length}

function draw(){
  var o=document.getElementById('ac-ov');if(o)o.remove();
  if(!OPEN){document.body.style.overflow='';return}
  document.body.style.overflow='hidden';
  var ov=h('div',{id:'ac-ov',role:'dialog','aria-modal':'true','aria-label':'حساب کاربری'}),w=h('div',{class:'ac-w'});
  ov.appendChild(h('div',{class:'ac-bar'},[h('b',{text:U?'حساب کاربری':'ورود به تحلیل‌گر'}),h('span',{class:'sp'}),h('button',{'aria-label':'بستن',text:'✕',onclick:function(){OPEN=false;draw()}})]));
  ov.appendChild(w);U?userView(w):authView(w);document.body.appendChild(ov);upd();
}
function authView(w){
  var f={},err=h('div',{class:'er',role:'alert'});
  function inp(n,ph,ty,ac){var i=h('input',{placeholder:ph,type:ty||'text','aria-label':ph,autocomplete:ac||'off',dir:'ltr'});f[n]=i;return i}
  var c=h('div',{class:'cd',style:'max-width:420px;margin:6vh auto 0'});
  c.appendChild(h('div',{class:'rw',style:'margin-bottom:12px'},[h('button',{text:'ورود','aria-pressed':String(MODE==='login'),class:MODE==='login'?'p':'',onclick:function(){MODE='login';draw()}}),h('button',{text:'ثبت‌نام',class:MODE==='register'?'p':'',onclick:function(){MODE='register';draw()}})]));
  c.appendChild(inp('username','نام کاربری (انگلیسی)','text','username'));
  if(MODE==='register')c.appendChild(inp('email','ایمیل','email','email'));
  c.appendChild(inp('password','رمز عبور'+(MODE==='register'?' (حداقل ۸ کاراکتر)':''),'password',MODE==='login'?'current-password':'new-password'));
  var b=h('button',{class:'p',style:'width:100%',text:MODE==='login'?'ورود':'ساخت حساب',onclick:function(){
    err.textContent='';b.disabled=true;var d={username:f.username.value,password:f.password.value};if(MODE==='register')d.email=f.email.value;
    api('auth/'+MODE,{method:'POST',body:d}).then(function(j){U=j.user;setFab();TAB='ov';draw();load()}).catch(function(e){err.textContent=(e&&e.error)||'خطا؛ دوباره تلاش کن.';b.disabled=false})}});
  c.appendChild(b);c.appendChild(err);w.appendChild(c);
  w.appendChild(h('div',{class:'cd',style:'max-width:420px;margin:0 auto'},[h('h3',{text:'با حساب کاربری'}),h('div',{class:'mu',text:'• لیست پیگیری ارزها با قیمت زنده'}),h('div',{class:'mu',text:'• هشدار قیمت روی ارز دلخواه'}),h('div',{class:'mu',text:'• تیکت پشتیبانی و دریافت پاسخ مدیر'})]));
}
function userView(w){
  var tabs=[['ov','نمای کلی'],['wl','لیست پیگیری'],['al','هشدارها'],['sup','پشتیبانی'],['pf','حساب و امنیت']],g=h('div',{class:'ac-g'}),nav=h('nav',{class:'ac-n','aria-label':'بخش‌های حساب'}),m=h('div');
  tabs.forEach(function(t){var b=h('button',{text:t[1],'aria-pressed':String(TAB===t[0]),onclick:function(){TAB=t[0];TH=null;draw()}});
    if(t[0]==='sup'&&nNew())b.appendChild(h('span',{class:'dt',style:'margin-inline-start:6px'}));nav.appendChild(b)});
  g.appendChild(nav);g.appendChild(m);w.appendChild(g);
  ({ov:ovV,wl:wlV,al:alV,sup:supV,pf:pfV})[TAB](m);
}
function rowPrices(s){return h('div',{class:'it rw'},[h('b',{dir:'ltr',text:s}),h('span',{class:'sp'}),h('span',{class:'mu'},['تومان ',price(s,'IRT')]),h('span',{class:'mu'},['تتر ',price(s,'USDT')])])}
function ovV(m){
  m.appendChild(h('div',{class:'cd'},[h('h3',{text:'سلام، '+U.username+' 👋'}),h('div',{class:'mu',text:PROF?'عضو از '+dt(PROF.created)+' · '+PROF.email:''})]));
  var s=h('div',{class:'ac-s'});[[FAV.length,'ارز در لیست پیگیری'],[nAl(),'هشدار فعال'],[nTk(),'تیکت باز'],[nNew(),'پاسخ جدید']].forEach(function(x){s.appendChild(h('div',{},[h('b',{text:fa.format(x[0])}),h('span',{class:'mu',text:x[1]})]))});m.appendChild(s);
  var c=h('div',{class:'cd'},[h('h3',{text:'لیست پیگیری'})]);if(!FAV.length)c.appendChild(h('div',{class:'mu',text:'هنوز ارزی اضافه نکرده‌ای.'}));FAV.slice(0,5).forEach(function(x){c.appendChild(rowPrices(x))});
  c.appendChild(h('div',{style:'margin-top:8px'},[h('button',{text:'مدیریت لیست',onclick:function(){TAB='wl';draw()}})]));m.appendChild(c);
  var t=h('div',{class:'cd'},[h('h3',{text:'آخرین تیکت‌ها'})]);if(!TKS.length)t.appendChild(h('div',{class:'mu',text:'تیکتی نداری.'}));
  TKS.slice(0,3).forEach(function(x){t.appendChild(tkRow(x))});t.appendChild(h('div',{style:'margin-top:8px'},[h('button',{class:'p',text:'تیکت جدید',onclick:function(){TAB='sup';draw()}})]));m.appendChild(t);
}
function wlV(m){
  var i=h('input',{placeholder:'نماد ارز، مثل BTC','aria-label':'نماد ارز',dir:'ltr'});
  function add(){var v=i.value;if(!v)return;api('me/favs',{method:'PUT',body:{list:FAV.concat([v])}}).then(function(l){FAV=l;draw()}).catch(function(){toast('خطا')})}
  i.onkeydown=function(e){if(e.key==='Enter')add()};
  m.appendChild(h('div',{class:'cd'},[h('h3',{text:'افزودن به لیست پیگیری'}),i,h('button',{class:'p',text:'افزودن',onclick:add})]));
  var c=h('div',{class:'cd'},[h('h3',{text:'ارزهای من'})]);if(!FAV.length)c.appendChild(h('div',{class:'mu',text:'لیست خالی است.'}));
  FAV.forEach(function(s){var r=rowPrices(s);r.appendChild(h('button',{class:'d',text:'حذف',onclick:function(){api('me/favs',{method:'PUT',body:{list:FAV.filter(function(x){return x!==s})}}).then(function(l){FAV=l;draw()})}}));c.appendChild(r)});
  m.appendChild(c);
}
function alV(m){
  var co=h('input',{placeholder:'نماد ارز، مثل BTC','aria-label':'نماد ارز',dir:'ltr'}),dr=h('select',{'aria-label':'جهت'},[h('option',{value:'gte',text:'قیمت بالاتر از'}),h('option',{value:'lte',text:'قیمت پایین‌تر از'})]),
  pr=h('input',{placeholder:'قیمت',type:'number',inputmode:'decimal','aria-label':'قیمت',dir:'ltr'}),cu=h('select',{'aria-label':'واحد'},[h('option',{value:'IRT',text:'تومان'}),h('option',{value:'USDT',text:'تتر'})]),er=h('div',{class:'er',role:'alert'});
  m.appendChild(h('div',{class:'cd'},[h('h3',{text:'هشدار جدید'}),co,dr,pr,cu,h('button',{class:'p',text:'افزودن هشدار',onclick:function(){er.textContent='';try{if('Notification' in window&&Notification.permission==='default')Notification.requestPermission()}catch(e){}
    api('me/alerts',{method:'POST',body:{coin:co.value,dir:dr.value,price:pr.value,cur:cu.value}}).then(function(){return load()}).catch(function(e){er.textContent=(e&&e.error)||'خطا'})}}),er,h('div',{class:'mu',text:'هشدار فقط وقتی سایت در مرورگرت باز است بررسی می‌شود.'})]));
  var c=h('div',{class:'cd'},[h('h3',{text:'هشدارهای من'})]);if(!AL.length)c.appendChild(h('div',{class:'mu',text:'هشداری نداری.'}));
  AL.forEach(function(a){c.appendChild(h('div',{class:'it rw'},[h('b',{dir:'ltr',text:a.coin+' '+(a.dir==='gte'?'≥':'≤')+' '+a.price+' '+a.cur}),h('span',{class:'bd'+(a.done?'':' a'),text:a.done?'اجرا شد':'فعال'}),h('span',{class:'mu'},['الان: ',price(a.coin,a.cur)]),h('span',{class:'sp'}),h('button',{class:'d',text:'حذف',onclick:function(){api('me/alerts/'+a.id,{method:'DELETE'}).then(load)}})]))});
  m.appendChild(c);
}
function tkRow(t){return h('div',{class:'it rw',style:'cursor:pointer',role:'button',tabindex:'0',onclick:function(){TAB='sup';openTh(t.id)},onkeydown:function(e){if(e.key==='Enter')openTh(t.id)}},[
  h('b',{text:t.subject||'بدون موضوع'}),h('span',{class:'bd'+(t.status==='done'?'':' a'),text:ST[t.status]}),t.last_author==='admin'&&t.status!=='done'?h('span',{class:'bd a',text:'پاسخ جدید'}):'',h('span',{class:'sp'}),h('span',{class:'mu',text:dt(t.created)})])}
function openTh(id){api('me/tickets/'+id).then(function(j){TH=j;OPEN=true;draw()}).catch(function(){toast('تیکت پیدا نشد')})}
function supV(m){
  if(TH)return thV(m);
  var sb=h('select',{'aria-label':'موضوع'},['مشکل فنی','سوال دربارهٔ قیمت‌ها','پیشنهاد','سایر'].map(function(x){return h('option',{value:x,text:x})})),tx=h('textarea',{rows:'4',placeholder:'مشکل یا سوالت را بنویس…','aria-label':'متن تیکت',maxlength:'1500'}),er=h('div',{class:'er',role:'alert'});
  var b=h('button',{class:'p',text:'ارسال تیکت',onclick:function(){er.textContent='';b.disabled=true;api('me/tickets',{method:'POST',body:{subject:sb.value,message:tx.value}}).then(function(j){toast('تیکت ارسال شد');return load().then(function(){openTh(j.id)})}).catch(function(e){er.textContent=(e&&e.error)||'خطا';b.disabled=false})}});
  m.appendChild(h('div',{class:'cd'},[h('h3',{text:'تیکت جدید'}),sb,tx,b,er]));
  var c=h('div',{class:'cd'},[h('h3',{text:'تیکت‌های من'})]);if(!TKS.length)c.appendChild(h('div',{class:'mu',text:'تیکتی نداری.'}));TKS.forEach(function(t){c.appendChild(tkRow(t))});m.appendChild(c);
}
function thV(m){
  var t=TH.ticket,c=h('div',{class:'cd'});
  c.appendChild(h('div',{class:'rw',style:'margin-bottom:10px'},[h('button',{text:'‹ بازگشت',onclick:function(){TH=null;draw();load()}}),h('b',{text:t.subject||'بدون موضوع'}),h('span',{class:'bd'+(t.status==='done'?'':' a'),text:ST[t.status]}),h('span',{class:'sp'}),h('span',{class:'mu',text:t.id})]));
  c.appendChild(h('div',{class:'bb u',text:t.message}));TH.msgs.forEach(function(x){c.appendChild(h('div',{class:'bb '+(x.author==='admin'?'s':'u')},[x.author==='admin'?h('div',{class:'mu',text:'پشتیبانی'}):'',x.body]))});
  var tx=h('textarea',{rows:'3',placeholder:'پاسخ بنویس…','aria-label':'پاسخ',maxlength:'1500'}),er=h('div',{class:'er',role:'alert'});
  var b=h('button',{class:'p',text:t.status==='done'?'ارسال و بازکردن دوباره':'ارسال',onclick:function(){if(!tx.value.trim())return;er.textContent='';b.disabled=true;api('me/tickets/'+t.id,{method:'POST',body:{body:tx.value}}).then(function(){return api('me/tickets/'+t.id)}).then(function(j){TH=j;load();draw()}).catch(function(e){er.textContent=(e&&e.error)||'خطا';b.disabled=false})}});
  c.appendChild(tx);c.appendChild(b);c.appendChild(er);m.appendChild(c);
}
function pfV(m){
  m.appendChild(h('div',{class:'cd'},[h('h3',{text:'اطلاعات حساب'}),h('div',{},['نام کاربری: ',h('b',{dir:'ltr',text:U.username})]),h('div',{},['ایمیل: ',h('b',{dir:'ltr',text:PROF?PROF.email:'…'})]),h('div',{class:'mu',text:PROF?'عضو از '+dt(PROF.created):''})]));
  var o=h('input',{type:'password',placeholder:'رمز فعلی','aria-label':'رمز فعلی',autocomplete:'current-password',dir:'ltr'}),n=h('input',{type:'password',placeholder:'رمز جدید (حداقل ۸ کاراکتر)','aria-label':'رمز جدید',autocomplete:'new-password',dir:'ltr'}),er=h('div',{class:'er',role:'alert'});
  m.appendChild(h('div',{class:'cd'},[h('h3',{text:'تغییر رمز عبور'}),o,n,h('button',{class:'p',text:'تغییر رمز',onclick:function(){er.textContent='';api('me/password',{method:'POST',body:{old:o.value,new:n.value}}).then(function(){o.value='';n.value='';toast('رمز تغییر کرد')}).catch(function(e){er.textContent=(e&&e.error)||'خطا'})}}),er]));
  m.appendChild(h('div',{class:'cd'},[h('button',{class:'d',text:'خروج از حساب',onclick:function(){api('auth/logout',{method:'POST'}).finally(function(){U=null;AL=[];TKS=[];FAV=[];PROF=null;TH=null;setFab();draw()})}})]));
}
function load(){if(!U)return Promise.resolve();
  return Promise.all([api('me/alerts'),api('me/tickets'),api('me/favs'),api('me/profile')]).then(function(r){AL=r[0];TKS=r[1];FAV=r[2];PROF=r[3];if(OPEN&&!TH)draw()}).catch(function(){})}
/* قیمت زنده و هشدار از روی همان درخواست‌هایی که سایت می‌زند */
var of=window.fetch;
window.fetch=function(u){var p=of.apply(this,arguments);
  if(String(u).indexOf('/api/v1/mkt/tickers/')>-1)p.then(function(r){return r.clone().json()}).then(function(a){if(!Array.isArray(a))return;a.forEach(function(i){var v=+i.price;if(v>0)PR[i.symbol]=v});upd();if(U)check()}).catch(function(){});
  return p};
function check(){AL.forEach(function(x){if(x.done)return;var p=PR[x.coin+'_'+x.cur];if(!(p>0))return;
  if((x.dir==='gte'&&p>=x.price)||(x.dir==='lte'&&p<=x.price)){x.done=1;var m='هشدار قیمت: '+x.coin+' به '+en.format(p)+' '+(x.cur==='IRT'?'تومان':'تتر')+' رسید.';toast(m,8000);
    try{if('Notification' in window&&Notification.permission==='granted')new Notification(m)}catch(e){}api('me/alerts/'+x.id,{method:'PATCH'}).catch(function(){});if(OPEN&&!TH)draw()}})}
setInterval(function(){if(!U||document.hidden)return;
  if(OPEN&&TH){var id=TH.ticket.id,n=TH.msgs.length;api('me/tickets/'+id).then(function(j){if(OPEN&&TH&&TH.ticket.id===id&&j.msgs.length!==n){TH=j;draw()}}).catch(function(){})}
  else api('me/tickets').then(function(t){var a=nNew();TKS=t;if(nNew()>a){toast('پشتیبانی به تیکتت پاسخ داد');if(OPEN&&!TH&&TAB==='sup')draw()}}).catch(function(){})},25000);
setFab();api('auth/me').then(function(j){U=j.user||null;setFab();load()}).catch(function(){});
})();
