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
  ref,
  getDownloadURL,
  listAll,
  getStorage,
} from "firebase/firestore/lite";
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
  const { currentUser, postCollection } = useAuth();
  const [tweet, dispatch] = useReducer(reducer, []);
  const [newCurrentUser, setNewCurrentUser] = useState();
  const date =
    format(new Date(), "yyyy-MM-dd") +
    "T" +
    format(new Date(), "HH:mm:ss.ms") +
    "Z";

  function getProfilePic() {
    if (!currentUser) return;
    const listRef = ref(storage, `/`);

    listAll(listRef)
      .then((res) => {
        console.log("res", res);
        res.prefixes.forEach((folderRef) => {
          console.log("folderRef", folderRef);
        });
        res.items.forEach((itemRef) => {
          console.log("itemRef", itemRef);
          getDownloadURL(itemRef).then((url) => {
            console.log("", url);
            console.log("currentUser.uid", currentUser.uid);
            if (url.includes(currentUser.uid)) {
              setPicUrl(url);
            }
          });
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
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
      }}
    >
      {children}
    </TweetContext.Provider>
  );
}
