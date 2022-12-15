import { React, useContext, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
// import { TweetPosterContext } from '../components/TweetPosterContext'
import { format } from 'date-fns'
import Button from '@mui/material/Button'
import './TweetBox.css'
import app from '../firebase';
import {getFirestore, collection, getDocs, doc, addDocs, onSnapshot, addDoc} from 'firebase/firestore/lite'
import { useAuth } from '../contexts/AuthContext'
import { TweetContext, ACTIONS } from '../contexts/TweetContext'



export default function TweetBox() {
const {currentUser,} = useAuth()
const {tweetMessage, setTweetMessage, sendUserTweet, tweets, dispatch} = useContext(TweetContext)

// console.log("tweetMessage", tweetMessage)
  const navigate = useNavigate()

  function addTweet(e) {
    e.preventDefault();
    // console.log("addTweet")
    // dispatch({ type: ACTIONS.ADD_TWEET, payload: {name: "Hello world!"}})
  }
  


  const sendMessage= (e) => {
    e.preventDefault();
    if (currentUser.email === null) {
      // redirectUser()
    }
    if (!tweetMessage ) alert("Add tweet")
    
    if (!tweetMessage ) return 
    if (currentUser.email === null) return
    return sendUserTweet(tweetMessage)
  }
//   console.log(tweetMessage)
    // console.log("username, date", username, date)
  return (
    <div className='comment-box'>
    <form>
    
      <div className='comment-box_input'>
        <input onChange={(event) => setTweetMessage(event.target.value)} placeholder="What do you have in mind..." value={tweetMessage} type="text"/>
      </div>
      <div className="bottom-comment-box">
        {tweetMessage.length >= 140 ? 
        <div className="length-error" >
          The tweet can't contain more then 140 chars.
        </div> : ""}
        <button onClick={addTweet}>Do something</button>
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
  )
}
