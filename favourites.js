import { getDoc, doc ,updateDoc, arrayRemove } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
import { db } from "./fbConfig.js";

const loginData = JSON.parse(localStorage.getItem("loggedIn"));
const container = document.getElementById("recipes_container");

async function loadFavourites() {
  container.innerHTML = ""; 
  try {
    if (!loginData || !loginData.user) {
      throw new Error("Not logged in");
    }

    const user_ref = doc(db, "Users", loginData.user);
    const user = await getDoc(user_ref);

    if (user.exists()) {
      const userData = user.data();
      const favs = userData.favourites || [];

      favs.forEach((recipe) => {
        const recipe_item = document.createElement("div");
        recipe_item.classList.add("recipe_item");

        recipe_item.innerHTML = `
          <img src="${recipe.image}">
          <div id="title_container">
            <p style="padding-top:5px">${recipe.name}</p>
            <p>${recipe.prep_time} - Easy Prep</p>
          </div>
          <div class="recipe_btns">
            <p class="Remove">Remove</p>
            <p class="view_recipe">View Recipe</p>
          </div>`;

        const view_recipe = recipe_item.querySelector(".view_recipe");
        view_recipe.addEventListener("click", () => {
          localStorage.setItem("SelectedRecipe", JSON.stringify(recipe));
          location.href = "recipe_details.html";
        });

        const removeRecipe = recipe_item.querySelector(".Remove");
        removeRecipe.addEventListener("click", async () => {
          try {
            await updateDoc(user_ref, {
              favourites: arrayRemove(recipe)
            });
            loadFavourites(); 
          } catch (err) {
            console.error("Failed to remove recipe:", err);
            alert("Something went wrong while removing the recipe.");
          }
        });

        container.append(recipe_item);
      });
    } else {
      alert("User document not found");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Login and add favourites");
  }
}


document.addEventListener("DOMContentLoaded", loadFavourites);


// import { getDoc, doc ,updateDoc, arrayRemove } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
// import { db } from "./fbConfig.js";

// const loginData = JSON.parse(localStorage.getItem("loggedIn"));
// const container = document.getElementById("recipes_container");

// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     if (!loginData || !loginData.user) {
//       throw new Error("Not logged in");
//     }

//     const user_ref = doc(db, "Users", loginData.user);
//     const user = await getDoc(user_ref);

//     if (user.exists()) {
//       const userData = user.data();
//       const favs = userData.favourites || [];

//       favs.forEach((recipe) => {
//         const recipe_item = document.createElement("div");
//         recipe_item.classList.add("recipe_item");

//         recipe_item.innerHTML = `
    //       <img src="${recipe.image}" style="width:350px">
    //       <div id="title_container">
    //         <p style="padding-top:5px">${recipe.name}</p>
    //         <p>${recipe.prep_time} - Easy Prep</p>
    //       </div>
    //       <div id="recipe_btns">
    //         <p class="Remove">Remove</p>
    //         <p class="view_recipe">View Recipe</p>
    //       </div>`;
    //      const view_recipe = recipe_item.querySelector(".view_recipe");
    // view_recipe.addEventListener("click", () => {
    //   localStorage.setItem("SelectedRecipe", JSON.stringify(recipe));
    //   location.href = "recipe_details.html";
    // });
    // const removeRecipe = recipe_item.querySelector(".Remove");
    // removeRecipe.addEventListener("click",async()=>{
    //       await updateDoc(user_ref,{
    //           favourites:arrayRemove(recipe)
    //       });
//     })
//         container.append(recipe_item);
//       });
//     } else {
//       alert("User document not found");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     alert("Login and add favourites");
//   }
// });

// import {getDoc,doc,arrayRemove} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
// import { db } from "./fbConfig.js";
// const loginData = JSON.parse(localStorage.getItem("loggedIn"));
// const container = document.getElementById("recipes_container")
// document.addEventListener("DOMContentLoaded",async()=>{
// try {
//         const user_ref = doc(db, "Users", loginData.user);
//         const user = await getDoc(user_ref);

//         if (user.exists()) {
//           const userData = user.data();
//           const favs = userData.favourites
//           favs.forEach((recipe)=>{
//               const recipe_item = document.createElement("div");
//               recipe_item.classList="recipe_item"
//               item.innerHTML=`
//               <img src=${recipe.image} style="width:350px">
//             <div id="title_container">
//             <p style="padding-top:5px">${recipe.name}</p>
//             <p>${recipe.prep_time}-Easy Prep</p> </div>
//             <div id="recipe_btns">
//                 <p class="Remove">Remove</p>
//                 <p class="view_recipe">View Recipe</p>
//             </div>`
//             container.append(recipe_item)
//           })
//         }
//     }catch(error){
//         alert("Login and add favourites")
//     }
//   });
