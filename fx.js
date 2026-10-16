(function(){
var s=document.createElement('style');
s.textContent=[
'#fx{position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden;contain:strict}',
'#fx i{position:absolute;border-radius:50%;will-change:transform;opacity:.5}',
'#fx .a{width:70vmax;height:70vmax;top:-30vmax;right:-20vmax;background:radial-gradient(circle,color-mix(in srgb,var(--ac) 45%,transparent),transparent 62%)}',
'#fx .b{width:60vmax;height:60vmax;bottom:-28vmax;left:-22vmax;background:radial-gradient(circle,rgba(59,130,246,.38),transparent 62%)}',
'#fx .c{width:46vmax;height:46vmax;top:35%;left:25%;background:radial-gradient(circle,rgba(168,85,247,.22),transparent 62%)}',
'#fx u{position:absolute;inset:0;background:radial-gradient(circle at 1px 1px,color-mix(in srgb,var(--ink) 16%,transparent) 1px,transparent 0) 0 0/26px 26px;-webkit-mask:radial-gradient(ellipse at 50% 20%,#000 5%,transparent 72%);mask:radial-gradient(ellipse at 50% 20%,#000 5%,transparent 72%);opacity:.55}',
':root:not([data-theme=dark]) #fx i{opacity:.28}',
'@keyframes fxd1{50%{transform:translate3d(-9vw,7vh,0) scale(1.12)}}',
'@keyframes fxd2{50%{transform:translate3d(10vw,-8vh,0) scale(1.1)}}',
'@keyframes fxd3{50%{transform:translate3d(-6vw,-9vh,0) scale(.9)}}',
'@keyframes fxup{from{opacity:0;transform:translateY(22px) scale(.97)}}',
'@keyframes fxsh{to{background-position:-200% 0}}',
'@media(prefers-reduced-motion:no-preference){',
'#fx .a{animation:fxd1 26s ease-in-out infinite}#fx .b{animation:fxd2 32s ease-in-out infinite}#fx .c{animation:fxd3 38s ease-in-out infinite}',
'.rv.in .card{animation:fxup .65s cubic-bezier(.2,.8,.2,1) both}',
'.rv.in .card:nth-child(2){animation-delay:.08s}.rv.in .card:nth-child(3){animation-delay:.16s}.rv.in .card:nth-child(4){animation-delay:.24s}.rv.in .card:nth-child(n+5){animation-delay:.32s}',
'.card,.hd,button,.nv a{transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s,border-color .25s,background-color .25s,color .25s}',
'button:active{transform:scale(.96)}',
'@media(hover:hover){.card:hover{transform:translateY(-4px);border-color:color-mix(in srgb,var(--ac) 50%,var(--ed));box-shadow:0 18px 44px color-mix(in srgb,var(--ac) 14%,transparent)}}',
'.lg b{background:linear-gradient(110deg,var(--ac) 30%,#7dffd0 50%,var(--ac) 70%) 0 0/200% 100%;animation:fxsh 4s linear infinite}',
'html.fxt *,html.fxt *::before,html.fxt *::after{transition:background-color .4s,color .4s,border-color .4s!important}',
'}'
].join('');
document.head.appendChild(s);
var d=document.createElement('div');d.id='fx';d.innerHTML='<i class="a"></i><i class="b"></i><i class="c"></i><u></u>';
document.body.insertBefore(d,document.body.firstChild);
var t=document.getElementById('theme');
if(t)t.addEventListener('click',function(){document.documentElement.classList.add('fxt');setTimeout(function(){document.documentElement.classList.remove('fxt')},500)});
var a=d.querySelector('.a'),b=d.querySelector('.b'),q=0;
if(!matchMedia('(prefers-reduced-motion:reduce)').matches)addEventListener('scroll',function(){if(q)return;q=requestAnimationFrame(function(){q=0;var y=Math.min(scrollY,2400);d.style.transform='translate3d(0,'+(-y*.04)+'px,0)'})},{passive:true});
})();
