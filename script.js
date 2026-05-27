const D = window.CLUEDLE_DATA || {};

const ASSETS = {
 overlays:{
   wrong:"assets/overlays/wrong.jpg",
   correct:"assets/overlays/correctframe.jpg",
   verified:"assets/overlays/verifystamp.jpg",
   suspect:"assets/overlays/suspect.jpg",
   room:"assets/overlays/room.jpg",
   weapon:"assets/overlays/weapon.jpg",
   motive:"assets/overlays/motive.jpg"
 },

 help:[
   "assets/ui/howtoplay.jpg",
   "assets/ui/swipe.jpg",
   "assets/ui/deduce.jpg"
 ]
};

const categories = [
 "suspect",
 "room",
 "weapon",
 "motive"
];

let cases = [];

let game = {
 case:null,
 solution:{},
 victim:null,

 pools:{},

 index:{
   suspect:0,
   room:0,
   weapon:0,
   motive:0
 },

 turns:6,

 eliminated:{
   suspect:[],
   room:[],
   weapon:[],
   motive:[]
 },

 confirmed:{
   suspect:false,
   room:false,
   weapon:false,
   motive:false
 },

 disclosed:{
   suspect:[],
   room:[],
   weapon:[],
   motive:[]
 },

 help:0
};

const $ = id => document.getElementById(id);

const show = id => {
 document
   .querySelectorAll(".screen")
   .forEach(s => s.classList.remove("active"));

 $(id).classList.add("active");
};

function seedToday(){
 return Number(
   new Date()
     .toISOString()
     .slice(0,10)
     .replaceAll("-","")
 );
}

function rand(seed){
 const x = Math.sin(seed) * 10000;
 return x - Math.floor(x);
}

function pick(arr,seed){
 return arr[Math.floor(rand(seed) * arr.length)];
}

function shuffle(arr,seed){
 return [...arr].sort(
   (a,b)=>
     rand(seed + a.name.length)
     -
     rand(seed + b.name.length)
 );
}

function byName(arr,name){
 return arr.find(
   x => x.name.toLowerCase() === String(name).toLowerCase()
 );
}

function imgPath(item){
 return item.image;
}

async function init(){

 cases = await fetch("data/cases.json")
   .then(r => r.json());

 buildDailyCase();

 bind();
}

function buildDailyCase(){

 const seed = seedToday();

 const entry = pick(cases, seed);

 const chosen =
   rand(seed + 2) > .5
     ? entry.case1
     : entry.case2;

 const victimName = chosen.victim;

 const killerName =
   victimName === entry.rowCharacter
     ? entry.columnCharacter
     : entry.rowCharacter;

 game.case = chosen;

 game.victim =
   byName(D.suspects, victimName);

 game.solution.suspect =
   byName(D.suspects, killerName);

 game.solution.motive =
   byName(
     D.motives,
     chosen.motive.toUpperCase()
   )
   ||
   D.motives.find(
     m =>
       m.name.toLowerCase()
       ===
       chosen.motive.toLowerCase()
   );

 game.solution.room =
   pick(D.rooms, seed + 4);

 game.solution.weapon =
   pick(D.weapons, seed + 5);

 game.pools.suspect =
   makePool(
     D.suspects,
     game.solution.suspect,
     8,
     seed + 10,
     game.victim?.name
   );

 game.pools.room =
   makePool(
     D.rooms,
     game.solution.room,
     8,
     seed + 11
   );

 game.pools.weapon =
   makePool(
     D.weapons,
     game.solution.weapon,
     8,
     seed + 12
   );

 game.pools.motive =
   makePool(
     D.motives,
     game.solution.motive,
     8,
     seed + 13
   );

 $("caseNumber").textContent =
   `CASE MCI-${String(seed).slice(2)}`;

 $("gameCaseNumber").textContent =
   `MCI-${String(seed).slice(2)}`;

 $("caseTurns").textContent =
   `${game.turns} turns authorised`;

 $("victimPortrait").src =
   imgPath(game.victim);

 $("victimName").textContent =
   game.victim.name;

 $("caseTitle").textContent =
   chosen.title;

 $("caseStory").textContent =
   extractStory(chosen);
}

