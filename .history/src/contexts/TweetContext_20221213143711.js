import {createContext, useState} from 'react'

export const TweetContext = createContext() 


export  function TweetProvider({children}) {
  // const [posts, setPosts] = useState(true)
  const credentials = {
    username: "Roie",
    password: "12345"
} 
  return (
    <TweetContext.Provider value={credentials}>
      {children}
   
    </TweetContext.Provider>
  )
}

