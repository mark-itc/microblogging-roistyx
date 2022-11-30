import {React, useEffect, useState, useContext} from 'react'
import CommentBox from './CommentBox'
import Post from '../components/Post'
import {ApiTweetsContext} from '../components/ApiTweetsContext';
import {TweetsRenderContext} from '../components/TweetsRenderContext';
import './Feed.css'
import fetchFromAPI from '../helper/api';


export default function Feed() {
  const {apiPosts, setApiPosts} = useContext(ApiTweetsContext)
  const {tweetsRender, setTweetsRender} = useContext(TweetsRenderContext)

  // useEffect(() => {
  // },[apiPosts])
  
  
  //TweetPosterContext
  useEffect(() => {
    let interval = setInterval( async () => {
      const results = await fetchFromAPI();
      setApiPosts(results)
    }, 100000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    
    <div className="feed">
      <CommentBox />  
      <Post/>
    </div>
  )
}
