import { React, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  // const [posts, setPosts] = useState(true)
  // const [tweetRender, setTweetRender] = useState();
  const [loading, setLoading] = useState(true);
  const { tweetRender, setTweetRender, tweetMessage, setTweetMessage } =
    useContext(TweetContext);
  const { currentUser, postCollection } = useAuth();
  const { posts, setPosts, tweet, picUrl } = useContext(TweetContext)
  const navigate = useNavigate();
  const dateNow = Date.now()/1000000000

  console.log("picUrl", picUrl)




  useEffect(() => {
    async function getTweetList() {
      const { docs } = await getDocs(postCollection);
      setLoading(false);
      const tweetList = docs.map((doc) => doc.data())
      const sortedObj = {};

    // Get an array of the object's keys and sort them
      const keys = Object(tweetList).sort();
      
    // Iterate over the sorted keys and add the key-value pairs to the new object
      for (const key of keys) {
        sortedObj[key] = tweetList[key];
        console.log("keys", key);
      }

      
      setPosts(tweetList);

    
    }
    getTweetList();
  }, [tweet]);

  return ( <>
  {currentUser ? <div className="feed">
  <TweetBox username={currentUser.email} />
  {loading ? "" : 
    posts.map((post) => (
        <Post
          displayName={post.username}
          text={post.text}
          date={dateNow}
          avatar={picUrl}
          uid={post.uid}
        />
      ))}
</div>: navigate("/login")}</>
    
    
  );
}
