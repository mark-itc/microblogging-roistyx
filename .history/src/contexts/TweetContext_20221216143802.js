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
import app from "../firebase";
import { format } from "date-fns";

export const TweetContext = createContext();

// export function useTweetContext() {
//      return useContext(TweetContext)
// }

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
  const firestoreIntance = getFirestore(app);
  const postCollection = collection(firestoreIntance, "posts");

  try {
    await addDoc(postCollection, tweetObj);
  } catch (e) {
    console.log("Did not add tweet", e);
  }
}

export function TweetContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [tweetRender, setTweetRender] = useState();
  const [picUrl, setPicUrl] = useState(null);
  const [tweetMessage, setTweetMessage] = useState([]);
  const { currentUser, postCollection } = useAuth();
  const [tweet, dispatch] = useReducer(reducer, []);
  // console.log("posts", posts)
  const date =
    format(new Date(), "yyyy-MM-dd") +
    "T" +
    format(new Date(), "HH:mm:ss.ms") +
    "Z";
  console.log("currentUser", currentUser.uid);

  // J0NORXMKzJOwl6xkdZ2OFjeZRKH2 example@
  // RojxVopMuurfZf26tw7Q caca@

  useEffect(() => {
    async function getTweetList() {
      // console.log("tweetObj",tweetObj)
      // const firestoreIntance = getFirestore(app)
      //   const postCollection = collection(firestoreIntance, 'posts/avatar')

      try {
        const firestore = getFirestore(app);
        const docRef = doc(firestore, "posts/1hj5vAs5Sef7ljRFsFLI");
        console.log("docRef", docRef);
        const docSnap = await getDoc(docRef);
        await addDoc(docRef, "avatar", "value");

        console.log("docSnap.id", docSnap.id);
      } catch (e) {
        console.log("Did not add tweet", e);
      }

      // const budgetRef = await addDoc(collection(firestoreIntance,'J0NORXMKzJOwl6xkdZ2OFjeZRKH2', 'budgets'), { name: 'budget.name', max: 'budget.max' });
      // const budgetId = budgetRef.id;
      // console.log("",budgetId)

      // const postCollection = collection(firestoreIntance, 'users/')

      // const tweetsCollection = await addDoc(collection(budgetId,  'J0NORXMKzJOwl6xkdZ2OFjeZRKH2', 'budgets'), { name: 'budget.name', max: 'budget.max' });
      // const tweetsCollectionID = tweetsCollection.id;
      // console.log("",tweetsCollectionID)
    }
    getTweetList();
  }, [picUrl]);

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
