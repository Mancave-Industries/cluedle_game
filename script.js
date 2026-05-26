const suspects = window.CLUEDLE_DATA.suspects;
const rooms = window.CLUEDLE_DATA.rooms;
const weapons = window.CLUEDLE_DATA.weapons;
const motives = window.CLUEDLE_DATA.motives;

const suspectMatrix = window.CLUEDLE_DATA.suspectTraitMatrix;
const roomMatrix = window.CLUEDLE_DATA.roomTraitMatrix;
const weaponMatrix = window.CLUEDLE_DATA.weaponTraitMatrix;
const motiveMatrix = window.CLUEDLE_DATA.motiveTraitMatrix;

const rankRules = window.CLUEDLE_DATA.rankRules;

const suspectCarousel = document.getElementById("suspectCarousel");
const roomCarousel = document.getElementById("roomCarousel");
const weaponCarousel = document.getElementById("weaponCarousel");
const motiveCarousel = document.getElementById("motiveCarousel");

const feedbackContent = document.getElementById("feedbackContent");

const submitTheoryBtn = document.getElementById("submitTheoryBtn");

const rankName = document.getElementById("rankName");
const detectionScore = document.getElementById("detectionScore");
const streakValue = document.getElementById("streakValue");
const promotionText = document.getElementById("promotionText");

let knownTraits = {
 suspect: [],
 room: [],
 weapon: [],
 motive: []
};

let selected = {
 suspect: 0,
 room: 0,
 weapon: 0,
 motive: 0
};

let solution = {
 suspect: suspects[Math.floor(Math.random() * suspects.length)],
 room: rooms[Math.floor(Math.random() * rooms.length)],
 weapon: weapons[Math.floor(Math.random() * weapons.length)],
 motive: motives[Math.floor(Math.random() * motives.length)]
};

let playerState = JSON.parse(
 localStorage.getItem("cluedlePlayer")
) || {
 rank: "trainee_detective",
 streak: 0,
 recentScores: []
};

renderPlayerState();

buildCarousel(
 suspects,
 suspectCarousel,
 "suspect"
);

buildCarousel(
 rooms,
 roomCarousel,
 "room"
);

buildCarousel(
 weapons,
 weaponCarousel,
 "weapon"
);

buildCarousel(
 motives,
 motiveCarousel,
 "motive"
);

submitTheoryBtn.addEventListener(
 "click",
 submitTheory
);

function buildCarousel(
 data,
 container,
 category
) {

 container.innerHTML = "";

 data.forEach((item, index) => {

   const card = document.createElement("div");

   card.className = "card";

   if (index === 0) {
     card.classList.add("active");
   }

   card.dataset.index = index;

   card.innerHTML = `
     <img
       class="card-image"
       src="${item.image}"
     />

     <div class="card-content">

       <div class="card-title">
         ${item.name}
       </div>

       <div class="traits">
         ${renderTraits(item, category)}
       </div>

     </div>
   `;

   container.appendChild(card);

 });

 const wrapper = container.parentElement;

 wrapper.addEventListener(
   "scroll",
   () => updateActiveCard(
     data,
     container,
     category
   )
 );

}

function renderTraits(item, category) {

 let traits = item.visibleTraits || item.traits || [];

 return traits.map(trait => {

   const glow =
     knownTraits[category].includes(trait)
     ? "known"
     : "";

   return `
     <div class="trait ${glow}">
       ${trait}
     </div>
   `;

 }).join("");

}

function updateActiveCard(
 data,
 container,
 category
) {

 const cards =
   [...container.querySelectorAll(".card")];

 let best = 0;
 let bestDistance = Infinity;

 cards.forEach((card, index) => {

   const rect = card.getBoundingClientRect();

   const center =
     rect.left + rect.width / 2;

   const distance =
     Math.abs(center - window.innerWidth / 2);

   if (distance < bestDistance) {
     bestDistance = distance;
     best = index;
   }

 });

 cards.forEach(card =>
   card.classList.remove("active")
 );

 cards[best].classList.add("active");

 selected[category] = best;

}

function submitTheory() {

 const suspect =
   suspects[selected.suspect];

 const room =
   rooms[selected.room];

 const weapon =
   weapons[selected.weapon];

 const motive =
   motives[selected.motive];

 feedbackContent.innerHTML = "";

 processCategory(
   "SUSPECT",
   suspect,
   solution.suspect,
   suspectMatrix,
   "CHARACTERISTIC",
   "suspect"
 );

 processCategory(
   "ROOM",
   room,
   solution.room,
   roomMatrix,
   "FEATURE",
   "room"
 );

 processCategory(
   "WEAPON",
   weapon,
   solution.weapon,
   weaponMatrix,
   "ATTRIBUTE",
   "weapon"
 );

 processCategory(
   "MOTIVE",
   motive,
   solution.motive,
   motiveMatrix,
   "MOTIVATION",
   "motive"
 );

}

