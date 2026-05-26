const MAX_TURNS = 5;
const DAILY_SUSPECTS = 8;
const DAILY_ROOMS = 10;
const DAILY_WEAPONS = 6;

const suspects = [
  { name: "Bianca Frost", image: "assets/suspects/bianca_frost.JPG", traits: ["Black woman", "Wavy hair", "Wealthy", "Athletic", "Influencer", "No glasses", "Fashionable", "Extrovert"] },
  { name: "Cleo Saint", image: "assets/suspects/cleo_saint.JPG", traits: ["Glasses", "Dark hair", "Wavy hair", "Earrings", "Wealthy", "Fashionable", "Medium skin", "Controlled"] },
  { name: "Dorian Luxe", image: "assets/suspects/dorian_luxe.JPG", traits: ["Black man", "Glasses", "Dark hair", "Short beard", "Scarf", "Fashionable", "Wealthy", "Arrogant"] },
  { name: "Gideon Pryce", image: "assets/suspects/gideon_pryce.JPG", traits: ["Male", "No glasses", "Dark hair", "Sharp suit", "Cold", "Finance", "Wealthy", "Aggressive"] },
  { name: "Harvey Slate", image: "assets/suspects/harvey_slate.JPG", traits: ["Older", "Silver hair", "Silver beard", "No glasses", "Suit", "Wealthy", "Aggressive", "Property mogul"] },
  { name: "India Gold", image: "assets/suspects/India_gold.JPG", traits: ["Wavy hair", "Dark hair", "Earrings", "Travel", "Influencer", "Wealthy", "Fashionable", "Extrovert"] },
  { name: "Jaxon Vale", image: "assets/suspects/jaxon_vale.JPG", traits: ["Male", "Beard", "Dark hair", "No glasses", "Athletic", "Tech", "Wealthy", "Confident"] },
  { name: "Milo Vex", image: "assets/suspects/milo-vale.JPG", traits: ["East Asian", "Glasses", "Messy hair", "Hoodie", "Tech", "Introvert", "Tired", "Intelligent"] },
  { name: "Nova Wilde", image: "assets/suspects/nova_wilde.JPG", traits: ["Wavy hair", "Glasses", "Earrings", "Camera strap", "Creative", "Introvert", "Calm", "Artistic"] },
  { name: "Otis Blank", image: "assets/suspects/otis_blank.JPG", traits: ["Bald", "Glasses", "Black clothing", "Minimalist", "Tech", "Cold", "Quiet", "Wealthy"] },
  { name: "Piper Bloom", image: "assets/suspects/piper_bloom.JPG", traits: ["Blonde", "Wavy hair", "Hat", "Earrings", "Lifestyle", "Wellness", "Calm", "Approachable"] },
  { name: "Rex Branson", image: "assets/suspects/rex_branson.JPG", traits: ["Male", "Beard", "Dark hair", "No glasses", "Muscular", "Athletic", "Aggressive", "Alpha"] },
  { name: "Saffron Skye", image: "assets/suspects/saffron_skye.JPG", traits: ["Blonde", "Wavy hair", "Glasses", "Spiritual", "Calm", "Wellness", "Wealthy", "Fashionable"] },
  { name: "Sebastian Drift", image: "assets/suspects/sebastian_drift.JPG", traits: ["Medium skin", "Dark hair", "Glasses", "Techwear", "Athletic", "Biohacker", "Intense", "Tech"] },
  { name: "Tilly Chrome", image: "assets/suspects/tilly_chrome.JPG", traits: ["Short hair", "Blonde tips", "Spiky hair", "Tattoos", "Chef", "Creative", "Extrovert", "Fashionable"] },
  { name: "Velvet Kane", image: "assets/suspects/velvet_kane.JPG", traits: ["Curly hair", "Dark hair", "Glasses", "Jewellery", "Lawyer", "Wealthy", "Intimidating", "Intelligent"] }
];

