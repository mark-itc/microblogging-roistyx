import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import {getFirestore, collection, getDocs, doc, addDocs, onSnapshot} from 'firebase/firestore/lite'
import app from '../firebase';

const AuthContext = React.createContext()


export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState([]);
    const [loading, setLoading] = useState(true)
    const [postCollection, setPostCollection] = useState();

    // console.log("postCollection",postCollection)

    useEffect(() => {
        const firestoreIntance = getFirestore(app)
        const postCollection = collection(firestoreIntance, 'posts')
        setPostCollection(postCollection)
      },[])

    //   console.log("postCollection", postCollection)
    




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
        postCollection,
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
