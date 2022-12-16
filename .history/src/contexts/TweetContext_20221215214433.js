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

const firestoreIntance = getFirestore(app);
const postCollection = collection(firestoreIntance, "posts");

const initialProfileState = {
  avatar: "https://placekitten.com/200/287",
  date: "",
  text: "",
  username: "",
  uid: "",
};

export const ACTIONS = {
  ADD_TWEET: "addTweet",
  UDATE_PROFILE_PIC: "profile-pic",
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

  try {
    await addDoc(postCollection, tweetObj);
  } catch (e) {
    console.log("Did not add tweet", e);
  }
}

export function TweetContextProvider({ children }) {
  const [posts, setPosts] = useState(true);
  const [tweetRender, setTweetRender] = useState();
  const [picUrl, setPicUrl] = useState(null);
  const [tweetMessage, setTweetMessage] = useState([]);
  const { currentUser, postCollection } = useAuth();
  const [tweet, dispatch] = useReducer(reducer, { initialProfileState });
  const date =
    format(new Date(), "yyyy-MM-dd") +
    "T" +
    format(new Date(), "HH:mm:ss.ms") +
    "Z";
  console.log("picUrl", picUrl);

  useEffect(() => {
    function getPosts() {
      console.log("picUrl", picUrl);
      console.log("posts", posts);
    }

    getPosts();
  }, [tweet]);

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
