import {React, useEffect, useState} from 'react'
import CommentBox from './CommentBox'
import getApi from '../helper/getApi'
import Post from './Post'
import './Feed.css'

export default function Feed() {
  const [apiPosts, setApiPosts] = useState([])
  // console.log(apiPosts)

  const fetchFromAPI = async () => {

    const results = await getApi();
    if (results) {
      const posts = results.tweets
      setApiPosts(posts);
    } else {
        alert(results.message)
    }
    // console.log(results)
}

useEffect(()=>{
  fetchFromAPI()
  
},[])

  // console.log(apiPosts)
      
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
