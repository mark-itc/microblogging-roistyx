import { React, useEffect, useContext, useState } from "react";
import { ApiTweetsContext } from "../components/ApiTweetsContext";
import Post from "../components/Post";
// import TweetBox from './TweetBox'
import "./Feed.css";
import app from "../firebase";
import {
  getFirestore,
  collection,
  getDocs,
  addDocs,
} from "firebase/firestore/lite";

const firestoreIntance = getFirestore(app);
const myCollection = collection(firestoreIntance, "posts");
console.log("myCollection", myCollection);

export default function Feed(displayName, username, text, date, avatar) {
  const [posts, setPosts] = useState(true);

  // useEffect(() => {
  //   db.collection('posts').onSnapshot((snapshot => setPosts(snapshot.docs.map(doc => doc.date()))))

  // },[])

  return (
    <div className="feed">
      {/* <CommentBox/>   */}
      {/* <TweetBox/> */}

      <Post
        displayName="Roie"
        username="r_ie"
        text="HELLO WORLD!"
        date="2002"
        avatar="https://placekitten.com/200/287"
      />
    </div>
  );
}