const rooms = [
  { name: "Art Vault", image: "assets/rooms/art_vault.jpg", traits: ["Medium room", "Vault door", "Artwork", "Single bench", "No windows", "Stone walls", "Cold lighting", "Minimal"] },
  { name: "Billiard Room", image: "assets/rooms/billiard_room.jpg", traits: ["Large room", "Billiard table", "Carpet", "Artwork", "Soft furnishings", "No windows", "Classic style", "Mood lighting"] },
  { name: "Chef’s Table", image: "assets/rooms/chefs_table.jpg", traits: ["Medium room", "Dining table", "Rug", "No windows", "Soft lighting", "Modern", "Sleek", "Curated"] },
  { name: "Cinema Room", image: "assets/rooms/cinema.jpg", traits: ["Large screen", "Soft seating", "Rugs", "No windows", "Low lighting", "Strip lighting", "Modern", "No artwork"] },
  { name: "Dressing Room", image: "assets/rooms/dressing.jpg", traits: ["Medium room", "Mirrors", "Dressing tables", "Pouf seating", "Rug", "No windows", "Strip lighting", "Soft lighting"] },
  { name: "Glass Lift", image: "assets/rooms/lift.jpg", traits: ["Tiny space", "Glass walls", "Metalwork", "Strip lighting", "No rug", "All floors", "Transparent", "Modern"] },
  { name: "Home Gym", image: "assets/rooms/gym.jpg", traits: ["Medium room", "Mirrors", "Large screen", "Gym equipment", "No carpet", "No windows", "Strip lighting", "Modern"] },
  { name: "Indoor Pool", image: "assets/rooms/pool.jpg", traits: ["Very large", "Swimming pool", "Mirrors", "Plants", "External window", "No rug", "Strip lighting", "Modern"] },
  { name: "Library", image: "assets/rooms/library.jpg", traits: ["Very large", "Old-fashioned", "Soft furnishings", "Rug", "Windows", "Chandelier", "Bookcase lighting", "Two-storey"] },
  { name: "Meditation Suite", image: "assets/rooms/med-suite.jpg", traits: ["Medium room", "Pine floor", "Plants", "Semi-outdoor", "Open wall", "Yoga studio", "Calm", "Natural"] },
  { name: "Observatory", image: "assets/rooms/observ.jpg", traits: ["Round room", "All windows", "Carpet", "Soft furnishings", "Coffee table", "Viewing room", "Modern", "Unique shape"] },
  { name: "Panic Room", image: "assets/rooms/panic.jpg", traits: ["Small room", "Vault door", "Concrete", "Large screen", "Desk", "No windows", "Soundproofed", "Strip lighting"] },
  { name: "Podcast Studio", image: "assets/rooms/podstudio.jpg", traits: ["Small room", "Round table", "Chairs", "Carpet", "Screen", "Soundproofed", "Low lighting", "Strip lighting"] },
  { name: "Rooftop Terrace", image: "assets/rooms/fooftop.jpg", traits: ["Outdoor", "Glass balustrade", "Plants", "Soft furnishings", "Decking", "Fire pit", "City views", "Strip lighting"] },
  { name: "Smart Kitchen", image: "assets/rooms/kitchen.jpg", traits: ["Large room", "Open plan", "Screens", "Sink", "Island", "Stools", "Window", "Strip lighting"] },
  { name: "Wine Cellar", image: "assets/rooms/wine_cellar.jpg", traits: ["Stone floor", "Brick cellar", "Vault door", "Wine shelves", "No seating", "No windows", "Secure", "Cold"] }
];

