import React, { useContext, useState, useEffect } from "react";
import { auth, FirebaseAuth } from "../firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();
console.log(AuthContext);

var isUserLoggedIn = FirebaseAuth.getInstance();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function checkUserStatus() {
      // Check if a user is signed in
      if (isUserLoggedIn.currentUser != null) {
        // User is signed in, so you can get the user's information here
        var usernmae = isUserLoggedIn.currentUser;
        console.log("Username", usernmae);
      } else {
        console.log(
          "No user is signed in, so you can prompt the user to sign in here"
        );
      }
    }
    checkUserStatus();
  }, []);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
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
