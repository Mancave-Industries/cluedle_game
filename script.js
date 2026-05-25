const suspects = [

{
  name: "Bianca Frost",
  image: "assets/suspects/bianca_frost.JPG",
  traits: [
    "Black woman",
    "Wavy hair",
    "Wealthy",
    "Athletic",
    "Influencer",
    "No glasses",
    "Fashionable",
    "Extrovert"
  ]
},

{
  name: "Cleo Saint",
  image: "assets/suspects/cleo_saint.JPG",
  traits: [
    "Glasses",
    "Dark hair",
    "Fashionable",
    "Controlled",
    "Wealthy",
    "Medium skin",
    "Earrings",
    "Manipulative"
  ]
},

{
  name: "Dorian Luxe",
  image: "assets/suspects/dorian_luxe.JPG",
  traits: [
    "Black man",
    "Glasses",
    "Dark hair",
    "Short beard",
    "Fashionable",
    "Scarf",
    "Wealthy",
    "Arrogant"
  ]
},

{
  name: "Gideon Pryce",
  image: "assets/suspects/gideon_pryce.JPG",
  traits: [
    "Male",
    "No glasses",
    "Dark hair",
    "Cold",
    "Finance",
    "Sharp suit",
    "Wealthy",
    "Aggressive"
  ]
},

{
  name: "Harvey Slate",
  image: "assets/suspects/harvey_slate.JPG",
  traits: [
    "Older",
    "Silver hair",
    "Beard",
    "No glasses",
    "Aggressive",
    "Wealthy",
    "Suit",
    "Property mogul"
  ]
},

{
  name: "India Gold",
  image: "assets/suspects/India_gold.JPG",
  traits: [
    "Wavy hair",
    "Dark hair",
    "Influencer",
    "Travel",
    "Wealthy",
    "Earrings",
    "Extrovert",
    "Fashionable"
  ]
},

{
  name: "Jaxon Vale",
  image: "assets/suspects/jaxon_vale.JPG",
  traits: [
    "Beard",
    "Dark hair",
    "Tech",
    "Athletic",
    "Wealthy",
    "Fashionable",
    "No glasses",
    "Confident"
  ]
},

{
  name: "Milo Vex",
  image: "assets/suspects/milo-vale.JPG",
  traits: [
    "East Asian",
    "Glasses",
    "Messy hair",
    "Tech",
    "Introvert",
    "Hoodie",
    "Intelligent",
    "Tired"
  ]
},

{
  name: "Nova Wilde",
  image: "assets/suspects/nova_wilde.JPG",
  traits: [
    "Wavy hair",
    "Glasses",
    "Creative",
    "Camera strap",
    "Introvert",
    "Earrings",
    "Calm",
    "Artistic"
  ]
},

{
  name: "Otis Blank",
  image: "assets/suspects/otis_blank.JPG",
  traits: [
    "Bald",
    "Glasses",
    "Minimalist",
    "Tech",
    "Cold",
    "Quiet",
    "Wealthy",
    "Black clothing"
  ]
},

{
  name: "Piper Bloom",
  image: "assets/suspects/piper_bloom.JPG",
  traits: [
    "Blonde",
    "Wavy hair",
    "Lifestyle",
    "Calm",
    "Approachable",
    "Hat",
    "Earrings",
    "Wellness"
  ]
},

{
  name: "Rex Branson",
  image: "assets/suspects/rex_branson.JPG",
  traits: [
    "Beard",
    "Athletic",
    "Aggressive",
    "Dark hair",
    "Muscular",
    "Alpha",
    "No glasses",
    "Bomber jacket"
  ]
},

{
  name: "Saffron Skye",
  image: "assets/suspects/saffron_skye.JPG",
  traits: [
    "Blonde",
    "Wavy hair",
    "Glasses",
    "Calm",
    "Spiritual",
    "Wealthy",
    "Fashionable",
    "Wellness"
  ]
},

{
  name: "Sebastian Drift",
  image: "assets/suspects/sebastian_drift.JPG",
  traits: [
    "Techwear",
    "Athletic",
    "Glasses",
    "Dark hair",
    "Intense",
    "Biohacker",
    "Medium skin",
    "Tech"
  ]
},

{
  name: "Tilly Chrome",
  image: "assets/suspects/tilly_chrome.JPG",
  traits: [
    "Short hair",
    "Blonde tips",
    "Tattoos",
    "Chef",
    "Creative",
    "Extrovert",
    "Spiky hair",
    "Fashionable"
  ]
},

{
  name: "Velvet Kane",
  image: "assets/suspects/velvet_kane.JPG",
  traits: [
    "Curly hair",
    "Glasses",
    "Lawyer",
    "Intimidating",
    "Wealthy",
    "Jewellery",
    "Dark hair",
    "Intelligent"
  ]
}

];

const suspectCards =
document.getElementById("suspectCards");

function renderSuspects(){

  suspectCards.innerHTML = "";

  suspects.forEach((suspect) => {

    const traitsHTML =
    suspect.traits.map((trait) => {

      return `
        <div class="trait">
          ${trait}
        </div>
      `;

    }).join("");

    const card =
    document.createElement("div");

    card.className = "card";

    card.innerHTML = `

      <img
        class="cardImage"
        src="${suspect.image}"
      >

      <div class="cardContent">

        <div class="cardTitle">
          ${suspect.name}
        </div>

        <div class="traits">
          ${traitsHTML}
        </div>

      </div>

    `;

    suspectCards.appendChild(card);

  });

}

renderSuspects();
