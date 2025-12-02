"strict";

// load navigation, cta and footer all pages
async function loadLayout() {
  const headerResponse = await fetch("../components/header.html");
  const headerData = await headerResponse.text();
  document.querySelector("header").innerHTML = headerData;

  const footerResponse = await fetch("../components/footer.html");
  const footerData = await footerResponse.text();
  document.querySelector("footer").innerHTML = footerData;

  const ctaResponse = await fetch("../components/cta.html");
  const ctaData = await ctaResponse.text();
  document.querySelector("#cta").innerHTML = ctaData;
}

document.addEventListener("DOMContentLoaded", loadLayout);

// load recipes to page
async function getData() {
  const response = await fetch("./js/data.json");
  if (!response.ok) {
    throw new Error("Couldn't fetch data.");
  }

  const data = await response.json();
  return data;
}

async function createRecipeCards() {
  const data = await getData();
  const recipes = data.map((recipe) => {
    return `
     <li class="flex flex-column">
            <img
              src="${recipe.image.large}"
              alt=""
              class="mb-400"
            />
            <h2 class="text-preset-5 mb-300">${recipe.title}</h2>
            <p class="mb-400">
              ${recipe.overview}
            </p>
            <div class="recipe__details | flex flex-wrap mb-400">
              <div class="flex">
                <img src="./assets/images/icon-servings.svg" alt="" />
                <p>Servings: <span>${recipe.servings}</span></p>
              </div>
              <div class="flex">
                <img src="./assets/images/icon-prep-time.svg" alt="" />
                <p>Prep: <span>10</span></p>
              </div>
              <div class="flex">
                <img src="./assets/images/icon-cook-time.svg" alt="" />
                <p>Cook: <span>0</span></p>
              </div>
            </div>
            <button class="btn-outline | btn--primary btn--pill">
              View recipe
            </button>
          </li>
    `;
  });
  document.querySelector(".recipes__list-container").innerHTML =
    recipes.join("");
}

createRecipeCards();
