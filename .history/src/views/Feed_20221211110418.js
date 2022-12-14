import { React, useEffect, useContext, useState } from 'react'
import { ApiTweetsContext } from '../components/ApiTweetsContext'
import app from '../firebase'
import Post from '../components/Post'
// import TweetBox from './TweetBox'
import './Feed.css'
import { doc, onSnapshot, collection, query, where, onSnapshot } from "firebase/firestore";




export default function Feed(displayName, username, text, date, avatar) {
const [posts, setPosts] = useState(true)


// useEffect(() => {
//   app.collection('posts').onSnapshot((snapshot => setPosts(snapshot.docs.map(doc => doc.date()))))

// },[])
console.log("This is the app",app.collection('posts'))

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
