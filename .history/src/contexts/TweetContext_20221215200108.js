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
  addDoc,
  doc,
  addDocs,
} from "firebase/firestore/lite";
import app from "../firebase";
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

function reducer(tweet, action) {
  switch (action.type) {
    case ACTIONS.ADD_TWEET:
      return func(action.payload);
    // console.log("tweet", action.payload.text)

    // [...tweets, newTodo(action.payload.name)];
    // case ACTIONS.TOGGLE_TODO:
    // return tweets.map((tweet) => {
    //   if (tweet.id === action.payload.id) {
    //     return { ...tweet, compavatarlete: !tweet.complete };
    //   }
    //     return tweet;
    //   });
    // case ACTIONS.DELETE_TODO:
    //   return tweets.filter((tweet) => tweet.id !== action.payload.id);

    default:
      return tweet;
  }
}

async function func(tweetObj) {
  // console.log("tweetObj",tweetObj)
  const firestoreIntance = getFirestore(app);
  const postCollection = collection(firestoreIntance, "posts");
  try {
    await addDoc(postCollection, tweetObj);
  } catch (e) {
    console.log("Did not add tweet", e);
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

export function TweetContextProvider({ children }) {
  const [posts, setPosts] = useState(true);
  const [tweetRender, setTweetRender] = useState();
  const [picUrl, setPicUrl] = useState(null);
  const [tweetMessage, setTweetMessage] = useState([]);
  const { currentUser, postCollection } = useAuth();
  const [tweet, dispatch] = useReducer(reducer, []);
  // console.log("tweet", tweet)
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
      }}
    >
      {children}
    </TweetContext.Provider>
  );
}
