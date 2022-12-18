import React, { createContext, useState, useReducer } from "react";
import { format } from "date-fns";
import { getFirestore, collection, addDoc } from "firebase/firestore/lite";
import { ref, getDownloadURL, listAll, getStorage } from "firebase/storage";
import { useAuth } from "../contexts/AuthContext";
import app from "../firebase";

export const TweetContext = createContext();
const storage = getStorage(app);

export const ACTIONS = {
  ADD_TWEET: "add-tweet",
};

function reducer(tweet, action) {
  switch (action.type) {
    case ACTIONS.ADD_TWEET:
      return sendPostToDatabase(action.payload);
    default:
      return tweet;
  }
}

async function sendPostToDatabase(tweetItem) {
  const firestoreIntance = getFirestore(app);
  const postCollection = collection(firestoreIntance, "posts");

  try {
    await addDoc(postCollection, tweetItem);
  } catch (e) {
    console.log("Did not add tweet", e);
  }
}

export function TweetContextProvider({ children }) {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [tweetRender, setTweetRender] = useState();
  const [picUrl, setPicUrl] = useState(null);
  const [userUrl, setUserUrl] = useState([]);
  const [tweetMessage, setTweetMessage] = useState([]);
  const [loading, setLoading] = useState(true);
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
              setUserUrl(url);
            }
          });
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
    return;
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
        loading,
        setLoading,
        userUrl,
        setUserUrl,
        getProfilePic,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
}
