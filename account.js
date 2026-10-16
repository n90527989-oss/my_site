(function(){
if(window.__acct)return;window.__acct=1;
var U=null,D={al:[],tk:[],fav:[],prof:null},PR={},OPEN=false,SEC='ov',TH=null,AUTH=false,MODE='login';
var ST={new:'ارسال‌شده',open:'در حال بررسی',done:'بسته‌شده'};
function h(t,a,k){var e=document.createElement(t);for(var x in a||{}){if(x==='text')e.textContent=a[x];else if(x.slice(0,2)==='on')e[x]=a[x];else e.setAttribute(x,a[x])}(k||[]).forEach(function(c){if(c!=null&&c!==false)e.appendChild(typeof c==='string'?document.createTextNode(c):c)});return e}
function sessionEnd(){if(!U)return;U=null;D={al:[],tk:[],fav:[],prof:null};TH=null;closeOv();setFab();toast('نشست تمام شد؛ دوباره وارد شو',4500)}
function api(p,o){o=o||{};o.credentials='same-origin';if(o.body&&typeof o.body!=='string'){o.body=JSON.stringify(o.body);o.headers={'content-type':'application/json'}}
  return fetch('/api/'+p,o).then(function(r){return r.text().then(function(t){var j;try{j=JSON.parse(t)}catch(e){throw{error:'پاسخ سرور نامعتبر است؛ فایل‌های سرور کامل نصب نشده‌اند.'}}if(r.status===401&&/^me\//.test(p))sessionEnd();if(!r.ok)throw j;return j})})}
var fa=new Intl.NumberFormat('fa-IR'),en=new Intl.NumberFormat('en-US',{maximumFractionDigits:8});
function dt(t){return new Date(t).toLocaleDateString('fa-IR')}
var V='var(--';
var css=document.createElement('style');
css.textContent=[
'#dot,#stx,#tpage{display:none!important}.stt{gap:8px!important}',
/* ---------- حرکت‌های تازهٔ سایت ---------- */
'@keyframes up{from{opacity:0;transform:translateY(18px) scale(.98)}}@keyframes fi{from{opacity:0}}',
'@keyframes pgin{from{opacity:0;transform:translateY(8px) scale(.985);filter:blur(4px)}}',
'@keyframes fl{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-10px) rotate(.7deg)}}',
'@keyframes fx{0%{background:var(--c);box-shadow:0 0 0 4px var(--c)}100%{background:transparent;box-shadow:0 0 0 0 transparent}}',
'@keyframes acpop{from{opacity:0;transform:translateY(-8px) scale(.96)}}@keyframes acsl{from{opacity:0;transform:translateY(24px)}}',
'.rv{opacity:0;transform:translateY(24px) scale(.985);filter:blur(5px);transition:opacity .65s cubic-bezier(.2,.8,.2,1),transform .8s cubic-bezier(.2,.8,.2,1),filter .65s}.rv.in{opacity:1;transform:none;filter:none}',
'.card,.sc,.hk,.rw,.btn,.mv .row{transition:transform .28s cubic-bezier(.2,.8,.2,1),box-shadow .28s,border-color .25s,background .2s}',
'.card:hover,.sc:hover{transform:translateY(-4px)}.btn:hover{transform:translateY(-2px)}.btn:active,button:active{transform:scale(.95)}',
'.nv a{transition:color .2s,background .25s}#ac-pg{position:fixed;top:0;inset-inline:0;height:3px;z-index:60;transform-origin:right;transform:scaleX(0);background:linear-gradient(90deg,var(--ac),#4d8dff);pointer-events:none}',
'@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}.rv{opacity:1;transform:none;filter:none}}',
/* ---------- دکمهٔ حساب ---------- */
'.ac-i{position:relative;width:38px;height:38px;flex:none;border-radius:50%;border:1px solid '+V+'ed,#232d36);background:'+V+'s2,#1a2229);color:'+V+'ink,#eaf0f3);display:grid;place-items:center;padding:0;font-weight:800;font-family:inherit;cursor:pointer;transition:transform .2s,background .2s}',
'.ac-i:hover{transform:scale(1.07)}.ac-i.on{background:'+V+'ac,#1bc48a);color:'+V+'ai,#04140d);border-color:'+V+'ac,#1bc48a)}.ac-i svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}',
'.ac-i .bg{position:absolute;top:-2px;inset-inline-end:-2px;width:12px;height:12px;border-radius:50%;background:'+V+'dn,#ff5c6a);border:2px solid '+V+'bg,#080b0e)}.ac-i.fl{position:fixed;z-index:9990;top:10px;left:10px}',
/* ---------- منو و پنل ---------- */
'#ac-mn{position:fixed;z-index:9996;width:268px;background:'+V+'sf,#11171c);color:'+V+'ink,#eaf0f3);border:1px solid '+V+'ed,#232d36);border-radius:18px;padding:8px;box-shadow:0 18px 50px rgba(0,0,0,.45);direction:rtl;font-family:inherit;animation:acpop .18s ease-out}',
'#ac-mn .hd2{display:flex;gap:10px;align-items:center;padding:10px;border-bottom:1px solid '+V+'ed,#232d36);margin-bottom:6px}',
'.av{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,'+V+'ac,#1bc48a),#4d8dff);color:'+V+'ai,#04140d);display:grid;place-items:center;font-weight:800;font-size:1.1rem;flex:none}',
'#ac-mn button.mi{display:flex;align-items:center;width:100%;text-align:right;border:0;background:none;color:inherit;font:inherit;padding:10px 12px;border-radius:12px;cursor:pointer;gap:8px}#ac-mn button.mi:hover{background:'+V+'s2,#1a2229)}',
'#ac-mn .cnt{margin-inline-start:auto;background:'+V+'dn,#ff5c6a);color:#fff;border-radius:999px;font-size:.72rem;font-weight:800;padding:0 7px}',
'.ac-sh{position:fixed;inset:0;z-index:9997;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:16px;direction:rtl;font-family:inherit;color:'+V+'ink,#eaf0f3);animation:fi .2s}',
'#ac-ov{position:fixed;inset:0;z-index:9995;background:'+V+'bg,#080b0e);color:'+V+'ink,#eaf0f3);overflow:auto;direction:rtl;font-family:inherit;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);animation:fi .2s}',
'#ac-ov *,.ac-sh *{box-sizing:border-box}.ac-bar{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:10px;padding:12px 16px;background:'+V+'sf,#11171c);border-bottom:1px solid '+V+'ed,#232d36)}',
'.ac-w{max-width:980px;margin:0 auto;padding:14px 14px 40px}.ac-g{display:grid;gap:14px;grid-template-columns:1fr}@media(min-width:760px){.ac-g{grid-template-columns:220px 1fr}}',
'.ac-n{display:flex;gap:6px;overflow-x:auto;padding-bottom:2px}@media(min-width:760px){.ac-n{flex-direction:column;position:sticky;top:72px;align-self:start}}',
'.ac-n button{white-space:nowrap;text-align:right;display:flex;align-items:center;gap:8px}.ac-n button[aria-pressed=true]{background:'+V+'ac,#1bc48a);color:'+V+'ai,#04140d);border-color:'+V+'ac,#1bc48a);font-weight:700}',
'.ac-pg{animation:acsl .3s cubic-bezier(.2,.8,.2,1)}',
'#ac-ov button,.ac-sh button,#ac-ov select{font:inherit;color:'+V+'ink,#eaf0f3);background:'+V+'s2,#1a2229);border:1px solid '+V+'ed,#232d36);border-radius:12px;padding:8px 14px;cursor:pointer;transition:transform .15s,background .2s}',
'#ac-ov button.p,.ac-sh button.p{background:'+V+'ac,#1bc48a);border-color:'+V+'ac,#1bc48a);color:'+V+'ai,#04140d);font-weight:800}#ac-ov button.d{color:'+V+'dn,#ff5c6a)}#ac-ov button:disabled,.ac-sh button:disabled{opacity:.5}',
'#ac-ov input,#ac-ov textarea,#ac-ov select,.ac-sh input{font:inherit;color:'+V+'ink,#eaf0f3);background:'+V+'s2,#1a2229);border:1px solid '+V+'ed,#232d36);border-radius:12px;padding:10px 12px;width:100%;margin-bottom:8px}',
'#ac-ov :focus-visible,.ac-sh :focus-visible,#ac-mn :focus-visible{outline:2px solid '+V+'ac,#1bc48a);outline-offset:2px}',
'.cd{background:'+V+'sf,#11171c);border:1px solid '+V+'ed,#232d36);border-radius:18px;padding:14px;margin-bottom:12px}.cd h3{margin:0 0 10px;font-size:1rem}',
'.ac-s{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px}@media(min-width:600px){.ac-s{grid-template-columns:repeat(4,1fr)}}.ac-s div{background:'+V+'sf,#11171c);border:1px solid '+V+'ed,#232d36);border-radius:18px;padding:12px}.ac-s b{display:block;font-size:1.6rem;line-height:1.3}',
'.mu{color:'+V+'mu,#8a96a2);font-size:.84rem}.er{color:'+V+'dn,#ff5c6a);min-height:1.5em}.rw2{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.sp2{flex:1}.it{border-top:1px solid '+V+'ed,#232d36);padding:10px 0}.it:first-of-type{border-top:0}',
'.bd2{display:inline-block;padding:1px 10px;border-radius:8px;font-size:.78rem;font-weight:700;background:'+V+'s2,#1a2229)}.bd2.a{background:rgba(27,196,138,.18);color:'+V+'ac,#1bc48a)}',
'.bb{max-width:85%;padding:9px 13px;border-radius:14px;margin-bottom:8px;white-space:pre-wrap;word-break:break-word}.bb.u{background:'+V+'ac,#1bc48a);color:'+V+'ai,#04140d);margin-inline-start:auto;border-end-start-radius:4px}.bb.s{background:'+V+'s2,#1a2229);border-end-end-radius:4px}',
'.tm{position:fixed;z-index:10000;top:calc(12px + env(safe-area-inset-top,0px));left:50%;transform:translateX(-50%);background:'+V+'ink,#eaf0f3);color:'+V+'bg,#080b0e);padding:10px 18px;border-radius:12px;font-weight:700;max-width:90vw;text-align:center;animation:acpop .2s}'
].join('');
document.head.appendChild(css);


var BRAND='تحلیل‌گرام',LOGO='',MARK='<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="29" fill="none" stroke="url(#acg)" stroke-width="3"/><g fill="url(#acg)"><rect class="cn" x="18" y="39" width="5" height="9" rx="1"/><rect class="cn" x="26" y="33" width="5" height="15" rx="1"/><rect class="cn" x="34" y="26" width="5" height="22" rx="1"/><rect class="cn" x="42" y="18" width="5" height="30" rx="1"/></g><path class="ar" pathLength="1" d="M13 47C26 45 37 35 50 15" fill="none" stroke="url(#acg)" stroke-width="3" stroke-linecap="round"/><path class="ah" d="M42 14h9v9" fill="none" stroke="url(#acg)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
try{if(!localStorage.getItem('th'))document.documentElement.dataset.theme='dark'}catch(e){}

if(!document.getElementById('acg'))document.body.insertAdjacentHTML('beforeend','<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="acg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b8862b"/><stop offset=".5" stop-color="#f6dc8a"/><stop offset="1" stop-color="#c99a2e"/></linearGradient></defs></svg>');
/* فاوآیکون */
(function(){var l=document.querySelector('link[rel~=icon]')||document.head.appendChild(Object.assign(document.createElement('link'),{rel:'icon'}));
 l.type='image/svg+xml';l.href='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#060504"/><circle cx="32" cy="32" r="24" fill="none" stroke="#e2b64c" stroke-width="3"/><g fill="#e2b64c"><rect x="21" y="37" width="4" height="8"/><rect x="28" y="31" width="4" height="14"/><rect x="35" y="25" width="4" height="20"/></g><path d="M16 44C28 42 36 34 46 20" stroke="#f6dc8a" stroke-width="3" fill="none" stroke-linecap="round"/></svg>')})();
/* تغییر نام و لوگوی سایت */
var OLD=/تحلیل[\u200c ]?گر(?!ام)/g,OLDT=/تحلیل[\u200c ]?گر(?!ام)/;
function rebrand(){
  var a=document.querySelector('a.lg');if(a&&!a.querySelector('.bn')){a.textContent='';a.appendChild(h('b',{}));a.firstChild.innerHTML=MARK;a.appendChild(h('span',{class:'bn',text:BRAND}))}
  var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentNode;if(!p||/^(SCRIPT|STYLE|TEXTAREA)$/.test(p.nodeName)||(p.closest&&p.closest('#ac-ov,#ac-mn,.ac-sh,a.lg')))return NodeFilter.FILTER_REJECT;return OLDT.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),L=[];
  while(w.nextNode())L.push(w.currentNode);L.forEach(function(n){n.nodeValue=n.nodeValue.replace(OLD,BRAND)});
  if(OLDT.test(document.title))document.title=document.title.replace(OLD,BRAND)}
rebrand();
var tEl=document.querySelector('title');if(tEl)new MutationObserver(function(){if(OLDT.test(document.title))document.title=document.title.replace(OLD,BRAND)}).observe(tEl,{childList:true});
/* لوگوی اصلی: اگر فایلش آپلود شده باشد */
function probe(cb){var i=new Image();i.onload=function(){cb('/logo.webp')};i.onerror=function(){var j=new Image();j.onload=function(){cb('/logo.png')};j.onerror=function(){cb('')};j.src='/logo.png'};i.src='/logo.webp'}
var RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
probe(function(u){LOGO=u;if(!u)return;
  var hero=document.querySelector('#top .rv');if(hero&&!hero.querySelector('.emb'))hero.insertBefore(h('img',{class:'emb',src:u,alt:BRAND,width:'210',height:'210',decoding:'async'}),hero.firstChild);
  var sp=null;try{sp=sessionStorage.getItem('ac_sp')}catch(e){}
  if(!sp&&!RM){try{sessionStorage.setItem('ac_sp','1')}catch(e){}var o=h('div',{id:'ac-sp','aria-hidden':'true'},[h('i'),h('img',{src:u,alt:''})]);document.body.appendChild(o);setTimeout(function(){o.classList.add('out');setTimeout(function(){o.remove()},750)},1500)}});
/* ذرات طلایی پشت بخش اول */
(function(){var host=document.getElementById('top');if(!host||RM)return;
  var c=h('canvas',{class:'pcv','aria-hidden':'true'}),x=c.getContext('2d'),W=0,H=0,P=[],raf=0,vis=true,dpr=Math.min(devicePixelRatio||1,1.5),col='#e2b64c';host.insertBefore(c,host.firstChild);
  function size(){W=host.clientWidth;H=host.clientHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0)}size();addEventListener('resize',size);
  for(var i=0;i<(innerWidth<700?22:44);i++)P.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.6+.4,v:Math.random()*.28+.08,a:Math.random()*6.28,s:Math.random()*.02+.006});
  function loop(){raf=0;if(!vis||document.hidden)return;x.clearRect(0,0,W,H);x.fillStyle=col;P.forEach(function(p){p.y-=p.v;p.a+=p.s;if(p.y<-4){p.y=H+4;p.x=Math.random()*W}x.globalAlpha=.2+.5*Math.abs(Math.sin(p.a));x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fill()});raf=requestAnimationFrame(loop)}
  function start(){if(!raf)raf=requestAnimationFrame(loop)}
  function sc(){col=(getComputedStyle(document.documentElement).getPropertyValue('--ac')||'#e2b64c').trim()}sc();
  new MutationObserver(sc).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  new IntersectionObserver(function(e){vis=e[0].isIntersecting;if(vis)start()}).observe(host);document.addEventListener('visibilitychange',start);start()})();
/* نور دنبال‌کنندهٔ موس روی کارت‌ها */
document.addEventListener('pointermove',function(e){var t=e.target.closest&&e.target.closest('.card,.hk,.sc');if(t){var r=t.getBoundingClientRect();t.style.setProperty('--mx',(e.clientX-r.left)+'px');t.style.setProperty('--my',(e.clientY-r.top)+'px')}},{passive:true});
function countUp(){if(RM)return;document.querySelectorAll('#ac-ov .ac-s b[data-n]').forEach(function(el){var n=+el.getAttribute('data-n'),t0=performance.now();if(!n)return;(function f(t){var k=Math.min(1,(t-t0)/650);el.textContent=fa.format(Math.round(n*(1-Math.pow(1-k,3))));if(k<1)requestAnimationFrame(f)})(t0)})}

/* نوار پیشرفت اسکرول */
var pg=h('div',{id:'ac-pg','aria-hidden':'true'});document.body.appendChild(pg);var tk=0;
addEventListener('scroll',function(){if(tk)return;tk=requestAnimationFrame(function(){tk=0;var d=document.documentElement,m=d.scrollHeight-innerHeight;pg.style.transform='scaleX('+(m>0?Math.min(1,scrollY/m):0)+')'})},{passive:true});

/* دکمهٔ آیکونی حساب */
var ICON='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>';
var fab=h('button',{class:'ac-i','aria-label':'حساب کاربری','aria-haspopup':'menu',onclick:function(e){e.stopPropagation();toggleMenu()}}),host=document.querySelector('.stt');
if(host)host.appendChild(fab);else{fab.className+=' fl';document.body.appendChild(fab)}
function nNew(){return D.tk.filter(function(t){return t.last_author==='admin'&&t.status!=='done'}).length}
function nAl(){return D.al.filter(function(a){return!a.done}).length}
function nTk(){return D.tk.filter(function(t){return t.status!=='done'}).length}
function setFab(){fab.textContent='';fab.classList.toggle('on',!!U);
  if(U){fab.appendChild(document.createTextNode(U.username.charAt(0).toUpperCase()));if(nNew())fab.appendChild(h('i',{class:'bg'}))}else fab.insertAdjacentHTML('beforeend',ICON)}
function toast(m,ms){var t=h('div',{class:'tm',role:'status',text:m});document.body.appendChild(t);setTimeout(function(){t.remove()},ms||3200)}

/* منوی کشویی مثل بیت‌پین */
function closeMenu(){var m=document.getElementById('ac-mn');if(m)m.remove()}
function toggleMenu(){if(document.getElementById('ac-mn')){closeMenu();return}
  var m=h('div',{id:'ac-mn',role:'menu'}),r=fab.getBoundingClientRect();
  m.style.top=(r.bottom+8)+'px';m.style.left=Math.max(8,Math.min(r.left,innerWidth-276))+'px';
  function it(txt,fn,cnt){return h('button',{class:'mi',role:'menuitem',onclick:function(){closeMenu();fn()}},[txt,cnt?h('span',{class:'cnt',text:String(cnt)}):null])}
  if(!U){m.appendChild(h('div',{class:'hd2'},[h('div',{class:'av',text:'؟'}),h('div',{},[h('b',{text:'خوش آمدی'}),h('div',{class:'mu',text:'برای دسترسی به امکانات وارد شو'})])]));
    m.appendChild(it('ورود',function(){showAuth('login')}));m.appendChild(it('ثبت‌نام',function(){showAuth('register')}))}
  else{m.appendChild(h('div',{class:'hd2'},[h('div',{class:'av',text:U.username.charAt(0).toUpperCase()}),h('div',{style:'min-width:0'},[h('b',{text:U.username}),h('div',{class:'mu',dir:'ltr',style:'overflow:hidden;text-overflow:ellipsis',text:D.prof?D.prof.email:''})])]));
    [['نمای کلی','ov'],['لیست پیگیری','wl'],['هشدارها','al'],['پشتیبانی','sup',nNew()],['حساب و امنیت','pf']].forEach(function(x){m.appendChild(it(x[0],function(){openPanel(x[1])},x[2]))});
    m.appendChild(it('ورود با حساب دیگر',function(){switchTo('login')}));m.appendChild(it('ساخت حساب جدید',function(){switchTo('register')}));
    m.appendChild(it('خروج',logout))}
  document.body.appendChild(m);var f=m.querySelector('button');if(f)f.focus()}
document.addEventListener('click',function(e){var m=document.getElementById('ac-mn');if(m&&!m.contains(e.target))closeMenu()});
addEventListener('resize',closeMenu);
function switchTo(mode){api('auth/logout',{method:'POST'}).finally(function(){U=null;D={al:[],tk:[],fav:[],prof:null};TH=null;closeOv();setFab();showAuth(mode)})}
function logout(){api('auth/logout',{method:'POST'}).finally(function(){U=null;D={al:[],tk:[],fav:[],prof:null};TH=null;OPEN=false;closeOv();setFab();toast('خارج شدی')})}

/* ورود و ثبت‌نام */
function showAuth(mode){MODE=mode||MODE;var o=document.getElementById('ac-au');if(o)o.remove();
  var f={},err=h('div',{class:'er',role:'alert'}),box=h('div',{class:'cd',role:'dialog','aria-modal':'true','aria-label':'ورود یا ثبت‌نام',style:'width:100%;max-width:400px;margin:0;animation:acpop .2s'}),ov=h('div',{class:'ac-sh',id:'ac-au',onclick:function(e){if(e.target===ov)ov.remove()}},[box]);
  function inp(n,ph,ty,ac){var i=h('input',{placeholder:ph,type:ty||'text','aria-label':ph,autocomplete:ac||'off',dir:'ltr'});f[n]=i;return i}
  if(LOGO)box.appendChild(h('img',{class:'ac-lg',src:LOGO,alt:BRAND}));
  box.appendChild(h('div',{class:'rw2',style:'margin-bottom:12px'},[h('b',{style:'font-size:1.1rem',text:(MODE==='login'?'ورود به ':'ساخت حساب در ')+BRAND}),h('span',{class:'sp2'}),h('button',{'aria-label':'بستن',text:'✕',onclick:function(){ov.remove()}})]));
  box.appendChild(inp('username','نام کاربری (انگلیسی)','text','username'));
  if(MODE==='register'){
    box.appendChild(inp('email','ایمیل','email','email'));
    var sc=h('button',{text:'ارسال کد به ایمیل',style:'width:100%;margin-bottom:8px',onclick:function(){
      err.textContent='';var em=f.email.value.trim();if(!em){err.textContent='اول ایمیل را وارد کن.';return}
      sc.disabled=true;api('auth/send-code',{method:'POST',body:{email:em}}).then(function(j){toast('کد به ایمیلت فرستاده شد؛ پوشهٔ اسپم را هم ببین',5000);tick(j.wait||60);f.code.focus()}).catch(function(e){err.textContent=(e&&e.error)||'خطا؛ دوباره تلاش کن.';if(e&&e.wait)tick(e.wait);else sc.disabled=false})}});
    function tick(n){sc.disabled=true;sc.textContent='ارسال دوباره ('+n+')';var t=setInterval(function(){n--;if(!document.body.contains(sc)){clearInterval(t);return}if(n<=0){clearInterval(t);sc.disabled=false;sc.textContent='ارسال دوباره'}else sc.textContent='ارسال دوباره ('+n+')'},1000)}
    box.appendChild(sc);box.appendChild(inp('code','کد ۶ رقمی ایمیل','text','one-time-code'));f.code.setAttribute('inputmode','numeric');f.code.setAttribute('maxlength','6');
  }
  box.appendChild(inp('password','رمز عبور'+(MODE==='register'?' (حداقل ۸ کاراکتر)':''),'password',MODE==='login'?'current-password':'new-password'));
  var b=h('button',{class:'p',style:'width:100%;padding:11px',text:MODE==='login'?'ورود':'ساخت حساب',onclick:submit});
  function submit(){err.textContent='';b.disabled=true;var d={username:f.username.value,password:f.password.value};if(MODE==='register'){d.email=f.email.value;d.code=f.code.value}
    api('auth/'+MODE,{method:'POST',body:d}).then(function(j){U=j.user;ov.remove();setFab();toast('خوش آمدی '+U.username);load()}).catch(function(e){err.textContent=(e&&e.error)||'خطا؛ دوباره تلاش کن.';b.disabled=false})}
  Object.keys(f).forEach(function(k){f[k].onkeydown=function(e){if(e.key==='Enter')submit()}});
  box.appendChild(b);box.appendChild(err);
  box.appendChild(h('div',{class:'mu',style:'text-align:center'},[MODE==='login'?'حساب نداری؟ ':'حساب داری؟ ',h('a',{href:'#',style:'color:var(--ac,#1bc48a)',text:MODE==='login'?'ثبت‌نام':'ورود',onclick:function(e){e.preventDefault();showAuth(MODE==='login'?'register':'login')}})]));
  document.body.appendChild(ov);f.username.focus()}

/* پنل کاربری */
function openPanel(s){if(!U){showAuth('login');return}SEC=s||SEC;TH=null;OPEN=true;
  var o=document.getElementById('ac-ov');if(!o){o=h('div',{id:'ac-ov',role:'dialog','aria-modal':'true','aria-label':'حساب کاربری'});document.body.appendChild(o);document.documentElement.style.overflow='hidden'}
  build(o);load()}
function closeOv(){OPEN=false;var o=document.getElementById('ac-ov');if(o)o.remove();document.documentElement.style.overflow=''}
function busy(){var a=document.activeElement;return OPEN&&a&&a.closest&&a.closest('#ac-ov')&&/INPUT|TEXTAREA|SELECT/.test(a.tagName)}
function render(force){var o=document.getElementById('ac-ov');if(!o||(!force&&busy()))return;var y=o.scrollTop;build(o,true);o.scrollTop=y}
function build(o,keep){o.textContent='';
  o.appendChild(h('div',{class:'ac-bar'},[h('button',{text:'‹ بازگشت به سایت',onclick:closeOv}),h('b',{text:'حساب کاربری'}),h('span',{class:'sp2'}),h('div',{class:'av',style:'width:34px;height:34px;font-size:.95rem',text:U.username.charAt(0).toUpperCase()})]));
  var w=h('div',{class:'ac-w'}),g=h('div',{class:'ac-g'}),nav=h('nav',{class:'ac-n','aria-label':'بخش‌های حساب'}),m=h('div',{class:keep?'':'ac-pg'});
  [['ov','نمای کلی'],['wl','لیست پیگیری'],['al','هشدارها'],['sup','پشتیبانی'],['pf','حساب و امنیت']].forEach(function(t){
    var b=h('button',{text:t[1],'aria-pressed':String(SEC===t[0]),onclick:function(){SEC=t[0];TH=null;build(o)}});if(t[0]==='sup'&&nNew())b.appendChild(h('span',{class:'cnt',style:'background:var(--dn,#ff5c6a);color:#fff;border-radius:999px;font-size:.7rem;padding:0 7px',text:String(nNew())}));nav.appendChild(b)});
  g.appendChild(nav);g.appendChild(m);w.appendChild(g);o.appendChild(w);
  ({ov:ovV,wl:wlV,al:alV,sup:supV,pf:pfV})[SEC](m);upd();if(!keep)countUp()}
function price(s,c){return h('span',{'data-pr':s+'_'+c,dir:'ltr',text:'—'})}
function upd(){document.querySelectorAll('#ac-ov [data-pr]').forEach(function(e){var k=e.getAttribute('data-pr'),v=PR[k];e.textContent=v?(/_IRT$/.test(k)?fa.format(Math.round(v)):en.format(v)):'—'})}
function rowP(s){return h('div',{class:'it rw2'},[h('b',{dir:'ltr',text:s}),h('span',{class:'sp2'}),h('span',{class:'mu'},['تومان ',price(s,'IRT')]),h('span',{class:'mu'},['تتر ',price(s,'USDT')])])}
function ovV(m){
  m.appendChild(h('div',{class:'cd'},[h('h3',{text:'سلام، '+U.username+' 👋'}),h('div',{class:'mu',text:D.prof?'عضو از '+dt(D.prof.created):''})]));
  var s=h('div',{class:'ac-s'});[[D.fav.length,'ارز در لیست پیگیری'],[nAl(),'هشدار فعال'],[nTk(),'تیکت باز'],[nNew(),'پاسخ جدید']].forEach(function(x){s.appendChild(h('div',{},[h('b',{'data-n':String(x[0]),text:fa.format(x[0])}),h('span',{class:'mu',text:x[1]})]))});m.appendChild(s);
  var c=h('div',{class:'cd'},[h('h3',{text:'لیست پیگیری'})]);if(!D.fav.length)c.appendChild(h('div',{class:'mu',text:'هنوز ارزی اضافه نکرده‌ای.'}));D.fav.slice(0,5).forEach(function(x){c.appendChild(rowP(x))});
  c.appendChild(h('div',{style:'margin-top:8px'},[h('button',{text:'مدیریت لیست',onclick:function(){SEC='wl';render(1)}})]));m.appendChild(c);
  var t=h('div',{class:'cd'},[h('h3',{text:'آخرین تیکت‌ها'})]);if(!D.tk.length)t.appendChild(h('div',{class:'mu',text:'تیکتی نداری.'}));D.tk.slice(0,3).forEach(function(x){t.appendChild(tkRow(x))});
  t.appendChild(h('div',{style:'margin-top:8px'},[h('button',{class:'p',text:'تیکت جدید',onclick:function(){SEC='sup';render(1)}})]));m.appendChild(t)}
function wlV(m){
  var i=h('input',{placeholder:'نماد ارز، مثل BTC','aria-label':'نماد ارز',dir:'ltr'});
  function add(){var v=i.value.trim();if(!v)return;api('me/favs',{method:'PUT',body:{list:D.fav.concat([v])}}).then(function(l){D.fav=l;render(1)}).catch(function(e){toast((e&&e.error)||'خطا')})}
  i.onkeydown=function(e){if(e.key==='Enter')add()};
  m.appendChild(h('div',{class:'cd'},[h('h3',{text:'افزودن به لیست پیگیری'}),i,h('button',{class:'p',text:'افزودن',onclick:add})]));
  var c=h('div',{class:'cd'},[h('h3',{text:'ارزهای من'})]);if(!D.fav.length)c.appendChild(h('div',{class:'mu',text:'لیست خالی است.'}));
  D.fav.forEach(function(s){var r=rowP(s);r.appendChild(h('button',{class:'d',text:'حذف',onclick:function(){api('me/favs',{method:'PUT',body:{list:D.fav.filter(function(x){return x!==s})}}).then(function(l){D.fav=l;render(1)})}}));c.appendChild(r)});m.appendChild(c)}
function alV(m){
  var co=h('input',{placeholder:'نماد ارز، مثل BTC','aria-label':'نماد ارز',dir:'ltr'}),dr=h('select',{'aria-label':'جهت'},[h('option',{value:'gte',text:'قیمت بالاتر از'}),h('option',{value:'lte',text:'قیمت پایین‌تر از'})]),
  pr=h('input',{placeholder:'قیمت',type:'number',inputmode:'decimal','aria-label':'قیمت',dir:'ltr'}),cu=h('select',{'aria-label':'واحد'},[h('option',{value:'IRT',text:'تومان'}),h('option',{value:'USDT',text:'تتر'})]),er=h('div',{class:'er',role:'alert'});
  m.appendChild(h('div',{class:'cd'},[h('h3',{text:'هشدار جدید'}),co,dr,pr,cu,h('button',{class:'p',text:'افزودن هشدار',onclick:function(){er.textContent='';try{if('Notification' in window&&Notification.permission==='default')Notification.requestPermission()}catch(e){}
    api('me/alerts',{method:'POST',body:{coin:co.value,dir:dr.value,price:pr.value,cur:cu.value}}).then(function(){toast('هشدار اضافه شد');return load(1)}).catch(function(e){er.textContent=(e&&e.error)||'خطا'})}}),er,h('div',{class:'mu',text:'هشدار فقط وقتی سایت در مرورگرت باز است بررسی می‌شود.'})]));
  var c=h('div',{class:'cd'},[h('h3',{text:'هشدارهای من'})]);if(!D.al.length)c.appendChild(h('div',{class:'mu',text:'هشداری نداری.'}));
  D.al.forEach(function(a){c.appendChild(h('div',{class:'it rw2'},[h('b',{dir:'ltr',text:a.coin+' '+(a.dir==='gte'?'≥':'≤')+' '+a.price+' '+a.cur}),h('span',{class:'bd2'+(a.done?'':' a'),text:a.done?'اجرا شد':'فعال'}),h('span',{class:'mu'},['الان: ',price(a.coin,a.cur)]),h('span',{class:'sp2'}),h('button',{class:'d',text:'حذف',onclick:function(){api('me/alerts/'+a.id,{method:'DELETE'}).then(function(){return load(1)})}})]))});m.appendChild(c)}
function tkRow(t){function go(){SEC='sup';openTh(t.id)}return h('div',{class:'it rw2',style:'cursor:pointer',role:'button',tabindex:'0',onclick:go,onkeydown:function(e){if(e.key==='Enter')go()}},[h('b',{text:t.subject||'بدون موضوع'}),h('span',{class:'bd2'+(t.status==='done'?'':' a'),text:ST[t.status]}),t.last_author==='admin'&&t.status!=='done'?h('span',{class:'bd2 a',text:'پاسخ جدید'}):null,h('span',{class:'sp2'}),h('span',{class:'mu',text:dt(t.created)})])}
function openTh(id){api('me/tickets/'+id).then(function(j){TH=j;if(!OPEN)openPanel('sup');else render(1)}).catch(function(){toast('تیکت پیدا نشد')})}
function supV(m){
  if(TH)return thV(m);
  var sb=h('select',{'aria-label':'موضوع'},['مشکل فنی','سوال دربارهٔ قیمت‌ها','پیشنهاد','سایر'].map(function(x){return h('option',{value:x,text:x})})),tx=h('textarea',{rows:'4',placeholder:'مشکل یا سوالت را بنویس…','aria-label':'متن تیکت',maxlength:'1500'}),er=h('div',{class:'er',role:'alert'});
  var b=h('button',{class:'p',text:'ارسال تیکت',onclick:function(){er.textContent='';b.disabled=true;api('me/tickets',{method:'POST',body:{subject:sb.value,message:tx.value}}).then(function(j){toast('تیکت ارسال شد');return load(1).then(function(){openTh(j.id)})}).catch(function(e){er.textContent=(e&&e.error)||'خطا';b.disabled=false})}});
  m.appendChild(h('div',{class:'cd'},[h('h3',{text:'تیکت جدید'}),sb,tx,b,er]));
  var c=h('div',{class:'cd'},[h('h3',{text:'تیکت‌های من'})]);if(!D.tk.length)c.appendChild(h('div',{class:'mu',text:'تیکتی نداری.'}));D.tk.forEach(function(t){c.appendChild(tkRow(t))});m.appendChild(c)}
function thV(m){
  var t=TH.ticket,c=h('div',{class:'cd'});
  c.appendChild(h('div',{class:'rw2',style:'margin-bottom:10px'},[h('button',{text:'‹ بازگشت',onclick:function(){TH=null;render(1);load(1)}}),h('b',{text:t.subject||'بدون موضوع'}),h('span',{class:'bd2'+(t.status==='done'?'':' a'),text:ST[t.status]}),h('span',{class:'sp2'}),h('span',{class:'mu',text:t.id})]));
  c.appendChild(h('div',{class:'bb u',text:t.message}));TH.msgs.forEach(function(x){c.appendChild(h('div',{class:'bb '+(x.author==='admin'?'s':'u')},[x.author==='admin'?h('div',{class:'mu',text:'پشتیبانی'}):null,x.body]))});
  var tx=h('textarea',{rows:'3',placeholder:'پاسخ بنویس…','aria-label':'پاسخ',maxlength:'1500'}),er=h('div',{class:'er',role:'alert'});
  var b=h('button',{class:'p',text:t.status==='done'?'ارسال و بازکردن دوباره':'ارسال',onclick:function(){if(!tx.value.trim())return;er.textContent='';b.disabled=true;api('me/tickets/'+t.id,{method:'POST',body:{body:tx.value}}).then(function(){return api('me/tickets/'+t.id)}).then(function(j){TH=j;render(1);load(1)}).catch(function(e){er.textContent=(e&&e.error)||'خطا';b.disabled=false})}});
  c.appendChild(tx);c.appendChild(b);c.appendChild(er);m.appendChild(c)}
function pfV(m){
  m.appendChild(h('div',{class:'cd'},[h('h3',{text:'اطلاعات حساب'}),h('div',{},['نام کاربری: ',h('b',{dir:'ltr',text:U.username})]),h('div',{},['ایمیل: ',h('b',{dir:'ltr',text:D.prof?D.prof.email:'…'})]),h('div',{class:'mu',text:D.prof?'عضو از '+dt(D.prof.created):''})]));
  var o=h('input',{type:'password',placeholder:'رمز فعلی','aria-label':'رمز فعلی',autocomplete:'current-password',dir:'ltr'}),n=h('input',{type:'password',placeholder:'رمز جدید (حداقل ۸ کاراکتر)','aria-label':'رمز جدید',autocomplete:'new-password',dir:'ltr'}),er=h('div',{class:'er',role:'alert'});
  m.appendChild(h('div',{class:'cd'},[h('h3',{text:'تغییر رمز عبور'}),o,n,h('button',{class:'p',text:'تغییر رمز',onclick:function(){er.textContent='';api('me/password',{method:'POST',body:{old:o.value,new:n.value}}).then(function(){o.value='';n.value='';toast('رمز تغییر کرد')}).catch(function(e){er.textContent=(e&&e.error)||'خطا'})}}),er]));
  m.appendChild(h('div',{class:'cd'},[h('button',{class:'d',text:'خروج از حساب',onclick:logout})]))}
function load(force){if(!U)return Promise.resolve();
  return Promise.all([api('me/alerts'),api('me/tickets'),api('me/favs'),api('me/profile')]).then(function(r){D={al:r[0],tk:r[1],fav:r[2],prof:r[3]};setFab();if(OPEN&&!TH)render(force)}).catch(function(e){if(OPEN&&e&&e.error&&e.error!=='auth')toast(e.error,5000)})}

/* قیمت زنده و هشدار از روی همان درخواست‌هایی که سایت می‌زند */
var of=window.fetch;
window.fetch=function(u){var p=of.apply(this,arguments);
  if(String(u).indexOf('/api/v1/mkt/tickers/')>-1)p.then(function(r){return r.clone().json()}).then(function(a){if(!Array.isArray(a))return;a.forEach(function(i){var v=+i.price;if(v>0)PR[i.symbol]=v});upd();if(U)check()}).catch(function(){});
  return p};
function check(){D.al.forEach(function(x){if(x.done)return;var p=PR[x.coin+'_'+x.cur];if(!(p>0))return;
  if((x.dir==='gte'&&p>=x.price)||(x.dir==='lte'&&p<=x.price)){x.done=1;var m='هشدار قیمت: '+x.coin+' به '+en.format(p)+' '+(x.cur==='IRT'?'تومان':'تتر')+' رسید.';toast(m,8000);
    try{if('Notification' in window&&Notification.permission==='granted')new Notification(m)}catch(e){}api('me/alerts/'+x.id,{method:'PATCH'}).catch(function(){});render()}})}
setInterval(function(){if(!U||document.hidden)return;
  if(OPEN&&TH){var id=TH.ticket.id,n=TH.msgs.length;api('me/tickets/'+id).then(function(j){if(OPEN&&TH&&TH.ticket.id===id&&j.msgs.length!==n){TH=j;render()}}).catch(function(){})}
  else api('me/tickets').then(function(t){var a=nNew();D.tk=t;setFab();if(nNew()>a){toast('پشتیبانی به تیکتت پاسخ داد');if(OPEN&&SEC==='sup')render()}}).catch(function(){})},25000);
document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeMenu();var a=document.getElementById('ac-au');if(a)a.remove();else if(OPEN)closeOv()}});
document.querySelectorAll('a[href="#/support"]').forEach(function(a){if(a.closest('.nv'))a.textContent='پشتیبانی'});
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href="#/support"]');if(a){e.preventDefault();openPanel('sup')}},true);
if(location.hash==='#/support')location.hash='#/';
setFab();api('auth/me').then(function(j){U=j.user||null;setFab();load()}).catch(function(){});
})();
