import { React, useEffect, useContext, useState } from 'react'
import { ApiTweetsContext } from '../components/ApiTweetsContext'
import Post from '../components/Post'
import TweetBox from './TweetBox'
import './Feed.css'
import app from '../firebase';
import {getFirestore, collection, getDocs, doc, addDocs, onSnapshot} from 'firebase/firestore/lite'
import { useAuth } from '../contexts/AuthContext'
import { TweetContext } from '../contexts/TweetContext'

// async function myFunc() {

  // const tweetList = await getDocs(myCollection)
  // console.log(tweetList)
  
// } 

// myFunc()

// console.log("myCollection", tweetList)
// const firestoreIntance = getFirestore(app)
// const postCollection = collection(firestoreIntance, 'posts')
// console.log(postCollection)

export default function Feed(displayName, username, text, date, avatar) {
const [posts, setPosts] = useState(true)

const [loading, setLoading] = useState(true);
const { abba } = useContext(TweetContext)
const {currentUser, postCollection} = useAuth()
console.log("string", abba)


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


// console.log("loading" ,loading)







  return (
    <div className="feed">

      <TweetBox username={currentUser.email}/>
      
      {loading ? "" : posts.map(post =>(<Post 
      displayName= {post.username}
      text={post.text}
      date= {post.date}
      avatar={post.avatar}
       />))}
    </div>
  )
}
