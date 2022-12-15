import React, {useContext, createContext, useState} from 'react'
import { useAuth } from './contexts/AuthContext'
import {getFirestore, collection, getDocs, addDoc, doc, addDocs} from 'firebase/firestore/lite'

import { format } from 'date-fns'

export const TweetContext = createContext()

export function useTweetContext() {
     return useContext(TweetContext)
}


export const ACTIONS = {
  ADD_TWEET: "add-tweet",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TWEET:
      return 
      // [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);

    default:
      return todos;
  }
}

const date = format(new Date(), 'yyyy-MM-dd')+'T'+format(new Date(), 'HH:mm:ss.ms')+"Z"

export function TweetContextProvider({children}) {
  const [posts, setPosts] = useState(true)
  const [tweetRender, setTweetRender] = useState();
  const [tweetMessage, setTweetMessage] = useState([])
  // const {currentUser, postCollection} = useAuth()
  const {currentUser, postCollection} = useAuth()

  // async function sendUserTweet(tweetMessage) {
  //   console.log(tweetMessage)
  //   const tweetObj = {avatar:
  //       "https://placekitten.com/200/287",
  //       date: date,
  //       text: tweetMessage,
  //       username: currentUser.email,
  //       uid: currentUser.uid,
  //     }
  //       try {
  //         await addDoc(postCollection, tweetObj)
  //         setTweetRender(tweetObj)
  //       } catch(e) {
  //         console.log("Did not add tweet", e)
  //       }
        
  //   }

     
  return (
    <TweetContext.Provider value={
      {posts, 
      setPosts, 
      tweetMessage, 
      setTweetMessage, 
      tweetRender, 
      setTweetRender}}>
        {children}
    </TweetContext.Provider>
  )
}


