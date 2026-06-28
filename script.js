// ===============================
// LAXNARA WINI
// SCRIPT.JS
// ===============================

// Smooth appearance

window.addEventListener("load",()=>{

document.body.style.opacity="1";

});

// ----------------------------
// Reveal on Scroll
// ----------------------------

const revealElements=document.querySelectorAll(".card,.section-heading,.quote-box,.shop-card");

const revealObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

},{
threshold:.15
});

revealElements.forEach(el=>{

el.style.opacity="0";

el.style.transform="translateY(40px)";

el.style.transition="all .8s ease";

revealObserver.observe(el);

});

// ----------------------------
// Floating Card Effect
// ----------------------------

document.querySelectorAll(".card").forEach(card=>{

card.addEventListener("mousemove",e=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateY=((x/rect.width)-0.5)*10;

const rotateX=((y/rect.height)-0.5)*-10;

card.style.transform=
`perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-8px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0)";

});

});

// ----------------------------
// Cursor Sparkles
// ----------------------------

document.addEventListener("mousemove",e=>{

const sparkle=document.createElement("div");

sparkle.className="cursor-sparkle";

sparkle.style.left=e.pageX+"px";

sparkle.style.top=e.pageY+"px";

sparkle.innerHTML="✦";

document.body.appendChild(sparkle);

setTimeout(()=>{

sparkle.remove();

},800);

});

// ----------------------------
// Falling Petals
// ----------------------------

function createPetal(){

const petal=document.createElement("div");

petal.className="falling-petal";

petal.innerHTML="🌸";

petal.style.left=Math.random()*100+"vw";

petal.style.fontSize=(18+Math.random()*18)+"px";

petal.style.animationDuration=(8+Math.random()*8)+"s";

document.body.appendChild(petal);

setTimeout(()=>{

petal.remove();

},16000);

}

setInterval(createPetal,700);

// ----------------------------
// Butterfly
// ----------------------------

function butterfly(){

const fly=document.createElement("div");

fly.className="butterfly";

fly.innerHTML="🦋";

fly.style.top=(10+Math.random()*70)+"vh";

fly.style.left="-50px";

fly.style.fontSize=(20+Math.random()*10)+"px";

document.body.appendChild(fly);

let pos=-50;

const speed=1+Math.random()*2;

const interval=setInterval(()=>{

pos+=speed;

fly.style.left=pos+"px";

fly.style.top=

parseFloat(fly.style.top)+

Math.sin(pos/60)*0.6+"vh";

if(pos>window.innerWidth+100){

clearInterval(interval);

fly.remove();

}

},20);

}

setInterval(butterfly,8000);

// ----------------------------
// Hero Parallax
// ----------------------------

window.addEventListener("scroll",()=>{

const y=window.scrollY;

const hero=document.querySelector(".hero");

if(hero){

hero.style.transform=`translateY(${y*0.15}px)`;

}

});

// ----------------------------
// Smooth Button Hover Glow
// ----------------------------

document.querySelectorAll("a").forEach(link=>{

link.addEventListener("mouseenter",()=>{

link.style.transition=".35s";

});

});

// ----------------------------
// Console Message 😎
// ----------------------------

console.log("%cWelcome to LaxNara Wini 🌸","font-size:18px;color:#d87ea3;");
