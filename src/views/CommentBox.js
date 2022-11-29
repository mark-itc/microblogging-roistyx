import {React, useState, useEffect} from 'react'
import {format } from 'date-fns'
import Button from '@mui/material/Button';
import './CommentBox.css'

export default function CommentBox({ callTweetsUpdater}) {
  const [tweetMessage, setTweetMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const date = format(new Date(), 'yyyy-MM-dd')+'T'+format(new Date(), 'HH:mm:ss.ms')+"Z"
  const tweetMessageLength = tweetMessage.length
  const profileName = localStorage.getItem("PROFILE_NAME")
  
  useEffect(() => {
    callTweetsUpdater()
     })
 console.log(profileName)
   function sendTweet(arg) {
    fetch('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet',{
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body : JSON.stringify({
        content : arg,
        userName : profileName,
        date : date,   
    })}).then(response => {
      return response.json()
    })
  }

  const sendMessage= (e) => {
    e.preventDefault();
    if (tweetMessage === "") alert("Enter text")
    setLoading(true)
    sendTweet(tweetMessage) 
    setLoading(false)
    setTimeout(function() {
      callTweetsUpdater(true)
    }, 1000)
    return
  }
  return (
    <div className='comment-box'>
      {loading ? <h1>Loading...</h1> : ""}
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
