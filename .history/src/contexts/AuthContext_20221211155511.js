import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import {getFirestore, collection, getDocs, doc, addDocs, onSnapshot} from 'firebase/firestore/lite'
import app from '../firebase';

const AuthContext = React.createContext()
console.log(AuthContext)


// var usernmae = auth.getInstance();
// console.log("AuthContext", usernmae)
// 
// export function checkUserStatus() {
    
//     // Check if a user is signed in
//         if (!usernmae === null) {
//       // User is signed in, so you can get the user's information here
      
//       console.log("Username", usernmae)
//     } else {
//       console.log("No user is signed in, so you can prompt the user to sign in here")
//     } 
// }



export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState([]);
    const [loading, setLoading] = useState(true)
    const [tweetList, getTweetList] = useState();

    useEffect(() => {
        const firestoreIntance = getFirestore(app)
        const postCollection = collection(firestoreIntance, 'posts')
        getTweetList(postCollection)
      },[])
    




    // useEffect(() => {
    //     checkUserStatus()
    // }, [])
    
    
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password) 
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        }) 
        return unsubscribe
    },[])
    

    const value = {
        tweetList,
        currentUser,
        signup,
        login, 
        logout, 
        
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  
)
}
