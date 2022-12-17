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
  const { posts, setPosts, tweet, } = useContext(TweetContext)
  const navigate = useNavigate();


  useEffect(() => {
    async function getTweetList() {
      const { docs } = await getDocs(postCollection);
      setLoading(false);
      const tweetList = docs.map((doc) => doc.data())
      const sortedTweetList = tweetList.sort((a, b) => b.date - a.date);
      console.log("sortedTweetList",sortedTweetList)
      setPosts(tweetList);

      // console.log("live tweetList", tweetList)
    }
    getTweetList();
  }, [tweet]);

  console.log("currentUser",currentUser.token)

  return ( <>
  {currentUser ? <div className="feed">
  <TweetBox username={currentUser.email} />
  {loading ? "" : 
    posts.map((post) => (
        <Post
          displayName={post.username}
          text={post.text}
          date={new Date()}
          avatar={post.avatar}
          uid={post.uid}
        />
      ))}
</div>: navigate("/login")}</>
    
    
  );
}
