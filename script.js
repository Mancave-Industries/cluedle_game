const suspects = [
  {
    name: "Bianca Frost",
    image: "assets/suspects/bianca_frost.JPG",
    traits: ["Black woman", "Wavy hair", "Wealthy", "Athletic", "Influencer", "No glasses", "Fashionable", "Extrovert"]
  },
  {
    name: "Cleo Saint",
    image: "assets/suspects/cleo_saint.JPG",
    traits: ["Glasses", "Dark hair", "Wavy hair", "Earrings", "Wealthy", "Fashionable", "Medium skin", "Controlled"]
  },
  {
    name: "Dorian Luxe",
    image: "assets/suspects/dorian_luxe.JPG",
    traits: ["Black man", "Glasses", "Dark hair", "Short beard", "Scarf", "Fashionable", "Wealthy", "Arrogant"]
  },
  {
    name: "Gideon Pryce",
    image: "assets/suspects/gideon_pryce.JPG",
    traits: ["Male", "No glasses", "Dark hair", "Sharp suit", "Cold", "Finance", "Wealthy", "Aggressive"]
  },
  {
    name: "Harvey Slate",
    image: "assets/suspects/harvey_slate.JPG",
    traits: ["Older", "Silver hair", "Silver beard", "No glasses", "Suit", "Wealthy", "Aggressive", "Property mogul"]
  },
  {
    name: "India Gold",
    image: "assets/suspects/India_gold.JPG",
    traits: ["Wavy hair", "Dark hair", "Earrings", "Travel", "Influencer", "Wealthy", "Fashionable", "Extrovert"]
  },
  {
    name: "Jaxon Vale",
    image: "assets/suspects/jaxon_vale.JPG",
    traits: ["Male", "Beard", "Dark hair", "No glasses", "Athletic", "Tech", "Wealthy", "Confident"]
  },
  {
    name: "Milo Vex",
    image: "assets/suspects/milo-vale.JPG",
    traits: ["East Asian", "Glasses", "Messy hair", "Hoodie", "Tech", "Introvert", "Tired", "Intelligent"]
  },
  {
    name: "Nova Wilde",
    image: "assets/suspects/nova_wilde.JPG",
    traits: ["Wavy hair", "Glasses", "Earrings", "Camera strap", "Creative", "Introvert", "Calm", "Artistic"]
  },
  {
    name: "Otis Blank",
    image: "assets/suspects/otis_blank.JPG",
    traits: ["Bald", "Glasses", "Black clothing", "Minimalist", "Tech", "Cold", "Quiet", "Wealthy"]
  },
  {
    name: "Piper Bloom",
    image: "assets/suspects/piper_bloom.JPG",
    traits: ["Blonde", "Wavy hair", "Hat", "Earrings", "Lifestyle", "Wellness", "Calm", "Approachable"]
  },
  {
    name: "Rex Branson",
    image: "assets/suspects/rex_branson.JPG",
    traits: ["Male", "Beard", "Dark hair", "No glasses", "Muscular", "Athletic", "Aggressive", "Alpha"]
  },
  {
    name: "Saffron Skye",
    image: "assets/suspects/saffron_skye.JPG",
    traits: ["Blonde", "Wavy hair", "Glasses", "Spiritual", "Calm", "Wellness", "Wealthy", "Fashionable"]
  },
  {
    name: "Sebastian Drift",
    image: "assets/suspects/sebastian_drift.JPG",
    traits: ["Medium skin", "Dark hair", "Glasses", "Techwear", "Athletic", "Biohacker", "Intense", "Tech"]
  },
  {
    name: "Tilly Chrome",
    image: "assets/suspects/tilly_chrome.JPG",
    traits: ["Short hair", "Blonde tips", "Spiky hair", "Tattoos", "Chef", "Creative", "Extrovert", "Fashionable"]
  },
  {
    name: "Velvet Kane",
    image: "assets/suspects/velvet_kane.JPG",
    traits: ["Curly hair", "Dark hair", "Glasses", "Jewellery", "Lawyer", "Wealthy", "Intimidating", "Intelligent"]
  }
];

function createCard(item) {
  const card = document.createElement("div");
  card.className = "card";

  const traits = item.traits
    .map(trait => `<div class="trait">${trait}</div>`)
    .join("");

  card.innerHTML = `
    <img class="cardImage" src="${item.image}" alt="${item.name}">
    <div class="cardContent">
      <div class="cardTitle">${item.name}</div>
      <div class="traits">${traits}</div>
    </div>
  `;

  return card;
}

function renderCards(containerId, items) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error("Missing container:", containerId);
    return;
  }

  container.innerHTML = "";

  items.forEach(item => {
    container.appendChild(createCard(item));
  });
}

renderCards("suspectCards", suspects);

console.log("CLUEDLE JS loaded");
