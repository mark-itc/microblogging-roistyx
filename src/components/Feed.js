import {React, useEffect, useState} from 'react'
import CommentBox from './CommentBox'
import getApi from '../helper/getApi'
import Post from './Post'
import './Feed.css'

export default function Feed() {
  const [apiPosts, setApiPosts] = useState([])
  
  async function fetchFromAPI() {
    
    try {
      const response = await fetch('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet');
       const results = await response.json();
       const posts = results.tweets
       
      return setApiPosts(posts)
  
    } catch (e) {
      alert(e);
    }  
  }


useEffect(()=>{
  fetchFromAPI()
  
},[])

      
  return (
    
    <div className="feed">
     
        <CommentBox fetchFromAPI={fetchFromAPI()}/>
        {apiPosts.map((post)=>  
          <Post
            tweetMessage={post.content}
            date={post.date}
            username={post.userName}/>
        )}
    </div>
  )
}
