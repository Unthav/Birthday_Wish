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


// 🎵 MUSIC: put your song next to index.html and name it music.mp3.
// If music.mp3 is missing, a soft music-box "Happy Birthday" plays instead.
var musicBtn = document.getElementById("music");
var song = new Audio("music.mp3");
song.loop = true; song.volume = 0.6;
var usingSynth = false, muted = false, actx = null, synthTimer = null;

var TUNE = [[392,.75],[392,.25],[440,1],[392,1],[523,1],[494,2],
            [392,.75],[392,.25],[440,1],[392,1],[587,1],[523,2],
            [392,.75],[392,.25],[784,1],[659,1],[523,1],[494,1],[440,2],
            [698,.75],[698,.25],[659,1],[523,1],[587,1],[523,2]];
function playTune(){
  if(!actx || muted) return;
  var t = actx.currentTime + 0.1, beat = 0.6;
  TUNE.forEach(function(n){
    var o = actx.createOscillator(), g = actx.createGain();
    o.type = "triangle"; o.frequency.value = n[0];
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.25, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + n[1]*beat*1.6);
    o.connect(g); g.connect(actx.destination);
    o.start(t); o.stop(t + n[1]*beat*1.6 + 0.05);
    t += n[1]*beat;
  });
  synthTimer = setTimeout(playTune, (t - actx.currentTime + 1.2) * 1000);
}
function startSynth(){
  usingSynth = true;
  try{
    actx = new (window.AudioContext || window.webkitAudioContext)();
    playTune();
  }catch(e){}
}
function startMusic(){
  musicBtn.hidden = false;
  var p = song.play();
  if(p && p.catch) p.catch(startSynth);
  song.addEventListener("error", function(){ if(!usingSynth) startSynth(); });
}
musicBtn.addEventListener("click", function(){
  muted = !muted;
  musicBtn.textContent = muted ? "🔇" : "🔊";
  if(usingSynth){
    if(muted){ clearTimeout(synthTimer); }
    else { playTune(); }
  } else {
    if(muted) song.pause(); else song.play();
  }
});

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
  startMusic();
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
