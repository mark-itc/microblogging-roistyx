import React, { useContext, createContext, useState, useReducer } from "react";
import { useAuth } from "./AuthContext";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  addDocs,
} from "firebase/firestore/lite";

import { format } from "date-fns";

export const TweetContext = createContext();

// export function useTweetContext() {
//      return useContext(TweetContext)
// }

export const ACTIONS = {
  ADD_TWEET: "addTweet",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
};

function reducer(postCollection, action) {
  switch (action.type) {
    case ACTIONS.ADD_TWEET:
      return console.log(postCollection);
    // [...tweets, newTodo(action.payload.name)];
    // case ACTIONS.TOGGLE_TODO:
    //   return tweets.map((tweet) => {
    //     if (tweet.id === action.payload.id) {
    //       return { ...tweet, compavatarlete: !tweet.complete };
    //     }
    //     return tweet;
    //   });
    // case ACTIONS.DELETE_TODO:
    //   return tweets.filter((tweet) => tweet.id !== action.payload.id);

    default:
      return postCollection;
  }
}

// async function newTodo(name) {
//   try {
//     await addDoc(postCollection, tweetObj)
//     setTweetRender(tweetObj)
//   } catch(e) {
//     console.log("Did not add tweet", e)
//   }
//   return { avatar:
//     "https://placekitten.com/200/287",
//     date: date,
//     text: text,
//     username: username,
//     uid: uid, };
// }

const date =
  format(new Date(), "yyyy-MM-dd") +
  "T" +
  format(new Date(), "HH:mm:ss.ms") +
  "Z";

export function TweetContextProvider({ children }) {
  const [tweets, dispatch] = useReducer(reducer, ["Hello world!"]);
  const [posts, setPosts] = useState(true);
  const [tweetRender, setTweetRender] = useState();
  const [picUrl, setPicUrl] = useState(null);
  const [tweetMessage, setTweetMessage] = useState([]);
  const { currentUser, postCollection } = useAuth();
  // console.log("tweets", tweets)

  async function sendUserTweet(tweetMessage) {
    console.log(tweetMessage);
    dispatch({
      type: ACTIONS.ADD_TWEET,
      payload: {
        postCollection,
        avatar: "https://placekitten.com/200/287",
        date: date,
        text: tweetMessage,
        username: currentUser.email,
        uid: currentUser.uid,
      },
    });
    const tweetObj = {
      avatar: "https://placekitten.com/200/287",
      date: date,
      text: tweetMessage,
      username: currentUser.email,
      uid: currentUser.uid,
    };
    try {
      await addDoc(postCollection, tweetObj);
      setTweetRender(tweetObj);
    } catch (e) {
      console.log("Did not add tweet", e);
    }
  }

  return (
    <TweetContext.Provider
      value={{
        sendUserTweet,
        posts,
        setPosts,
        tweetMessage,
        setTweetMessage,
        tweetRender,
        setTweetRender,
        setPicUrl,
        picUrl,
        tweets,
        dispatch,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
}