function processCategory(
 title,
 guess,
 actual,
 matrix,
 label,
 category
) {

 const guessTraits =
   guess.visibleTraits || guess.traits;

 const actualTraits =
   actual.visibleTraits || actual.traits;

 const overlaps =
   guessTraits.filter(
     t => actualTraits.includes(t)
   );

 const block =
   document.createElement("div");

 block.className = "feedback-block";

 let result = "";

 if (guess.name === actual.name) {

   result = `
     <div class="feedback-result">
       CONFIRMED
     </div>
   `;

   setCardState(
     category,
     guess.name,
     "confirmed"
   );

 } else if (overlaps.length === 0) {

   result = `
     <div class="feedback-result">
       NO CORRELATION
     </div>
   `;

   setCardState(
     category,
     guess.name,
     "eliminated"
   );

 } else {

   const visible =
     getHighestValueTrait(
       overlaps,
       matrix
     );

   knownTraits[category].push(visible);

   refreshTraits();

   result = `
     <div class="feedback-result">
       PARTIAL MATCH
     </div>

     <div class="feedback-detail">
       DISCLOSED ${label}:
       <strong>${visible.toUpperCase()}</strong>
     </div>

     <div class="feedback-hidden">
       +${overlaps.length - 1}
       hidden correlations
     </div>
   `;

 }

 block.innerHTML = `
   <div class="feedback-category">
     ${title}
   </div>

   ${result}
 `;

 feedbackContent.appendChild(block);

}

function getHighestValueTrait(
 overlaps,
 matrix
) {

 let best = overlaps[0];
 let bestValue = 0;

 overlaps.forEach(trait => {

   const value =
     matrix[trait]?.value || 0;

   if (value > bestValue) {

     best = trait;
     bestValue = value;

   }

 });

 return best;

}

function setCardState(
 category,
 name,
 state
) {

 let carousel;

 if (category === "suspect") {
   carousel = suspectCarousel;
 }

 if (category === "room") {
   carousel = roomCarousel;
 }

 if (category === "weapon") {
   carousel = weaponCarousel;
 }

 if (category === "motive") {
   carousel = motiveCarousel;
 }

 const cards =
   [...carousel.querySelectorAll(".card")];

 cards.forEach(card => {

   const title =
     card.querySelector(".card-title")
     .textContent;

   if (title === name) {

     if (state === "confirmed") {
       card.classList.add("confirmed");
     }

     if (state === "eliminated") {
       card.classList.add("eliminated");
     }

   }

 });

}

function refreshTraits() {

 rebuildTraits(
   suspects,
   suspectCarousel,
   "suspect"
 );

 rebuildTraits(
   rooms,
   roomCarousel,
   "room"
 );

 rebuildTraits(
   weapons,
   weaponCarousel,
   "weapon"
 );

 rebuildTraits(
   motives,
   motiveCarousel,
   "motive"
 );

}

function rebuildTraits(
 data,
 container,
 category
) {

 const cards =
   [...container.querySelectorAll(".card")];

 cards.forEach((card, index) => {

   const traitsDiv =
     card.querySelector(".traits");

   traitsDiv.innerHTML =
     renderTraits(
       data[index],
       category
     );

 });

}

function renderPlayerState() {

 const currentRank =
   rankRules.ranks.find(
     r => r.id === playerState.rank
   );

 rankName.textContent =
   currentRank.name;

 streakValue.textContent =
   playerState.streak;

 const avg =
   calculateDetectionScore();

 detectionScore.textContent =
   avg;

 promotionText.textContent =
   buildPromotionText(avg);

}

function calculateDetectionScore() {

 if (
   playerState.recentScores.length === 0
 ) {
   return 0;
 }

 const total =
   playerState.recentScores.reduce(
     (a, b) => a + b,
     0
   );

 return Math.round(
   total /
   playerState.recentScores.length
 );

}

function buildPromotionText(avg) {

 if (avg >= 80) {
   return "Exceptional investigative form.";
 }

 if (avg >= 65) {
   return "Solve this case efficiently to strengthen promotion prospects.";
 }

 if (avg >= 50) {
   return "Performance under review. Improve case efficiency.";
 }

 return "Solve this case in fewer turns to improve your standing.";

}

