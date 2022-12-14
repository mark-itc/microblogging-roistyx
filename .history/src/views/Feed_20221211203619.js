import { React, useEffect, useContext, useState } from 'react'
import { ApiTweetsContext } from '../components/ApiTweetsContext'
import Post from '../components/Post'
import TweetBox from './TweetBox'
import './Feed.css'
import app from '../firebase';
import {getFirestore, collection, getDocs, doc, addDocs} from 'firebase/firestore/lite'
import { onSnapshot } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext'
import { TweetContext } from '../contexts/TweetContext'
import { v4 as uuidv4 } from 'uuid';


export default function Feed() {
const [posts, setPosts] = useState(true)

const [loading, setLoading] = useState(true);
// const { abba } = useContext(TweetContext)
const {currentUser, postCollection} = useAuth()

async function renderMe(arg) {
console.log(arg)
}

useEffect(() => {
  async function getTweetList() {
    const {docs} = await getDocs(postCollection)
    setLoading(false)
    const tweetList = docs.map(doc => doc.data())
    setPosts(tweetList)
    
    // console.log("live tweetList", tweetList)
  }
  getTweetList() 
},[])

  return (
    <div className="feed">

      <TweetBox  username={currentUser.email}/>
      {loading ? "" : posts.map(post =>(<Post 
      displayName= {post.username}
      text={post.text}
      date= {post.date}
      avatar={post.avatar}
      renderMe={renderMe}
       />))}
    </div>
  )
}
