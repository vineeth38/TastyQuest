
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
  import {getAuth} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
  // import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCytoP1P157zQB-FYZBdTE5aNns0I6XtLc",
    authDomain: "tastequest-541c9.firebaseapp.com",
    projectId: "tastequest-541c9",
    storageBucket: "tastequest-541c9.firebasestorage.app",
    messagingSenderId: "681281642341",
    appId: "1:681281642341:web:86da79ad18f5741e05cb8c",
    measurementId: "G-X3NCDXM8CC"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const authentication = getAuth(app);
  export const db = getFirestore(app);
  // const analytics = getAnalytics(app);


//   <script type="module">
//   // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
//   import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-analytics.js";
//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries

//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   const firebaseConfig = {
//     apiKey: "AIzaSyCytoP1P157zQB-FYZBdTE5aNns0I6XtLc",
//     authDomain: "tastequest-541c9.firebaseapp.com",
//     projectId: "tastequest-541c9",
//     storageBucket: "tastequest-541c9.firebasestorage.app",
//     messagingSenderId: "681281642341",
//     appId: "1:681281642341:web:86da79ad18f5741e05cb8c",
//     measurementId: "G-X3NCDXM8CC"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
// </script>