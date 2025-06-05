import { db } from "./fbConfig.js";
import { getDoc, doc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
const btns = document.querySelectorAll(".btn");
const recipes_container = document.getElementById("recipes_container");
// 
async function items(endpoint = "all_recipes") {
  recipes_container.innerHTML = "";

  const api = await fetch(`https://vineeth38.github.io/Recipes_apis/${endpoint}.json`);
  const data = await api.json();

  data.forEach((recipe) => {
    const recipe_item = document.createElement("div");
    recipe_item.className = "recipe_item";
    recipe_item.innerHTML = `
            <img src=${recipe.image}>
            <div class="title_container">
            <p class="title">${recipe.name}</p>
            <p>${recipe.prep_time}-Easy Prep</p> </div>
            <div class="recipe_btns">
                <p class="favouriteBtn">Add To Favourite</p>
                <p class="view_recipe">View Recipe</p>
            </div>
        `;

    const view_recipe = recipe_item.querySelector(".view_recipe");
    view_recipe.addEventListener("click", () => {
      localStorage.setItem("SelectedRecipe", JSON.stringify(recipe));
      location.href = "recipe_details.html";
    });
    const favouriteBtn = recipe_item.querySelector(".favouriteBtn");
    favouriteBtn.addEventListener("click", async () => {
      try {
        const user_ref = doc(db, "Users", loginData.user);
        const user = await getDoc(user_ref);

        if (user.exists()) {
          const userData = user.data();
          const favs = userData.favourites || [];

          const isAlreadyFavourite = favs.some(fav => fav.name === recipe.name);

          if (isAlreadyFavourite) {
            alert("Recipe already added to favourites");
          } else {
            await updateDoc(user_ref, {
              favourites: arrayUnion(recipe)
            });
            alert("Recipe added to favourites");
          }
        }
      } catch (error) {
        alert("Login Before adding to favourites");
        console.error(error);
      }
    });
    recipes_container.appendChild(recipe_item);
  });
}
items()
document.querySelector('[data-value="all_recipes"]').classList.add("active");
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    items(btn.dataset.value)
  })
})

//Log Btn 


const logBtn = document.getElementById("logBtn");
const userElement = document.getElementById("user");

const loginData = JSON.parse(localStorage.getItem("loggedIn"));

function isUserLoggedIn() {
  return loginData && loginData.user && loginData.user.trim() !== "";
}

function displayUser() {
  if (isUserLoggedIn()) {
    // userElement.innerText = loginData.user;
    userElement.innerHTML=`
    <i class="fa-solid fa-user"></i>
    <span>${loginData.user}</span>`
  } else {
    if (userElement) userElement.remove();
  }
}

// Update login button text
function updateLoginButtonText() {
  logBtn.innerText = isUserLoggedIn() ? "Log Out" : "Log In";
}

// Handle login/logout button click
logBtn.addEventListener("click", () => {
  if (logBtn.innerText === "Log In") {
    location.href = "login.html";
  } else {
    const confirmed=confirm("Are sure you want to Log Out")
    if(confirmed){
    if (userElement) userElement.remove();
    localStorage.removeItem("loggedIn");
    logBtn.innerText = "Log In";
  }
  }
});
displayUser();
updateLoginButtonText();

//favourites 
const favouriteBtn = document.getElementById("favBtn");
favouriteBtn.addEventListener("click", () => {
  location.href = "favourites.html";
})


//search 
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", async ()=> {
  const input = searchInput.value.trim().toLowerCase();
  const searchContainer = document.getElementById("searchItems");
  const suggestionContainer = document.getElementById("searchContainer");

  searchContainer.innerHTML = "";

  if (input.length > 0) {
    try {
      const api = await fetch("https://vineeth38.github.io/Recipes_apis/all_recipes.json");
      const data = await api.json();

      const matches = data.filter(recipe =>
        recipe.name && recipe.name.toLowerCase().includes(input)
      );

      if (matches.length > 0) {
        matches.forEach((recipe) => {
          const suggestion = document.createElement("div");
          suggestion.className = "suggestion";
          suggestion.innerText = recipe.name;

          suggestion.addEventListener("click", () => {
            const allRecipeCards = document.querySelectorAll(".recipe_item");
            for (const card of allRecipeCards) {
              const title = card.querySelector(".title_container p");
              if (title && title.innerText.toLowerCase() === recipe.name.toLowerCase()) {
                card.scrollIntoView();
                break;
              }
            }
            searchInput.value = "";
            searchContainer.innerHTML = "";
            suggestionContainer.style.display = "none";
          });

          searchContainer.appendChild(suggestion);
        });
      } else {
        searchContainer.innerHTML = "<div class='suggestion'>No results found</div>";
      }

      // Show suggestion container if there are matches or "no results"
      suggestionContainer.style.display = "block";
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  } else {
    suggestionContainer.style.display = "none";
  }
});

