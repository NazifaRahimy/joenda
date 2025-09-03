// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlwAuB1pN3uCO019iJa10cFK7B3B_01sc",
  authDomain: "joyenda-auth.firebaseapp.com",
  projectId: "joyenda-auth",
  storageBucket: "joyenda-auth.appspot.com",
  messagingSenderId: "964364519569",
  appId: "1:964364519569:web:yourAppIdHere" // یا حذف کن فعلاً
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup }; // ← حتماً اینو داشته باش

