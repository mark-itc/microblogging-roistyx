import { React, useEffect, useContext } from 'react'
import { ApiTweetsContext } from '../components/ApiTweetsContext'
import fetchFromAPI from '../helper/api'
import Post from '../components/Post'
import CommentBox from './CommentBox'
import './Feed.css'


export default function Feed() {
  const { setApiPosts } = useContext(ApiTweetsContext)
  
  useEffect(() => {
    let interval = setInterval( async () => {
      const results = await fetchFromAPI()
      setApiPosts(results)
    }, 100000)
    return () => {
      clearInterval(interval)
    }
  })

  return (
    <div className="feed">
      <CommentBox />  
      <Post/>
      {setApiPosts.content=== undefined ? <h1 style={{color: "white"}}>Loading...</h1> : ""}
      
    </div>
  )
}
