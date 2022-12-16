// import firebase from 'firebase/app'
// import 'firebase/auth'
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDe-hWv9CImb4uHmg6nEhBg4k2K8TKf6d0",
  authDomain: "myauth-development-264bb.firebaseapp.com",
  projectId: "myauth-development-264bb",
  storageBucket: "myauth-development-264bb.appspot.com",
  messagingSenderId: "796593618426",
  appId: "1:796593618426:web:1dd5d0988d092a9b033843",
});
export const auth = app.auth();
export const db = app.firestore();
export default app;
console.log("This is app", db);
