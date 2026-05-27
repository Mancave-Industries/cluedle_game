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
    {
      img:"assets/ui/howtoplay.jpg",
      title:"DAILY CASE",
      text:"Each day opens one MCI case file. Review the victim, then build a theory across suspect, weapon, room and motive. The opening file is deliberately vague. It should not reveal the killer."
    },
    {
      img:"assets/ui/swipe.jpg",
      title:"SWIPE AND SELECT",
      text:"Each category has a limited daily pool, not every asset in the game. Swipe or use the arrows to rotate the carousel. Tap any visible card to select it. Correct cards lock. Wrong cards are crossed out."
    },
    {
      img:"assets/ui/deduce.jpg",
      title:"ELIMINATE AND DEDUCE",
      text:"Submit a full accusation. The report shows exactly what you selected, then confirms, rejects or discloses useful traits. Fewer turns improves your detective standing."
    }
  ]
};
 
const categories = ["suspect","weapon","room","motive"];
const POOL_SIZE = 6;
 
let cases = [];
 
let game = {
  case:null,
  solution:{},
  victim:null,
  pools:{},
  index:{suspect:0,weapon:0,room:0,motive:0},
  turns:6,
  eliminated:{suspect:[],weapon:[],room:[],motive:[]},
  confirmed:{suspect:false,weapon:false,room:false,motive:false},
  disclosed:{suspect:[],weapon:[],room:[],motive:[]},
  lastResults:null,
  help:0
};
 
const $ = id => document.getElementById(id);
 
function show(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  $(id).classList.add("active");
}
 
function haptic(type="light"){
  if(!navigator.vibrate) return;
  const patterns = { light:12, move:8, wrong:[18,20,18], good:[25,30,25], success:[35,40,35,40,60] };
  navigator.vibrate(patterns[type] || 10);
}
 
function seedToday(){
  return Number(new Date().toISOString().slice(0,10).replaceAll("-",""));
}
 
