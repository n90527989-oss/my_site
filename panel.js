(function(){
var n=0;
function go(){
  var fab=document.getElementById('ac-fab');
  if(!fab){if(n++<30)setTimeout(go,200);return}
  var s=document.createElement('style');
  s.textContent='#ac-fab{display:none!important}'
  +'#ac-user{width:40px;height:40px;border-radius:50%;border:1px solid var(--ed,#232d36);background:var(--cd,#131a22);color:var(--tx,#e8eef4);display:grid;place-items:center;padding:0;cursor:pointer;flex:none;margin-inline-start:8px;transition:.2s}'
  +'#ac-user:hover{border-color:#1bc48a}#ac-user.on{background:#1bc48a;color:#04140d;border-color:#1bc48a}'
  +'#ac-user.fx{position:fixed;top:calc(10px + env(safe-area-inset-top,0px));left:12px;z-index:9998}'
  +'#ac-ov{align-items:center!important;backdrop-filter:blur(6px)}'
  +'#ac-box{border-radius:22px!important;max-width:440px!important;width:calc(100% - 24px)!important;max-height:86vh;overflow:auto;border:1px solid #232d36!important;box-shadow:0 24px 70px rgba(0,0,0,.55)!important}'
  +'#ac-box input,#ac-box textarea,#ac-box select{background:#0e141b!important;border:1px solid #232d36!important;border-radius:12px!important;padding:12px 14px!important;color:inherit}'
  +'#ac-box input:focus,#ac-box textarea:focus{outline:0;border-color:#1bc48a!important}'
  +'#ac-box button{border-radius:12px!important;padding:10px 16px}';
  document.head.appendChild(s);
  var b=document.createElement('button');b.id='ac-user';b.setAttribute('aria-label','حساب کاربری');
  b.innerHTML='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>';
  b.onclick=function(){fab.click()};
  var hd=document.querySelector('.hd .hdi');
  if(hd)hd.appendChild(b);else{b.className='fx';document.body.appendChild(b)}
  function sync(){b.classList.toggle('on',fab.textContent.indexOf('حساب من')>-1)}
  sync();new MutationObserver(sync).observe(fab,{childList:true,characterData:true,subtree:true});
}
go();
})();
