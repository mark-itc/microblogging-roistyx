import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
// import "firebase/compat/auth";

const AuthContext = React.createContext();
// console.log(AuthContext)

export function useAuth() {
  console.log(AuthContext);
  useContext("AuthContext");
  return;
}
// console.log(AuthContext)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
