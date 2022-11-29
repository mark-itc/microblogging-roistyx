import {React, useEffect, useState} from 'react'
import CommentBox from './CommentBox'
import Post from '../components/Post'
import './Feed.css'
import fetchFromAPI from '../helper/api';
import { v4 as uuidv4 } from 'uuid';

export default function Feed() {
  const [apiPosts, setApiPosts] = useState([])
  const [updater, setUpdater] = useState(true)
  
  const tweetsUpdater = async () => {
    const results = await fetchFromAPI();
     setApiPosts(results)
     return 
  }

  useEffect(() => {
    setUpdater(updater)
  },[])

  useEffect(() => {
    tweetsUpdater()
     },[updater])
  
     function callTweetsUpdater(arg) {
    setUpdater(arg)
  }

  return (
    
    <div className="feed">
      <CommentBox callTweetsUpdater={callTweetsUpdater}/>
      {apiPosts.map((post)=>  
        <Post
          key={uuidv4}
          tweetMessage={post.content}
          date={post.date}
          username={post.userName}/>
      )}
    </div>
  )
}
