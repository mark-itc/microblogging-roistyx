import {React, useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import {format } from 'date-fns'
import Button from '@mui/material/Button';
import './CommentBox.css'

export default function CommentBox(fetchFromAPI) {
  const [tweetMessage, setTweetMessage] = useState("");
  const username = "Roie A."
  const date = format(new Date(), 'yyyy-MM-dd')+format(new Date(), 'HH:mm:ss.ms')+"Z"
  const tweetMessageLength = tweetMessage.length
  // console.log(date)
  
  function setIsLoading(bol){
    if(bol) {
      return "Loading..."
    }
  }

function disableWtweet(bol) {
  return bol
}
 
const sendTweetToApi = async (tweetMessage) => {
  setIsLoading(true)
  disableWtweet(true)
  try {
    fetch('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet',{
    method: 'POST',
    headers: {
        'content-Type': 'application/json',
    },
    body : JSON.stringify({
        content : tweetMessage,
        userName : 'Vasco da Gama',
        date : '0000-00-00T00:00:00.00Z',   
    })})
    setIsLoading(false)
    disableWtweet(false)
  } catch(error) {
    alert("Your tweet didn't send",error);
  }
}

  const sendMessage= (e) => {
    e.preventDefault();
    if (tweetMessage === "" || tweetMessageLength >= 140)   
    setTweetMessage({
      tweetMessage: tweetMessage, 
      key: uuidv4(), 
      date: date, 
      username: username 
    })
    sendTweetToApi(tweetMessage)
    return   
  }

  return (
    <div className='comment-box'>
     
      <form>
        <div className='comment-box_input'>
          <input onChange={(event) => setTweetMessage(event.target.value)} placeholder="What do you have in mind..." value={tweetMessage} type="text"/>
        </div>
        <div className="bottom-comment-box">
          {tweetMessageLength >= 140 ? <div className="length-error" >The tweet can't contain more then 140 chars.</div> : ""}
        <Button disabled={tweetMessageLength >= 140 ? disableWtweet(true) : false} variant="contained" className='comment-box_input-Button' type='submit' onClick={sendMessage}>
            Tweet
        </Button>
        {setIsLoading("")}
        </div>
        
      </form>
    </div>
  )
}
