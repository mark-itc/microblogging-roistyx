import React, {useContext, createContext, useState} from 'react'
import { getStorage } from "firebase/storage";
import app from '../firebase';

const storage = getStorage(app);
console.log(storage)

export const TweetContext = createContext()

export function useTweetContext() {
     return useContext(TweetContext)
}

export function TweetContextProvider({children}) {
  const [posts, setPosts] = useState(true)

     
  return (
    <TweetContext.Provider value={{posts, setPosts}}>
        {children}
    </TweetContext.Provider>
  )
}


