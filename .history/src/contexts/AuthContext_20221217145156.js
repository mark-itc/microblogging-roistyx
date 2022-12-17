import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDocs,
  onSnapshot,
} from "firebase/firestore/lite";
import app from "../firebase";

export const AuthContext = React.createContext()

const firestoreIntance = getFirestore(app);


export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState([])
  const [loading, setLoading] = useState(true)
  const [postCollection, setPostCollection] = useState()
  console.log("currentUser", currentUser)
  useEffect(() => {
    const postCollection = collection(firestoreIntance, "posts");
    setPostCollection(postCollection);
  }, []);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    setCurrentUser(null)
    auth.signOut()
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    firestoreIntance,
    postCollection,
    currentUser,
    signup,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