const weapons = [
  { name: "Champagne Saber", image: "assets/weapons/champagne_sabre.png", traits: ["Sharp", "Silver blade", "Black handle", "Brass fitting", "Handle", "Medium size", "Luxury", "Metal"] },
  { name: "Charging Cable", image: "assets/weapons/chargeing_cable.png", traits: ["Black", "Silver tips", "Flexible", "Rope texture", "One metre", "Electrical", "Tech", "Lightweight"] },
  { name: "Chef’s Knife", image: "assets/weapons/chefs_knife.png", traits: ["Sharp", "Silver blade", "Black handle", "26cm", "Kitchen", "Metal", "Handle", "Practical"] },
  { name: "Crystal Award", image: "assets/weapons/crystal_award.png", traits: ["Crystal", "Transparent", "Angular edges", "Medium size", "Blunt", "Reflective", "Corporate", "Luxury"] },
  { name: "Drone", image: "assets/weapons/drone.png", traits: ["Black", "Silver details", "Blades", "Lights", "Electrical", "Battery powered", "Tech", "Small"] },
  { name: "Gold Dumbbell", image: "assets/weapons/gold_dumbell.png", traits: ["Gold", "Round", "Blunt", "Handle", "1kg", "Metal", "Gym", "Medium size"] },
  { name: "Key Card", image: "assets/weapons/keyvard.png", traits: ["Black", "Gold writing", "Very small", "Flat", "Sharp edge", "Plastic", "Security", "Lightweight"] },
  { name: "Luxury Pen", image: "assets/weapons/luxury_pen.png", traits: ["Black", "Gold", "Fountain pen", "Sharp nib", "Very small", "Luxury", "Executive", "Handle"] },
  { name: "ManGrenade Candle", image: "assets/weapons/mangreneade_candle.png", traits: ["Beer can", "Black", "Blunt", "Small", "Candle", "Handmade", "Masculine", "Wax"] },
  { name: "Marble Bust", image: "assets/weapons/marble_bust.png", traits: ["Large", "Very heavy", "Blunt", "Alabaster", "Marble", "Decorative", "Classical", "Stone"] },
  { name: "Ring Light Stand", image: "assets/weapons/ring_light_stand.png", traits: ["Tripod", "Light ring", "Electrical", "Blunt", "Medium size", "Influencer", "Metal", "Powered"] },
  { name: "Smart Speaker", image: "assets/weapons/smart_speaker.png", traits: ["Black", "Blue light", "Buttons", "Electrical", "Blunt", "Small", "Tech", "Powered"] },
  { name: "Smartwatch Cable", image: "assets/weapons/smart_watch_cable.png", traits: ["White", "Plastic", "Smooth cable", "One metre", "Electrical", "Flexible", "Lightweight", "Tech"] },
  { name: "Sous Vide Weight", image: "assets/weapons/sous_vide_weight.png", traits: ["Brushed steel", "Round", "Handle", "1kg", "Blunt", "Kitchen", "Metal", "Smaller than dumbbell"] },
  { name: "Stiletto Heel", image: "assets/weapons/stiletto.png", traits: ["Black", "Leather", "Sharp", "Medium size", "Fashion", "Pointed heel", "Elegant", "Lightweight"] },
  { name: "VR Headset", image: "assets/weapons/vr_headset.png", traits: ["Black", "Straps", "Electrical", "Blunt", "Medium size", "Tech", "Powered", "Wearable"] }
];

let dailySuspects = [];
let dailyRooms = [];
let dailyWeapons = [];

let solution = {};
let selected = { suspect: null, room: null, weapon: null };
let locked = { suspect: false, room: false, weapon: false };
let wrong = { suspect: new Set(), room: new Set(), weapon: new Set() };
let turnsLeft = MAX_TURNS;
let history = [];
let gameOver = false;

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function pick(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function sharedTraits(a, b) {
  return a.traits.filter(t => b.traits.includes(t));
}

function createCard(item, type) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.name = item.name;
  card.dataset.type = type;

  const traits = item.traits.map(trait => `
    <div class="trait" data-trait="${trait}">
      ${trait}
    </div>
  `).join("");

  card.innerHTML = `
    <img class="cardImage" src="${item.image}" alt="${item.name}">
    <div class="cardContent">
      <div class="cardTitle">${item.name}</div>
      <div class="traits">${traits}</div>
    </div>
  `;

  card.addEventListener("click", () => selectCard(item, type));

  return card;
}

function renderCards(containerId, items, type) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  items.forEach(item => container.appendChild(createCard(item, type)));
}

function renderAllCards() {
  renderCards("suspectCards", dailySuspects, "suspect");
  renderCards("roomCards", dailyRooms, "room");
  renderCards("weaponCards", dailyWeapons, "weapon");
  refreshVisuals();
}

function selectCard(item, type) {
  if (gameOver) return;
  if (locked[type]) return;
  if (wrong[type].has(item.name)) return;

  selected[type] = item;
  refreshVisuals();
  updateButton();
}

function refreshVisuals() {
  document.querySelectorAll(".card").forEach(card => {
    const type = card.dataset.type;
    const name = card.dataset.name;

    card.classList.toggle("selected", selected[type]?.name === name);
    card.classList.toggle("wrong", wrong[type].has(name));
    card.classList.toggle("correct", locked[type] && solution[type]?.name === name);
  });
}

function markSharedTraits(guess, answer, type) {
  const matches = sharedTraits(guess, answer);
  const visible = matches.slice(0, 2);

  document.querySelectorAll(`.card[data-type="${type}"][data-name="${guess.name}"] .trait`)
    .forEach(chip => {
      const trait = chip.dataset.trait;

      if (visible.includes(trait)) {
        chip.classList.add("match");
      } else if (matches.includes(trait)) {
        chip.classList.add("hiddenMatch");
      } else {
        chip.classList.add("ruledOut");
      }
    });

  return matches;
}

