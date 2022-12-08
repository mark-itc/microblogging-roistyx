import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const AuthContext = React.createContext()
const {email} =AuthContext
console.log(email)
 

export function useAuth() {
    
   return useContext(AuthContext)
    
    // const currentUser = {email: "David"}
    // return currentUser
    
    // const a = 12
    // return a
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState([]);
    const [loading, setLoading] = useState(true)
    
    
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
