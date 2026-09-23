// ✏️ EDIT THESE
var HER_NAME = "Muno💖";
var MESSAGE = [
  "Happy Birthday, <b>" + HER_NAME + "</b>! 🎂",
  "Thank you for every laugh, every hug and every ordinary day that you make feel special.",
  "I hope this year gives you everything you deserve, and I get to be right beside you for all of it.",
  "I love you more than I know how to say."
];
var FINAL = "You are my favourite person. Always. 💖";

var params = new URLSearchParams(location.search);
if (params.get("name")) { HER_NAME = params.get("name"); MESSAGE[0] = "Happy Birthday, <b>" + HER_NAME.replace(/</g,"&lt;") + "</b>! 🎂"; }
document.getElementById("title").textContent = "For " + HER_NAME;

var env = document.getElementById("env"), letter = document.getElementById("letter"), more = document.getElementById("more");
var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function hearts(n){
  if(reduce) return;
  for(var i=0;i<n;i++){
    var h=document.createElement("span");
    h.className="heart";
    h.textContent=["❤️","💖","💕","✨"][Math.floor(Math.random()*4)];
    h.style.left=Math.random()*100+"vw";
    h.style.fontSize=(16+Math.random()*22)+"px";
    h.style.animationDuration=(4+Math.random()*4)+"s";
    h.style.animationDelay=(Math.random()*1.5)+"s";
    document.body.appendChild(h);
    setTimeout(function(el){el.remove()},10000,h);
  }
}

function addLine(html, done){
  var p=document.createElement("p");
  p.style.margin="0 0 12px";
  letter.appendChild(p);
  if(reduce){p.innerHTML=html;done();return;}
  var i=0, tmp=document.createElement("div");
  tmp.innerHTML=html;
  var text=tmp.textContent;
  // type plain text, then swap in the formatted version at the end
  var t=setInterval(function(){
    i++; p.textContent=text.slice(0,i);
    if(i>=text.length){clearInterval(t);p.innerHTML=html;setTimeout(done,350);}
  },28);
}

env.addEventListener("click",function(){
  env.classList.add("open");
  hearts(20);
  setTimeout(function(){
    letter.classList.add("show");
    var k=0;
    (function next(){
      if(k<MESSAGE.length){addLine(MESSAGE[k++],next);}
      else{more.classList.add("show");}
    })();
  },600);
});

more.addEventListener("click",function(){
  more.classList.remove("show");
  hearts(50);
  var g=document.getElementById("gallery");
  g.classList.add("show");
  var figs=g.querySelectorAll("figure");
  figs.forEach(function(f,i){setTimeout(function(){f.classList.add("in")},reduce?0:300+i*700)});
  setTimeout(function(){
    var fin=document.getElementById("fin");
    fin.style.cssText="background:var(--paper);color:var(--ink);border-radius:6px;padding:20px 24px;text-align:left;line-height:1.7;font-size:1.1rem";
    var p=document.createElement("p");p.style.margin="0";p.textContent=FINAL;fin.appendChild(p);
    hearts(30);
  },reduce?0:300+figs.length*700+400);
});
