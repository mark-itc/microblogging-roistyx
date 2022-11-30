import {React, useState, useEffect, useContext} from 'react'
import {TweetPosterContext} from '../components/TweetPosterContext';
import {ApiTweetsContext} from '../components/ApiTweetsContext';
import {TweetsRenderContext} from '../components/TweetsRenderContext';
import {format } from 'date-fns'
import Button from '@mui/material/Button';
import './CommentBox.css'

export default function CommentBox() {
  const {tweetMessage, setTweetMessage} = useContext(TweetPosterContext)
  const {apiPosts, setApiPosts} = useContext(ApiTweetsContext)
  const {tweetsRender, setTweetsRender} = useContext(TweetsRenderContext)
  const [loading, setLoading] = useState(false);
  const date = format(new Date(), 'yyyy-MM-dd')+'T'+format(new Date(), 'HH:mm:ss.ms')+"Z"
  const tweetMessageLength = tweetMessage.length
  const profileName = localStorage.getItem("PROFILE_NAME")
 
   function sendTweet() {
    fetch('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet',{
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify({
        content : tweetMessage,
        userName : profileName,
        date : date,   
    })}).then(response => {
      return response.json()
    })
  }

  const sendMessage= (e) => {
    // console.log(e.value)
    e.preventDefault();
    if (tweetMessage === "") return 
    setLoading(true)
    setTweetsRender({
      content: tweetMessage, 
      userName: profileName,
      date: date,   
    })
    sendTweet()
    setLoading(false)
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
