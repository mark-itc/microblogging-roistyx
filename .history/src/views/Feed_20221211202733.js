import { React, useEffect, useContext, useState } from 'react'
import { ApiTweetsContext } from '../components/ApiTweetsContext'
import Post from '../components/Post'
import TweetBox from './TweetBox'
import './Feed.css'
import app from '../firebase';
import {getFirestore, collection, getDocs, doc, addDocs, addDoc} from 'firebase/firestore/lite'
import { onSnapshot } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext'
import { TweetContext } from '../contexts/TweetContext'
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button'
import './TweetBox.css'



export default function Feed(displayName, username, text, date, avatar) {
const [posts, setPosts] = useState(true)
const [loading, setLoading] = useState(true);
const [tweetMessage, setTweetMessage] = useState([])
const {currentUser, postCollection} = useAuth()

useEffect(() => {
 
  async function getTweetList() {
    const {docs} = await getDocs(postCollection)
    setLoading(false)
    const tweetList = docs.map(doc => doc.data())
    setPosts(tweetList)
  }
  getTweetList() 
},[])
console.log(date)


async function sendUserTweet() {
  const tweetObj = {avatar:
      "https://placekitten.com/200/287",
      date: date,
      text: tweetMessage,
      username: username}
      try {
        await addDoc(postCollection, tweetObj)
      } catch(e) {
        console.log("Did not add tweet",e)
      }
  }


const sendMessage= (e) => {
  e.preventDefault();
  // if (username === null) {
  //   redirectUser()
  // }
  // if (!tweetMessage ) alert("Add tweet")
  
  // if (!tweetMessage ) return 
  // if (username === null) return
  console.log(tweetMessage)
  return sendUserTweet(tweetMessage)
}

  return (
    <>
    <div className='comment-box'>
      {/* {tweetMessage ? <h1>Redirect</h1> : ""}  */}
      <form>
      <div className='comment-box_input'>
        <input onChange={(event) => setTweetMessage(event.target.value)} placeholder="What do you have in mind..." value={tweetMessage} type="text"/>
      </div>
      <div className="bottom-comment-box">
        {tweetMessage.length >= 140 ? 
        <div className="length-error" >
          The tweet can't contain more then 140 chars.
        </div> : ""}
        <Button 
        // disabled={tweetMessage.length >= 140 ?
        //   true : false} 
          className='comment-box_input-Button' variant="contained" type='submit' 
          onClick={sendMessage}>
            Tweet
        </Button>
      </div>
    </form>
    </div>
    <div className="feed">

      {/* <TweetBox  username={currentUser.email}/> */}
      {loading ? "" : posts.map(post =>(<Post 
      displayName= {post.username}
      text={post.text}
      date= {post.date}
      avatar={post.avatar}
       />))}
    </div>
    </>
  )
}
