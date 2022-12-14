import { React, useEffect, useContext, useState } from 'react'
import { ApiTweetsContext } from '../components/ApiTweetsContext'
import Post from '../components/Post'
// import TweetBox from './TweetBox'
import './Feed.css'
import app from '../firebase';
import {getFirestore, collection, getDocs, doc, addDocs, onSnapshot} from 'firebase/firestore/lite'




// async function myFunc() {

  // const tweetList = await getDocs(myCollection)
  // console.log(tweetList)
  
// } 

// myFunc()

// console.log("myCollection", tweetList)
const firestoreIntance = getFirestore(app)
const myCollection = collection(firestoreIntance, 'posts')
console.log(myCollection)

export default function Feed(displayName, username, text, date, avatar) {
const [posts, setPosts] = useState(true)



async function myFunc() {
  
  const obj = await getDocs(myCollection)
  const tweetList = obj.map(doc => doc.data())
  // setPosts(tweetList)
  console.log(obj)
} 

myFunc()







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
