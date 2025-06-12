import {authentication,db} from "./fbConfig.js";
import {signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import {getDoc,doc} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
document.addEventListener("DOMContentLoaded",()=>{
  const login = document.getElementById("loginForm");
      login.addEventListener("submit",async(e)=>{
        e.preventDefault()
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        try{
        const loggedIn =await signInWithEmailAndPassword(authentication,email,password);
        const user = loggedIn.user.displayName;
        console.log(loggedIn.user.displayName)
        const userReference = doc(db,"Users",loggedIn.user.displayName)
        const displayName =await getDoc(userReference)
        console.log(displayName)
        if(displayName.exists()){
          console.log(loggedIn,"loggedIn");
          alert("Login Successfull");
          localStorage.setItem("loggedIn",JSON.stringify({user}))
          location.href="index.html"
        }else{
          alert("User Not Found Please Sign Up")
        }
      }catch(error){
            console.error("Login error:", error);
            if (error.code === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        alert("No user found with this email. Please sign up.");
      } else {
        // alert("Login failed: " + error.message);
        alert("Login failed credentials not found");
      }
      }
      })
})

