import { React, useEffect, useContext, useState } from "react";
import { ApiTweetsContext } from "../components/ApiTweetsContext";
import Post from "../components/Post";
import TweetBox from "./TweetBox";
import "./Feed.css";
import app from "../firebase";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  addDocs,
} from "firebase/firestore/lite";
import { onSnapshot } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { TweetContext } from "../contexts/TweetContext";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

export default function Feed() {
  const date =
    format(new Date(), "yyyy-MM-dd") +
    "T" +
    format(new Date(), "HH:mm:ss.ms") +
    "Z";
  const [posts, setPosts] = useState(true);
  // const [tweetRender, setTweetRender] = useState();
  const [loading, setLoading] = useState(true);
  const { tweetRender, setTweetRender, tweetMessage, setTweetMessage } =
    useContext(TweetContext);
  const { currentUser, postCollection } = useAuth();
  const { picProfile } = useContext(TweetContext);

  // async function sendUserTweet(tweetMessage) {
  //   console.log(tweetMessage)
  //   const tweetObj = {avatar:
  //       "https://placekitten.com/200/287",
  //       date: date,
  //       text: tweetMessage,
  //       username: currentUser.email,
  //       uid: currentUser.uid,
  //     }
  //       setTweetRender(tweetObj)
  //       try {
  //         await addDoc(postCollection, tweetObj)
  //       } catch(e) {
  //         console.log("Did not add tweet", e)
  //       }
  //   }
  console.log("picProfile", picProfile);
  useEffect(() => {
    async function getTweetList() {
      const { docs } = await getDocs(postCollection);
      setLoading(false);
      const tweetList = docs.map((doc) => doc.data());
      setPosts(tweetList);

      // console.log("live tweetList", tweetList)
    }
    getTweetList();
  }, [tweetRender]);

  return (
    <div className="feed">
      <TweetBox username={currentUser.email} />
      {loading
        ? ""
        : posts.map((post) => (
            <Post
              displayName={post.username}
              text={post.text}
              date={post.date}
              avatar={picProfile}
              uid={post.uid}
            />
          ))}
    </div>
  );
}
