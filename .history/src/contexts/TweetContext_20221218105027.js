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

const storage = getStorage(app);

export const ACTIONS = {
  ADD_TWEET: "addTweet",
  UDATE_PROFILE_PIC: "profile-pic",
  DELETE_TODO: "delete-todo",
};

function reducer(tweet, action) {
  switch (action.type) {
    case ACTIONS.ADD_TWEET:
      return func(action.payload);
    // console.log("tweet", action.payload.text

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
    console.log("tweetObj", tweetObj);
  } catch (e) {
    console.log("Did not add tweet", e);
  }
}

export function TweetContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [tweetRender, setTweetRender] = useState();
  const [picUrl, setPicUrl] = useState(null);
  const [tweetMessage, setTweetMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, postCollection } = useAuth();
  const [tweet, dispatch] = useReducer(reducer, []);
  const date =
    format(new Date(), "yyyy-MM-dd") +
    "T" +
    format(new Date(), "HH:mm:ss.ms") +
    "Z";

  async function getProfilePic() {
    if (!currentUser) return;
    const listRef = ref(storage, `/`);

    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            if (url.includes(currentUser.uid)) {
              setPicUrl(url);
            }
          });
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
    try {
      const { docs } = await getDocs(postCollection);
      await getProfilePic();
      setLoading(false);
      const tweetList = docs.map((doc) => doc.data());
      var sorted = [...tweetList].sort(function (a, b) {
        return a.date.localeCompare(b.date);
      });
      setPosts(sorted.reverse());
    } catch (e) {
      console.log("Tweets could not load", e);
    }
  }

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
        getProfilePic,
        loading,
        setLoading,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
}
