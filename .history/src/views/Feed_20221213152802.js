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
import { useTweetContext } from "../contexts/TweetContext";

export default function Feed() {
  const date =
    format(new Date(), "yyyy-MM-dd") +
    "T" +
    format(new Date(), "HH:mm:ss.ms") +
    "Z";
  const [loading, setLoading] = useState(true);
  // const { abba } = useContext(TweetContext)
  const { currentUser, postCollection } = useAuth();
  const { posts, setPosts } = useTweetContext();

  async function sendUserTweet(tweetMessage) {
    console.log(tweetMessage);
    const tweetObj = {
      avatar: "https://placekitten.com/200/287",
      date: date,
      text: tweetMessage,
      username: currentUser.email,
      uid: currentUser.uid,
    };
    try {
      await addDoc(postCollection, tweetObj);
    } catch (e) {
      console.log("Did not add tweet", e);
    }
  }

  useEffect(() => {
    async function getTweetList() {
      const { docs } = await getDocs(postCollection);
      setLoading(false);
      const tweetList = docs.map((doc) => doc.data());
      setPosts(tweetList);
    }
    getTweetList();
  });

  return (
    <div className="feed">
      <TweetBox username={currentUser.email} sendUserTweet={sendUserTweet} />
      {loading
        ? ""
        : posts.map((post) => (
            <Post
              displayName={post.username}
              text={post.text}
              date={post.date}
              avatar={post.avatar}
              uid={post.uid}
            />
          ))}
    </div>
  );
}
