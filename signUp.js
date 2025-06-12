import {authentication,db} from "./fbConfig.js";
import {createUserWithEmailAndPassword,updateProfile} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import {setDoc,doc} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
document.addEventListener("DOMContentLoaded",()=>{
    const signup = document.getElementById("signUpForm")
    signup.addEventListener("submit",async(e)=>{
        e.preventDefault()
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const favourites = [];
        console.log(name,email,password)
         try{
        const userCredentials = await createUserWithEmailAndPassword(authentication,email,password);
            console.log(userCredentials);
        const userDetails = userCredentials.user;
        console.log(userDetails)
        await updateProfile(userDetails,{
            displayName:name
        })
        console.log(userDetails);
        await setDoc(doc(db,"Users",name),{
            name,
            email,
            favourites
        })
        alert("sign up successfull")
        location.href="login.html"
        }catch(err){
            alert("User details already exist with this Email")
        }
    })
})


// // [
//     {
//       "id": 1,
//       "name": "Poha",
//       "image": "https://media.istockphoto.com/id/1432250420/photo/tamarind-poha-or-puli-aval.jpg?s=612x612&w=0&k=20&c=txhqQu3t_QcbWcONHZkFzNmHDBbSJZZ9GKR8pRxB1Wg=",
//       "prep_time": "15 mins",
//       "ingredients": [
//         "1 cup flattened rice (poha)",
//         "1 onion (chopped)",
//         "1 green chili (chopped)",
//         "1/4 tsp mustard seeds",
//         "8-10 curry leaves",
//         "1/4 tsp turmeric powder",
//         "Salt to taste",
//         "2 tsp oil",
//         "Lemon juice & coriander for garnish"
//       ],
//       "instructions": [
//         "Rinse poha and set aside.",
//         "Heat oil, add mustard seeds, curry leaves, and green chili.",
//         "Add onions, sauté till soft.",
//         "Add turmeric, salt, and poha.",
//         "Mix well and cook for 2-3 mins.",
//         "Garnish with lemon juice and coriander."
//       ]
//     },
//     {
//   "id": 2,
//   "name": "Omelette Chapati",
//   "image": "https://media.istockphoto.com/id/898451452/photo/omelette-omlet-omlete-chapati-roll-or-indian-bread-or-roti-rolled-with-omlet-popular-quick-and.jpg?s=612x612&w=0&k=20&c=WpCWQzNLERUm-YtTybQBaDBhAGrthk2gPJIPw2Taut4=",
//   "prep_time": "15 mins",
//   "ingredients": [
//     "2 eggs",
//     "1 chapati",
//     "1 onion (finely chopped)",
//     "1 green chili (optional, chopped)",
//     "2 tbsp coriander leaves",
//     "Salt and pepper to taste",
//     "Oil or butter"
//   ],
//   "instructions": [
//     "Whisk eggs with onion, chili, coriander, salt, and pepper.",
//     "Heat a pan with a little oil and pour the egg mixture.",
//     "Before the omelette sets fully, place a chapati on top and press gently.",
//     "Flip and cook for a few more seconds.",
//     "Roll and serve as a tiffin wrap."
//   ]
// },
//     {
//       "id": 3,
//       "name": "Masala Dosa",
//       "image": "https://media.istockphoto.com/id/2150877039/photo/south-indian-feast-crispy-dosa-with-lentil-stew.jpg?s=612x612&w=0&k=20&c=IR0u7NVQhyxDDMACJcsjTWXrzmEwH1h0a_dlfM8z_7U=",
//       "prep_time": "30 mins",
//       "ingredients": [
//         "1 cup dosa batter",
//         "1/2 cup boiled mashed potato",
//         "1/4 tsp mustard seeds",
//         "1 onion sliced",
//         "1 green chili",
//         "1/4 tsp turmeric",
//         "Salt to taste",
//         "Oil for cooking"
//       ],
//       "instructions": [
//         "Heat oil, add mustard seeds, onions, green chili.",
//         "Add turmeric and mashed potato. Cook filling.",
//         "Spread dosa batter on tawa, cook till golden.",
//         "Place filling, fold dosa, and serve hot."
//       ]
//     },
//     {
//     "id": 4,
//     "name": "Idli with Chutney",
//     "image": "https://media.istockphoto.com/id/1620129740/photo/selective-focus-of-south-indian-famous-food-idli-vada-with-sambar-and-chatney.jpg?s=612x612&w=0&k=20&c=sUepsZL9VXtY-J46o8pX0B06tXm-cgGGS-N5JIlaKUY=",
//     "prep_time": "25 mins",
//     "ingredients": [
//       "2 cups idli batter",
//       "Oil for greasing",
//       "1/2 cup coconut chutney"
//     ],
//     "instructions": [
//       "Grease idli molds with oil.",
//       "Pour batter into molds and steam for 10-12 minutes.",
//       "Serve hot with coconut chutney."
//     ]
//   },
//   {
//   "id": 5,
//   "name": "Medu Vada with Sambar",
//   "image": "https://media.istockphoto.com/id/1265607070/photo/medu-vada-with-tiffin-sambar-coconut-chutney-indian-fried-snack.jpg?s=612x612&w=0&k=20&c=mzf_AYm-0BK-0gxm-r7a4DcBXjgisMShRSM1HLXDmtE=",
//   "prep_time": "35 mins",
//   "ingredients": [
//     "1 cup urad dal (soaked 4 hrs)",
//     "1 green chili (chopped)",
//     "1 tsp black pepper",
//     "1 tsp ginger (grated)",
//     "Salt to taste",
//     "Oil for deep frying",
//     "Sambar & coconut chutney (for serving)"
//   ],
//   "instructions": [
//     "Grind soaked urad dal to a fluffy batter.",
//     "Add salt, chopped chili, pepper, and ginger.",
//     "Wet hands, shape into donuts, and deep fry till golden.",
//     "Serve hot with sambar and coconut chutney."
//   ]
// }
//   ]
// }
