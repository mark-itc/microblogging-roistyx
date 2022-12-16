import firebase from "firebase/app";
import "firebase/auth";
import { initializeApp } from "firebase/app";

//  const app = firebase.initializeApp({
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN, databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL, projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID, storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET, messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID
// })

const firebaseConfig = {
  apiKey: "AIzaSyDe-hWv9CImb4uHmg6nEhBg4k2K8TKf6d0",
  authDomain: "myauth-development-264bb.firebaseapp.com",
  projectId: "myauth-development-264bb",
  storageBucket: "myauth-development-264bb.appspot.com",
  messagingSenderId: "796593618426",
  appId: "1:796593618426:web:1dd5d0988d092a9b033843",
};

export const app = initializeApp(firebaseConfig);

export const auth = app.auth();
// export default app
// console.log(auth)
