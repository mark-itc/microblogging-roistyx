import {React, useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import {format } from 'date-fns'
import Button from '@mui/material/Button';
import dataBase from './dataBase';
import './CommentBox.css'

export default function CommentBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetsList, setTweetsList] = useState("");
  const username = "Roie A."
  const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss.ms')
  const tweetMessageLength = tweetMessage.length
 
  useEffect(() => {
    const storedTweets = JSON.parse(localStorage.getItem("myITCtweetApp"))
    if (storedTweets) setTweetsList(storedTweets)
  },[])

  useEffect(() => { 
    if (tweetsList !== "" )
    dataBase("myITCtweetApp", JSON.stringify(tweetsList))
    },[tweetsList])

  const sendMessage= (e) => {
    // e.preventDefault();
    if (tweetMessage === "" || tweetMessageLength >= 140) return  
    setTweetsList(prevTweetMessages => {
      return ([...prevTweetMessages,{
        tweetMessage: tweetMessage, 
        key: uuidv4(), 
        date: date, 
        username: username 
      }]) 
    })
  }

  return (
    <div className='comment-box'>
      <form>
        <div className='comment-box_input'>
          <input onChange={(event) => setTweetMessage(event.target.value)} placeholder="What do you have in mind..." value={tweetMessage} type="text"/>
        </div>
        <div className="bottom-comment-box">
          {tweetMessageLength >= 140 ? <div className="length-error" >The tweet can't contain more then 140 chars.</div> : ""}
        <Button disabled={tweetMessageLength >= 140 ? true : false} variant="contained" className='comment-box_input-Button' type='submit' onClick={sendMessage}>
            Tweet
        </Button>
        </div>
        
      </form>
    </div>
  )
}
