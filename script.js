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

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `

      <img
        class="cardImage"
        src="${suspect.image}"
      >

      <div class="content">

        <h3>${suspect.name}</h3>

        <div class="traits">
          ${traitsHTML}
        </div>

      </div>

    `;

    suspectCards.appendChild(card);

  });

}

renderSuspects();
