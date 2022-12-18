import React, { createContext, useState, useReducer } from "react";
import { useAuth } from "./AuthContext";
import { getFirestore, collection, addDoc } from "firebase/firestore/lite";
import app from "../firebase";
import { format } from "date-fns";

export const TweetContext = createContext();

export const ACTIONS = {
  ADD_TWEET: "add-tweet",
};

function reducer(tweet, action) {
  switch (action.type) {
    case ACTIONS.ADD_TWEET:
      return func(action.payload);
    default:
      return tweet;
  }
}

async function func(tweetObj) {
  console.log("tweetObj", tweetObj);
  const firestoreIntance = getFirestore(app);
  const postCollection = collection(firestoreIntance, "posts");

  try {
    await addDoc(postCollection, tweetObj);
    console.log("tweetObj", tweetObj);
  } catch (e) {
    console.log("Did not add tweet", e);
  }
}

export function TweetContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [tweetRender, setTweetRender] = useState();
  const [picUrl, setPicUrl] = useState(null);
  const [userUrl, setUserUrl] = useState([]);
  const [tweetMessage, setTweetMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, postCollection } = useAuth();
  const [tweet, dispatch] = useReducer(reducer, []);
  const date =
    format(new Date(), "yyyy-MM-dd") +
    "T" +
    format(new Date(), "HH:mm:ss.ms") +
    "Z";

  return (
    <TweetContext.Provider
      value={{
        date,
        posts,
        setPosts,
        tweetMessage,
        setTweetMessage,
        tweetRender,
        setTweetRender,
        setPicUrl,
        picUrl,
        tweet,
        dispatch,
        loading,
        setLoading,
        userUrl,
        setUserUrl,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
}
