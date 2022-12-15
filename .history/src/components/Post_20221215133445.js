import React, { useContext, useEffect, useState } from 'react'
import { ApiTweetsContext } from '../components/ApiTweetsContext';
import { TweetsRenderContext } from '../components/TweetsRenderContext';
import { TweetPosterContext } from '../components/TweetPosterContext';
import Avatar from '@mui/material/Avatar';
import { v4 } from 'uuid'
import './Post.css'
import { collection, doc, setDoc } from "firebase/firestore"; 
import { TweetContext } from '../contexts/TweetContext'



export default function Post({
  displayName, 
  username, 
  text, 
  date, 
  avatar
}) {
  const [posts, setPost] = useState([]);
  // const {apiPosts} = useContext(ApiTweetsContext)
  const { picUrl} = useContext(TweetContext)
  
  console.log("",picUrl)
        
  return (
    
  <div key={v4()} className='post'>
    <Avatar  src={avatar}></Avatar>
    <div className='header'> 
      <div className='username'>{displayName}</div>
      <div className='date'>{date}</div>
    </div>
     <div className='post-body'>{text}</div>
  </div>
  )
      
  
  }