import React, {
  useContext,
  useEffect,
  createContext,
  useState,
  useReducer,
} from "react";
import { useAuth } from "./AuthContext";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  addDocs,
  updateDoc,
  update,
} from "firebase/firestore/lite";
import { ref, getDownloadURL, listAll, getStorage } from "firebase/storage";
import app from "../firebase";
import { format } from "date-fns";

export const TweetContext = createContext();

export const ACTIONS = {
  ADD_TWEET: "addTweet",
  UDATE_PROFILE_PIC: "profile-pic",
  DELETE_TODO: "delete-todo",
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