function updateButton() {
  const btn = document.getElementById("accuseBtn");
  const ready = selected.suspect && selected.room && selected.weapon;

  btn.disabled = !ready || gameOver;
  btn.textContent = ready ? "MAKE ACCUSATION" : "SELECT 3 CARDS";
}

function makeAccusation() {
  if (gameOver) return;
  if (!selected.suspect || !selected.room || !selected.weapon) return;

  turnsLeft--;

  const suspectCorrect = selected.suspect.name === solution.suspect.name;
  const roomCorrect = selected.room.name === solution.room.name;
  const weaponCorrect = selected.weapon.name === solution.weapon.name;

  const suspectMatches = markSharedTraits(selected.suspect, solution.suspect, "suspect");
  const roomMatches = markSharedTraits(selected.room, solution.room, "room");
  const weaponMatches = markSharedTraits(selected.weapon, solution.weapon, "weapon");

  if (suspectCorrect) locked.suspect = true;
  else wrong.suspect.add(selected.suspect.name);

  if (roomCorrect) locked.room = true;
  else wrong.room.add(selected.room.name);

  if (weaponCorrect) locked.weapon = true;
  else wrong.weapon.add(selected.weapon.name);

  history.push({
    suspect: suspectCorrect,
    room: roomCorrect,
    weapon: weaponCorrect
  });

  document.getElementById("notes").innerHTML = `
    <div class="noteBlock">
      <strong>Suspect:</strong> ${selected.suspect.name}<br>
      ${suspectCorrect ? `<span class="good">CONFIRMED</span>` : `${suspectMatches.length} shared characteristics`}
    </div>

    <div class="noteBlock">
      <strong>Room:</strong> ${selected.room.name}<br>
      ${roomCorrect ? `<span class="good">CONFIRMED</span>` : `${roomMatches.length} shared features`}
    </div>

    <div class="noteBlock">
      <strong>Weapon:</strong> ${selected.weapon.name}<br>
      ${weaponCorrect ? `<span class="good">CONFIRMED</span>` : `${weaponMatches.length} shared properties`}
    </div>
  `;

  if (!suspectCorrect && !locked.suspect) selected.suspect = null;
  if (!roomCorrect && !locked.room) selected.room = null;
  if (!weaponCorrect && !locked.weapon) selected.weapon = null;

  if (locked.suspect) selected.suspect = solution.suspect;
  if (locked.room) selected.room = solution.room;
  if (locked.weapon) selected.weapon = solution.weapon;

  document.getElementById("turnCounter").textContent = `${turnsLeft} TURNS LEFT`;

  refreshVisuals();
  updateButton();

  if (suspectCorrect && roomCorrect && weaponCorrect) {
    endGame(true);
    return;
  }

  if (turnsLeft <= 0) {
    endGame(false);
  }
}

function endGame(won) {
  gameOver = true;

  document.getElementById("accuseBtn").disabled = true;

  document.getElementById("notes").innerHTML += `
    <hr><br>
    <strong>${won ? "CASE SOLVED" : "CASE FAILED"}</strong><br><br>
    Suspect: ${solution.suspect.name}<br>
    Room: ${solution.room.name}<br>
    Weapon: ${solution.weapon.name}
  `;
}

function newGame() {
  dailySuspects = shuffle(suspects).slice(0, DAILY_SUSPECTS);
  dailyRooms = shuffle(rooms).slice(0, DAILY_ROOMS);
  dailyWeapons = shuffle(weapons).slice(0, DAILY_WEAPONS);

  solution = {
    suspect: pick(dailySuspects),
    room: pick(dailyRooms),
    weapon: pick(dailyWeapons)
  };

  selected = { suspect: null, room: null, weapon: null };
  locked = { suspect: false, room: false, weapon: false };
  wrong = { suspect: new Set(), room: new Set(), weapon: new Set() };
  turnsLeft = MAX_TURNS;
  history = [];
  gameOver = false;

  document.getElementById("turnCounter").textContent = `${turnsLeft} TURNS LEFT`;
  document.getElementById("notes").textContent = "Select one suspect, one room and one weapon.";

  renderAllCards();
  updateButton();

  console.log("Solution:", solution);
}

document.getElementById("accuseBtn").addEventListener("click", makeAccusation);
document.getElementById("newGameBtn").addEventListener("click", newGame);

newGame();