function makePool(
 all,
 answer,
 size,
 seed,
 excludeName = null
){

 const pool = [answer];

 shuffle(all,seed).forEach(x=>{

   if(
     pool.length < size
     &&
     x.name !== answer.name
     &&
     x.name !== excludeName
   ){
     pool.push(x);
   }

 });

 return shuffle(pool, seed + 99);
}

function extractStory(c){

 const storyLine =
   c.characteristics.find(
     x => x.startsWith("Story:")
   );

 return storyLine
   ? storyLine.replace("Story: ","")
   : c.characteristics.join(" ");
}

function bind(){

 $("openCaseBtn").onclick =
   ()=> show("caseScreen");

 $("beginBtn").onclick = ()=>{

   renderGame();

   show("gameScreen");
 };

 $("submitBtn").onclick =
   submitTheory;

 $("continueBtn").onclick = ()=>{

   renderGame();

   show("gameScreen");
 };

 $("howBtn").onclick = ()=>{

   game.help = 0;

   $("helpImage").src =
     ASSETS.help[0];

   show("howScreen");
 };

 $("prevHelp").onclick = ()=>{

   game.help =
     (game.help + 2) % 3;

   $("helpImage").src =
     ASSETS.help[game.help];
 };

 $("nextHelp").onclick = ()=>{

   game.help =
     (game.help + 1) % 3;

   $("helpImage").src =
     ASSETS.help[game.help];
 };

 $("closeHelp").onclick =
   ()=> show("caseScreen");
}

function current(cat){

 return game.pools[cat][game.index[cat]];
}

function renderGame(){

 $("turnsLeft").textContent =
   game.turns;

 $("gameBoard").innerHTML =
   categories.map(cat =>
     renderCategory(cat)
   ).join("");

 updateTheory();

 document
   .querySelectorAll(".carousel")
   .forEach(el=>{

     let startX = 0;

     el.addEventListener(
       "touchstart",
       e=>{
         startX =
           e.touches[0].clientX;
       },
       {passive:true}
     );

     el.addEventListener(
       "touchend",
       e=>{

         const dx =
           e.changedTouches[0].clientX
           -
           startX;

         if(Math.abs(dx) > 35){

           move(
             el.dataset.cat,
             dx < 0 ? 1 : -1
           );
         }
       },
       {passive:true}
     );

   });
}

function renderCategory(cat){

 const list = game.pools[cat];

 const header =
   ASSETS.overlays[cat];

 const cards =
   [-1,0,1].map(offset=>{

     const idx =
       (
         game.index[cat]
         +
         offset
         +
         list.length
       ) % list.length;

     const item = list[idx];

     const active =
       offset === 0;

     const eliminated =
       game.eliminated[cat]
         .includes(item.name);

     const correct =
       game.confirmed[cat]
       &&
       item.name
       ===
       game.solution[cat].name;

     const clue =
       (
         item.visibleTraits
         ||
         item.traits
         ||
         []
       ).some(
         t =>
           game.disclosed[cat]
             .includes(t)
       );

     return `
       <div class="
         card
         ${active ? "active":"side"}
         ${eliminated ? "eliminated":""}
         ${correct ? "correct":""}
         ${clue ? "clue":""}
       ">

         <img class="base" src="${imgPath(item)}">

         <img
           class="state wrong"
           src="${ASSETS.overlays.wrong}"


         <img
           class="state correctframe"
           src="${ASSETS.overlays.correct}"


         <img
           class="state verified"
           src="${ASSETS.overlays.verified}"


         <div class="cardName">
           ${item.name}
         </div>

       </div>
     `;
   }).join("");

 return `
   <section class="categoryBlock">

     <div
       class="categoryHeader"
       style="
         background-image:url('${header}')
       "
</div>

     <div
       class="carousel"
       data-cat="${cat}"

       ${cards}
     </div>

     <div class="disclosed">

       ${
         game.disclosed[cat].length
         ?
         "DISCLOSED: "
         +
         game.disclosed[cat].join(", ")
         :
         ""
       }

     </div>

   </section>
 `;
}

