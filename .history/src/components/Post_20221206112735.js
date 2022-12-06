import React, { useContext, useEffect } from 'react'
import { ApiTweetsContext } from '../components/ApiTweetsContext';
import { TweetsRenderContext } from '../components/TweetsRenderContext';
import { TweetPosterContext } from '../components/TweetPosterContext';
import { v4 as uuidv4 } from 'uuid';
import './Post.css'


export default function Post() {
  const {apiPosts} = useContext(ApiTweetsContext)
  const { setTweetMessage} = useContext(TweetPosterContext)
  const {tweetsRender} = useContext(TweetsRenderContext)
  
  useEffect(() => {
    const {content, userName, date} = tweetsRender
    apiPosts.unshift({content, userName, date})
    setTweetMessage('')
  },[tweetsRender])
        
  return apiPosts.map(
      (post)=>
      <div key={uuidv4()} className='post'>
        <div className='header'> 
          <div className='username'>{post.userName}</div>
          <div className='date'>{post.date}</div>
        </div>
        <div className='post-body'>{post.content}</div>
      </div>
    ) 
  }