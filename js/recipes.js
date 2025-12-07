"strict";

async function getData() {
  const response = await fetch("./js/data.json");

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  return response.json();
}

function recipeCardTemplate(recipe) {
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
              <div class="flex items-center">
                <img src="./assets/images/icon-servings.svg" alt="" />
                <p>Servings: <span>${recipe.servings}</span></p>
              </div>
              <div class="flex items-center">
                <img src="./assets/images/icon-prep-time.svg" alt="" />
                <p>Prep: <span>${recipe.prepMinutes} ${
    recipe.prepMinutes > 0 ? "mins" : "min"
  }</span></p>
              </div>
              <div class="flex items-center">
                <img src="./assets/images/icon-cook-time.svg" alt="" />
                <p>Cook: <span>${recipe.cookMinutes} ${
    recipe.cookMinutes > 0 ? "mins" : "min"
  }</span></p>
              </div>
            </div>
            <button class="btn-outline | btn--primary btn--pill">
              View recipe
            </button>
          </li>
    `;
}

let allRecipes = [];
async function loadRecipes() {
  const container = document.querySelector(".recipes__list-container");

  try {
    allRecipes = await getData();
    renderRecipes(allRecipes);
  } catch (error) {
    console.error(error);
    container.innerHTML = `<p>Could not load recipes.</p>`;
  }
}

function renderRecipes(recipes) {
  const container = document.querySelector(".recipes__list-container");

  container.innerHTML = recipes
    .map((recipe) => recipeCardTemplate(recipe))
    .join("");
}

function filterByPrepTime() {
  let filtered = [...allRecipes];
  const prepTime = document.getElementById("time").value;
  const filteredRecipes = filtered.filter(
    (recipe) => recipe.prepMinutes === Number(prepTime)
  );
  renderRecipes(filteredRecipes);
}

document.addEventListener("DOMContentLoaded", loadRecipes);
document.getElementById("time").addEventListener("change", filterByPrepTime);
