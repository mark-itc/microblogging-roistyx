import {React, useEffect, useState} from 'react'
import CommentBox from './CommentBox'
import Post from './Post'
import './Feed.css'
import DataBase from './DataBase';

export default function Feed() {
  const [tweetsRender, setTweetsRender] = useState('')
  

  function updateTweets(tweetsList) {
    setTweetsRender(tweetsList)
    return tweetsRender
  }

  const isFeedEmpty = () => {
      if (DataBase) return false
      else return true
    }
       
  return (
    <div className="feed">
        <CommentBox updateTweets={updateTweets}/>
        {!isFeedEmpty() ?
          DataBase().reverse().map((post) => (
              <Post
                key={post.id}
                tweetMessage={post.tweetMessage}
                date={post.date}
                username={post.username}/>))
            : "Your feed is empty :)"
        }
    </div>
  )
}