function rand(seed){
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
 
function pick(arr,seed){
  return arr[Math.floor(rand(seed)*arr.length)];
}
 
function shuffle(arr,seed){
  return [...arr].sort((a,b)=>rand(seed + String(a.name).length) - rand(seed + String(b.name).length));
}
 
function byName(arr,name){
  return (arr || []).find(x => String(x.name).toLowerCase() === String(name).toLowerCase());
}
 
function itemImage(item){
  return item && item.image ? item.image : "";
}
 
function allTraits(item){
  return [...(item.visibleTraits||[]), ...(item.hiddenTraits||[]), ...(item.traits||[])].filter(Boolean);
}
 
function visibleTraits(item){
  return [...(item.visibleTraits||[]), ...(item.traits||[])].filter(Boolean).slice(0,5);
}
 
function traitIcon(trait){
  const t = String(trait).toLowerCase();
  if(t.includes("glass")) return "👓";
  if(t.includes("beard")) return "🧔";
  if(t.includes("bald") || t.includes("hair")) return "💇";
  if(t.includes("wealth") || t.includes("luxury") || t.includes("greed")) return "💎";
  if(t.includes("tech") || t.includes("surveillance")) return "⌁";
  if(t.includes("power") || t.includes("ambition")) return "★";
  if(t.includes("romance") || t.includes("jealousy")) return "♥";
  if(t.includes("fear") || t.includes("secrecy") || t.includes("cover")) return "◼";
  if(t.includes("aggression") || t.includes("revenge")) return "⚡";
  if(t.includes("motive")) return "?";
  return "•";
}
 
function displayName(cat){
  return cat === "suspect" ? "Suspect" : cat === "weapon" ? "Weapon" : cat === "room" ? "Room" : "Motive";
}
 
async function init(){
  cases = await fetch("data/cases.json").then(r=>r.json());
  buildDailyCase();
  bind();
}
 
function buildDailyCase(){
  const seed = seedToday();
  const entry = pick(cases,seed);
  const chosen = rand(seed+2) > .5 ? entry.case1 : entry.case2;
 
  const victimName = chosen.victim;
  const killerName = victimName === entry.rowCharacter ? entry.columnCharacter : entry.rowCharacter;
 
  game.case = chosen;
  game.victim = byName(D.suspects,victimName);
  game.solution.suspect = byName(D.suspects,killerName);
  game.solution.motive = byName(D.motives,String(chosen.motive).toUpperCase()) || byName(D.motives,chosen.motive);
  game.solution.weapon = pick(D.weapons,seed+5);
  game.solution.room = pick(D.rooms,seed+6);
 
  game.pools.suspect = makePool(D.suspects,game.solution.suspect,POOL_SIZE,seed+10,game.victim?.name);
  game.pools.weapon = makePool(D.weapons,game.solution.weapon,POOL_SIZE,seed+11);
  game.pools.room = makePool(D.rooms,game.solution.room,POOL_SIZE,seed+12);
  game.pools.motive = makePool(D.motives,game.solution.motive,POOL_SIZE,seed+13);
 
  categories.forEach(cat=>{
    game.index[cat] = game.pools[cat].findIndex(x=>x.name === game.solution[cat].name);
    if(game.index[cat] < 0) game.index[cat] = 0;
    game.index[cat] = Math.floor(rand(seed+40+cat.length)*game.pools[cat].length);
  });
 
  const caseNo = `MCI-${String(seed).slice(2)}`;
 
  $("caseLead").textContent = game.victim?.name || "VICTIM";
  $("victimPortrait").src = itemImage(game.victim);
  $("victimName").textContent = game.victim?.name || "Unknown Victim";
  $("caseTitle").textContent = chosen.title || "Case File Opened";
  $("caseSetup").textContent = openingSetup(entry,chosen);
  $("caseNumber").textContent = `CASE ${caseNo}`;
  $("gameCaseNumber").textContent = caseNo;
  $("caseTurns").textContent = `${game.turns} turns authorised`;
}
 
function openingSetup(entry,chosen){
  if(chosen.setup) return chosen.setup;
  if(chosen.opening) return chosen.opening;
 
  // Deliberately vague. Do not reveal killer, motive or exact solution here.
  return `${chosen.victim} has been found dead inside the Blackwood orbit. The Bureau has isolated a narrow circle of suspects, locations, methods and pressures. Early evidence points to secrecy, status and a relationship under strain, but the true chain of events remains classified.`;
}
 
function finalStoryText(c){
  const direct = c.story || c.denouement || c.finalStory;
  if(direct) return direct;
  const storyLine = (c.characteristics || []).find(x=>String(x).startsWith("Story:"));
  return storyLine ? storyLine.replace("Story: ","") : (c.characteristics || []).join(" ");
}
 
function makePool(all,answer,size,seed,excludeName=null){
  const pool = [answer];
  shuffle(all,seed).forEach(x=>{
    if(pool.length < size && x && x.name !== answer.name && x.name !== excludeName){
      pool.push(x);
    }
  });
  return shuffle(pool,seed+99);
}
 
function bind(){
  $("openCaseBtn").onclick = ()=>{ haptic(); show("caseScreen"); };
  $("beginBtn").onclick = ()=>{ haptic(); renderGame(); show("gameScreen"); };
  $("submitBtn").onclick = submitTheory;
  $("continueBtn").onclick = ()=>{ haptic(); renderGame(); show("gameScreen"); };
 
  $("howBtn").onclick = ()=>{ game.help=0; renderHelp(); haptic(); show("howScreen"); };
  $("prevHelp").onclick = ()=>{ game.help=(game.help+ASSETS.help.length-1)%ASSETS.help.length; renderHelp(); haptic("move"); };
  $("nextHelp").onclick = ()=>{ game.help=(game.help+1)%ASSETS.help.length; renderHelp(); haptic("move"); };
  $("closeHelp").onclick = ()=>{ haptic(); show("caseScreen"); };
}
 
function renderHelp(){
  const slide = ASSETS.help[game.help];
  $("helpImage").src = slide.img;
  $("helpTitle").textContent = slide.title;
  $("helpText").textContent = slide.text;
}
 
function current(cat){
  return game.pools[cat][game.index[cat]];
}
 
function renderGame(){
  $("turnsLeft").textContent = game.turns;
  $("gameBoard").innerHTML = categories.map(cat=>renderCategory(cat)).join("");
  updateConsole();
  attachSwipe();
}
 
function renderCategory(cat){
  const list = game.pools[cat];
  const header = ASSETS.overlays[cat];
  const locked = game.confirmed[cat];
  const activeItem = current(cat);
  const visible = [-2,-1,0,1,2].map(offset=>{
    const idx = (game.index[cat] + offset + list.length) % list.length;
    const item = list[idx];
    const active = offset === 0;
    const eliminated = game.eliminated[cat].includes(item.name);
    const correct = locked && item.name === game.solution[cat].name;
    const chosen = active ? "selected" : "";
 
    return `
      <button class="card ${active?"active":"side"} ${chosen} ${eliminated?"eliminated":""} ${correct?"correct":""}" onclick="selectCard('${cat}',${idx})">
        <img class="base" src="${itemImage(item)}" alt="${item.name}">
        <img class="state wrong" src="${ASSETS.overlays.wrong}" alt="">
        <img class="state correctframe" src="${ASSETS.overlays.correct}" alt="">
        <img class="state verified" src="${ASSETS.overlays.verified}" alt="">
        <div class="cardName">${item.name}</div>
      </button>`;
  }).join("");
 
  const chips = visibleTraits(activeItem).map(t=>`<span class="traitChip">${traitIcon(t)} ${t}</span>`).join("");
  const disclosed = game.disclosed[cat].length ? `DISCLOSED ${displayName(cat).toUpperCase()}: ${game.disclosed[cat].join(", ")}` : "";
 
  return `
    <section class="categoryBlock ${locked?"locked":""}">
      <div class="categoryHeader" style="background-image:url('${header}')"></div>
      <div class="carouselShell">
        <button class="navBtn" onclick="move('${cat}',-1)" ${locked?"disabled":""}>‹</button>
        <div class="carousel" data-cat="${cat}">${visible}</div>
        <button class="navBtn" onclick="move('${cat}',1)" ${locked?"disabled":""}>›</button>
      </div>
      <div class="traits">${chips}</div>
      <div class="disclosed">${locked ? "LOCKED: correct evidence confirmed" : disclosed}</div>
    </section>`;
}
 
function attachSwipe(){
  document.querySelectorAll(".carousel").forEach(el=>{
    let startX = 0;
    el.addEventListener("touchstart",e=>{ startX = e.touches[0].clientX; },{passive:true});
    el.addEventListener("touchend",e=>{
      const dx = e.changedTouches[0].clientX - startX;
      if(Math.abs(dx)>30) move(el.dataset.cat, dx<0 ? 1 : -1);
    },{passive:true});
  });
}
 
function move(cat,dir){
  if(game.confirmed[cat]) return haptic("good");
  const len = game.pools[cat].length;
  game.index[cat] = (game.index[cat] + dir + len) % len;
  haptic("move");
  renderGame();
}
 
function selectCard(cat,idx){
  if(game.confirmed[cat]) return haptic("good");
  game.index[cat] = idx;
  haptic("light");
  renderGame();
}
 
function updateConsole(){
  $("theorySummary").innerHTML = `
    <b>YOUR SUSPICION</b><br>
    Suspect: ${current("suspect").name}<br>
    Weapon: ${current("weapon").name}<br>
    Room: ${current("room").name}<br>
    Motive: ${current("motive").name}`;
 
  const confirmedCount = categories.filter(cat=>game.confirmed[cat]).length;
  const attemptsUsed = 6 - game.turns;
  const efficiency = attemptsUsed <= 1 ? "excellent" : attemptsUsed <= 3 ? "strong" : "under review";
  $("appraisalText").textContent = `DETECTIVE APPRAISAL: ${confirmedCount}/4 evidence categories locked. Case efficiency currently ${efficiency}.`;
}
 
function analyseSelections(){
  const results = {};
  categories.forEach(cat=>{
    const guess = current(cat);
    const actual = game.solution[cat];
    const correct = guess.name === actual.name;
    const overlaps = allTraits(guess).filter(t=>allTraits(actual).includes(t));
    results[cat] = { guess, actual, correct, overlaps };
  });
  return results;
}
 
function submitTheory(){
  const results = analyseSelections();
  const anyCorrect = categories.some(cat=>results[cat].correct);
 
  $("scanBar").classList.toggle("positive",anyCorrect);
  $("scanBar").querySelector("span").style.width = "0%";
  $("processingText").textContent = anyCorrect ? "Match detected. Verifying evidence..." : "No direct match. Searching correlations...";
 
  haptic(anyCorrect ? "good" : "wrong");
  show("loadingScreen");
 
  setTimeout(()=>{
    $("scanBar").querySelector("span").style.width = anyCorrect ? "100%" : "72%";
  },60);
 
  setTimeout(()=>applyResults(results),900);
}
 
function applyResults(results){
  categories.forEach(cat=>{
    const r = results[cat];
    if(r.correct){
      game.confirmed[cat] = true;
      game.index[cat] = game.pools[cat].findIndex(x=>x.name === r.actual.name);
    } else {
      if(!game.eliminated[cat].includes(r.guess.name)) game.eliminated[cat].push(r.guess.name);
      const hint = r.overlaps.find(t=>!game.disclosed[cat].includes(t));
      if(hint) game.disclosed[cat].push(hint);
    }
  });
 
  game.lastResults = results;
 
  if(categories.every(cat=>game.confirmed[cat])) return closeCase(true);
 
  game.turns--;
  if(game.turns <= 0) return closeCase(false);
 
  renderReport(results);
}
 
function labelFor(cat){
  return { suspect:"CHARACTERISTIC", weapon:"ATTRIBUTE", room:"FEATURE", motive:"MOTIVATION" }[cat];
}
 
function renderReport(results){
  $("suspicionReport").innerHTML = categories.map(cat=>{
    const r = results[cat];
    return `${displayName(cat)}: <b>${r.guess.name}</b>`;
  }).join("<br>");
 
  $("feedbackReport").innerHTML = categories.map(cat=>{
    const r = results[cat];
    const latest = game.disclosed[cat].slice(-1)[0] || "none";
    const hidden = Math.max(0, r.overlaps.length - (latest === "none" ? 0 : 1));
 
    return `
      <div class="feedbackRow ${r.correct?"good":"bad"}">
        <b>${displayName(cat).toUpperCase()}</b><br>
        Selected: ${r.guess.name}<br>
        Result: ${r.correct ? "CONFIRMED - evidence locked" : "NOT CONFIRMED - option eliminated"}<br>
        ${r.correct ? "Lock status: green verified" : `Disclosed ${labelFor(cat)}: ${latest}`}<br>
        Hidden correlations: ${r.correct ? "complete match" : hidden}
      </div>`;
  }).join("");
 
  show("reportScreen");
}
 
function closeCase(success){
  haptic(success ? "success" : "wrong");
  $("closedTitle").textContent = success ? "CASE CLOSED" : "CASE FAILED";
  $("finalKiller").src = itemImage(game.solution.suspect);
  $("finalVictim").src = itemImage(game.victim);
  $("finalWeapon").src = itemImage(game.solution.weapon);
  $("finalRoom").src = itemImage(game.solution.room);
  $("finalMotive").textContent = `MOTIVE: ${game.solution.motive.name}`;
  $("finalStory").textContent = `${game.solution.suspect.name} murdered ${game.victim.name}. ${finalStoryText(game.case)} The weapon was ${game.solution.weapon.name}. The scene was ${game.solution.room.name}.`;
  show("closedScreen");
}
 
init();
