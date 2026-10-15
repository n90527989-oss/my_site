(function(){
if(window.__acct)return;window.__acct=1;
var U=null,AL=[],TKS=[],tab='alerts',mode='login',open=false;
function h(t,a,k){var e=document.createElement(t);for(var x in a||{}){if(x==='text')e.textContent=a[x];else if(x.slice(0,2)==='on')e[x]=a[x];else e.setAttribute(x,a[x])}(k||[]).forEach(function(c){e.appendChild(typeof c==='string'?document.createTextNode(c):c)});return e}
function api(p,o){o=o||{};o.credentials='same-origin';if(o.body&&typeof o.body!=='string'){o.body=JSON.stringify(o.body);o.headers={'content-type':'application/json'}}
  return fetch('/api/'+p,o).then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok)throw j;return j})})}
var css=document.createElement('style');
css.textContent='#ac-fab{position:fixed;z-index:9998;left:14px;bottom:calc(14px + env(safe-area-inset-bottom,0px));background:#1bc48a;color:#04140d;border:0;border-radius:999px;padding:10px 18px;font:700 14px Vazirmatn,Tahoma,sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.35);cursor:pointer}'
+'#ac-ov{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.6);display:flex;align-items:flex-end;justify-content:center}'
+'#ac-box{width:100%;max-width:440px;max-height:88vh;overflow:auto;background:#11171c;color:#eaf0f3;border:1px solid #232d36;border-radius:20px 20px 0 0;padding:16px 16px calc(16px + env(safe-area-inset-bottom,0px));font:15px/1.8 Vazirmatn,Tahoma,sans-serif;direction:rtl}'
+'@media(min-width:600px){#ac-ov{align-items:center}#ac-box{border-radius:20px}}'
+'#ac-box input,#ac-box select{font:inherit;color:#eaf0f3;background:#1a2229;border:1px solid #232d36;border-radius:11px;padding:9px 12px;width:100%;margin-bottom:8px}'
+'#ac-box input:focus,#ac-box select:focus{border-color:#1bc48a;outline:none}'
+'#ac-box button{font:inherit;color:#eaf0f3;background:#1a2229;border:1px solid #232d36;border-radius:11px;padding:8px 14px;cursor:pointer}'
+'#ac-box button.p{background:#1bc48a;border-color:#1bc48a;color:#04140d;font-weight:800}#ac-box button.d{color:#ff5c6a}'
+'#ac-box button[aria-pressed=true]{background:#1bc48a;color:#04140d;border-color:#1bc48a;font-weight:700}'
+'#ac-box .r{display:flex;gap:8px;align-items:center;flex-wrap:wrap}#ac-box .m{color:#8a96a2;font-size:.84rem}#ac-box .e{color:#ff5c6a;min-height:1.6em}'
+'#ac-box .it{border-top:1px solid #232d36;padding:9px 0}#ac-t{position:fixed;z-index:10000;top:calc(12px + env(safe-area-inset-top,0px));left:50%;transform:translateX(-50%);background:#1bc48a;color:#04140d;padding:10px 18px;border-radius:12px;font:700 14px Vazirmatn,Tahoma,sans-serif;max-width:90vw;text-align:center}';
document.head.appendChild(css);
var fab=h('button',{id:'ac-fab',onclick:function(){open=true;draw()}});document.body.appendChild(fab);
function toast(m){var t=h('div',{id:'ac-t',role:'status',text:m});document.body.appendChild(t);setTimeout(function(){t.remove()},7000)}
function setFab(){fab.textContent=U?'حساب من ('+U.username+')':'ورود / ثبت‌نام'}
var ST={new:'جدید',open:'در حال بررسی',done:'بسته‌شده'};
function draw(){
  var old=document.getElementById('ac-ov');if(old)old.remove();if(!open)return;
  var box=h('div',{id:'ac-box',role:'dialog','aria-modal':'true','aria-label':'حساب کاربری'}),ov=h('div',{id:'ac-ov',onclick:function(e){if(e.target===ov){open=false;draw()}}},[box]);
  var close=h('button',{text:'بستن',onclick:function(){open=false;draw()}});
  var err=h('div',{class:'e',role:'alert'});
  if(!U){
    var f={};function inp(n,ph,ty,ac){var i=h('input',{placeholder:ph,type:ty||'text','aria-label':ph,autocomplete:ac||'off'});i.setAttribute('dir','ltr');f[n]=i;return i}
    var tabs=h('div',{class:'r',style:'margin-bottom:10px'},[
      h('button',{text:'ورود','aria-pressed':String(mode==='login'),onclick:function(){mode='login';draw()}}),
      h('button',{text:'ثبت‌نام','aria-pressed':String(mode==='register'),onclick:function(){mode='register';draw()}}),
      h('span',{style:'flex:1'}),close]);
    box.appendChild(tabs);
    box.appendChild(inp('username','نام کاربری (انگلیسی)','text','username'));
    if(mode==='register')box.appendChild(inp('email','ایمیل','email','email'));
    box.appendChild(inp('password','رمز عبور'+(mode==='register'?' (حداقل ۸ کاراکتر)':''),'password',mode==='login'?'current-password':'new-password'));
    var go=h('button',{class:'p',text:mode==='login'?'ورود':'ساخت حساب',onclick:function(){
      err.textContent='';go.disabled=true;
      var b={username:f.username.value,password:f.password.value};if(mode==='register')b.email=f.email.value;
      api('auth/'+mode,{method:'POST',body:b}).then(function(j){U=j.user;setFab();load();draw()}).catch(function(e){err.textContent=(e&&e.error)||'خطا؛ دوباره تلاش کن.';go.disabled=false})}});
    box.appendChild(h('div',{class:'r'},[go]));box.appendChild(err);
    box.appendChild(h('p',{class:'m',text:'با ثبت‌نام می‌توانی تیکت‌هایت را پیگیری و هشدار قیمت بگذاری.'}));
  }else{
    box.appendChild(h('div',{class:'r',style:'margin-bottom:10px'},[h('b',{text:'سلام، '+U.username}),h('span',{style:'flex:1'}),
      h('button',{class:'d',text:'خروج',onclick:function(){api('auth/logout',{method:'POST'}).finally(function(){U=null;AL=[];TKS=[];setFab();draw()})}}),close]));
    box.appendChild(h('div',{class:'r',style:'margin-bottom:10px'},[
      h('button',{text:'هشدار قیمت','aria-pressed':String(tab==='alerts'),onclick:function(){tab='alerts';draw()}}),
      h('button',{text:'تیکت‌های من','aria-pressed':String(tab==='tickets'),onclick:function(){tab='tickets';draw()}})]));
    if(tab==='alerts'){
      var co=h('input',{placeholder:'نماد ارز، مثل BTC','aria-label':'نماد ارز'});co.setAttribute('dir','ltr');
      var dr=h('select',{'aria-label':'جهت'},[h('option',{value:'gte',text:'قیمت بالاتر از'}),h('option',{value:'lte',text:'قیمت پایین‌تر از'})]);
      var pr=h('input',{placeholder:'قیمت',type:'number',inputmode:'decimal','aria-label':'قیمت'});pr.setAttribute('dir','ltr');
      var cu=h('select',{'aria-label':'واحد'},[h('option',{value:'IRT',text:'تومان'}),h('option',{value:'USDT',text:'تتر'})]);
      box.appendChild(co);box.appendChild(dr);box.appendChild(pr);box.appendChild(cu);
      box.appendChild(h('div',{class:'r'},[h('button',{class:'p',text:'افزودن هشدار',onclick:function(){
        err.textContent='';try{if('Notification' in window&&Notification.permission==='default')Notification.requestPermission()}catch(e){}
        api('me/alerts',{method:'POST',body:{coin:co.value,dir:dr.value,price:pr.value,cur:cu.value}}).then(load).catch(function(e){err.textContent=(e&&e.error)||'خطا'})}})]));
      box.appendChild(err);
      box.appendChild(h('p',{class:'m',text:'هشدار فقط وقتی سایت در مرورگرت باز است بررسی می‌شود.'}));
      if(!AL.length)box.appendChild(h('div',{class:'m',text:'هشداری نداری.'}));
      AL.forEach(function(a){box.appendChild(h('div',{class:'it r'},[h('span',{dir:'ltr',text:a.coin+' '+(a.dir==='gte'?'≥':'≤')+' '+a.price+' '+a.cur}),h('span',{class:'m',text:a.done?'اجرا شد':'فعال'}),h('span',{style:'flex:1'}),
        h('button',{class:'d',text:'حذف',onclick:function(){api('me/alerts/'+a.id,{method:'DELETE'}).then(load)}})]))});
    }else{
      box.appendChild(h('p',{class:'m',text:'برای ثبت تیکت جدید از بخش پشتیبانی سایت استفاده کن. تیکت‌هایی که با حسابت می‌فرستی اینجا دیده می‌شوند.'}));
      if(!TKS.length)box.appendChild(h('div',{class:'m',text:'تیکتی نداری.'}));
      TKS.forEach(function(t){box.appendChild(h('div',{class:'it'},[h('div',{class:'m',text:t.id+' · '+ST[t.status]+' · '+new Date(t.created).toLocaleDateString('fa-IR')}),h('div',{text:t.message.slice(0,200)})]))});
    }
  }
  document.body.appendChild(ov);
}
function load(){if(!U)return;
  Promise.all([api('me/alerts'),api('me/tickets')]).then(function(r){AL=r[0];TKS=r[1];if(open)draw()}).catch(function(){})}
/* بررسی هشدارها روی قیمت‌هایی که خود سایت می‌گیرد */
var of=window.fetch;
window.fetch=function(u){var p=of.apply(this,arguments);
  if(U&&AL.length&&String(u).indexOf('/api/v1/mkt/tickers/')>-1)p.then(function(r){return r.clone().json()}).then(check).catch(function(){});
  return p};
function check(a){if(!Array.isArray(a))return;
  AL.forEach(function(x){if(x.done)return;
    var t=a.filter(function(i){return String(i.symbol)===x.coin+'_'+x.cur})[0];if(!t)return;
    var p=+t.price;if(!(p>0))return;
    if((x.dir==='gte'&&p>=x.price)||(x.dir==='lte'&&p<=x.price)){
      x.done=1;var m='هشدار قیمت: '+x.coin+' به '+p+' '+(x.cur==='IRT'?'تومان':'تتر')+' رسید.';
      toast(m);try{if('Notification' in window&&Notification.permission==='granted')new Notification(m)}catch(e){}
      api('me/alerts/'+x.id,{method:'PATCH'}).catch(function(){});if(open)draw()}})}
setFab();
api('auth/me').then(function(j){U=j.user||null;setFab();load()}).catch(function(){});
})();
