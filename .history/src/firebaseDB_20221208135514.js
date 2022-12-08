// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCQFrFBR4QRIl_AovGk6cPz7_dzHcOhWE",
  authDomain: "twitter-alike-5590f.firebaseapp.com",
  databaseURL: "https://twitter-alike-5590f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "twitter-alike-5590f",
  storageBucket: "twitter-alike-5590f.appspot.com",
  messagingSenderId: "333424675114",
  appId: "1:333424675114:web:6f1b1cdd760db7c842f653"
};

// Initialize Firebase
const db = initializeApp(firebaseConfig);

export default db