function move(cat,dir){

 const len =
   game.pools[cat].length;

 game.index[cat] =
   (
     game.index[cat]
     +
     dir
     +
     len
   ) % len;

 renderGame();
}

function updateTheory(){

 $("theorySummary").innerHTML = `
   <b>YOUR SUSPICION</b><br>

   Suspect:
   ${current("suspect").name}
   ·

   Weapon:
   ${current("weapon").name}
   ·

   Room:
   ${current("room").name}
   ·

   Motive:
   ${current("motive").name}
 `;
}

function traits(item){

 return [

   ...(item.visibleTraits || []),

   ...(item.hiddenTraits || []),

   ...(item.traits || [])

 ];
}

function submitTheory(){

 show("loadingScreen");

 setTimeout(
   ()=> analyseTheory(),
   800
 );
}

function analyseTheory(){

 const results = {};

 categories.forEach(cat=>{

   const guess =
     current(cat);

   const actual =
     game.solution[cat];

   const correct =
     guess.name === actual.name;

   const overlaps =
     traits(guess).filter(
       t =>
         traits(actual).includes(t)
     );

   results[cat] = {
     correct,
     overlaps
   };

   if(correct){

     game.confirmed[cat] = true;

   } else {

     if(
       !game.eliminated[cat]
         .includes(guess.name)
     ){
       game.eliminated[cat]
         .push(guess.name);
     }

     const undisclosed =
       overlaps.find(
         t =>
           !game.disclosed[cat]
             .includes(t)
       );

     if(undisclosed){

       game.disclosed[cat]
         .push(undisclosed);
     }
   }

 });

 if(
   categories.every(
     cat => results[cat].correct
   )
 ){
   return closeCase(true);
 }

 game.turns--;

 if(game.turns <= 0){
   return closeCase(false);
 }

 renderReport(results);
}

function labelFor(cat){

 return {

   suspect:"CHARACTERISTIC",

   room:"FEATURE",

   weapon:"ATTRIBUTE",

   motive:"MOTIVATION"

 }[cat];
}

function renderReport(results){

 $("suspicionReport").innerHTML = `
   Suspect:
   <b>${current("suspect").name}</b><br>

   Weapon:
   <b>${current("weapon").name}</b><br>

   Room:
   <b>${current("room").name}</b><br>

   Motive:
   <b>${current("motive").name}</b>
 `;

 $("feedbackReport").innerHTML =
   categories.map(cat=>{

     const r = results[cat];

     const latest =
       game.disclosed[cat]
         .slice(-1)[0]
       ||
       "none";

     const hidden =
       Math.max(
         0,
         r.overlaps.length
         -
         (
           latest === "none"
           ? 0
           : 1
         )
       );

     return `
       <div class="
         feedbackRow
         ${r.correct ? "good":"bad"}
       ">

         <b>${cat.toUpperCase()}</b><br>

         RESULT:
         ${
           r.correct
           ?
           "CONFIRMED"
           :
           "NOT CONFIRMED"
         }
         <br>

         DISCLOSED
         ${labelFor(cat)}:
         ${
           r.correct
           ?
           "confirmed directly"
           :
           latest
         }
         <br>

         HIDDEN CORRELATIONS:
         ${
           r.correct
           ?
           "complete match"
           :
           hidden
         }

       </div>
     `;

   }).join("");

 show("reportScreen");
}

function closeCase(success){

 $("closedTitle").textContent =
   success
     ? "CASE CLOSED"
     : "CASE FAILED";

 $("finalKiller").src =
   imgPath(game.solution.suspect);

 $("finalVictim").src =
   imgPath(game.victim);

 $("finalWeapon").src =
   imgPath(game.solution.weapon);

 $("finalRoom").src =
   imgPath(game.solution.room);

 $("finalMotive").textContent =
   `MOTIVE: ${game.solution.motive.name}`;

 $("finalStory").textContent = `
   ${game.solution.suspect.name}
   murdered
   ${game.victim.name}.

   ${extractStory(game.case)}

   The weapon was
   ${game.solution.weapon.name}.

   The scene was
   ${game.solution.room.name}.
 `;

 show("closedScreen");
}

init();
