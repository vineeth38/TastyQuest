const recipe = JSON.parse(localStorage.getItem("SelectedRecipe"));
console.log(recipe);
localStorage.removeItem("SelectedRecipe")
img = document.getElementsByTagName("img")
img[0].src=`${recipe.image}`
const name = document.getElementById("recipe_name")
name.innerText=`${recipe.name}`;
prep_time=document.getElementById("time");
prep_time.innerText=`⏰ ${recipe.prep_time} . 🛍️ Hard Prep . 🍽️ Serves`
const ingredients = document.getElementById("ingredients")
recipe.ingredients.forEach((ingredient)=>{
    const item = document.createElement("li");
    item.innerText=`${ingredient}`;
    ingredients.append(item)
})
const Prep_steps = document.getElementById("preparation")
recipe.instructions.forEach((instruction)=>{
      const step  = document.createElement("li");
      step.innerText=`${instruction}`
      Prep_steps.append(step)
})