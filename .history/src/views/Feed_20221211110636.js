import { React, useEffect, useContext, useState } from 'react'
import { ApiTweetsContext } from '../components/ApiTweetsContext'
import Post from '../components/Post'
// import TweetBox from './TweetBox'
import './Feed.css'

import app from '../firebase';
import { doc, onSnapshot, collection, query, where, onSnapshot } from "firebase/firestore";





export default function Feed(displayName, username, text, date, avatar) {
const [posts, setPosts] = useState(true)

useEffect(() => {
  const q = query(collection(db, "posts"))
  const unsub = onSnapshot(q, (querySnapshot) => {
    console.log("Data", querySnapshot.docs.map(d => doc.data()));
  });
}, [])


// useEffect(() => {
//   app.collection('posts').onSnapshot((snapshot => setPosts(snapshot.docs.map(doc => doc.date()))))

// },[])


  return (
    <div className="feed">
      {/* <CommentBox/>   */}
      {/* <TweetBox/> */}

      <Post displayName="Roie" username="r_ie"
      text="HELLO WORLD!"
      date="2002"
      avatar="https://placekitten.com/200/287" />
    </div>
  )
}
