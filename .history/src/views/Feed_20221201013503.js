import { React, useEffect, useContext } from 'react'
import { ApiTweetsContext } from '../components/ApiTweetsContext'
import fetchFromAPI from '../helper/api'
import Post from '../components/Post'
import CommentBox from './CommentBox'
import './Feed.css'


export default function Feed() {
  const {setApiPosts} = useContext(ApiTweetsContext)
  useEffect(() => {
    let fetchTweetList =  async () => {
      const results = await fetchFromAPI()
      setApiPosts(results)
    }
    fetchTweetList()
  }, [])
  
  useEffect(() => {
    let interval = setInterval( async () => {
      const results = await fetchFromAPI()
      setApiPosts(results)
    }, 10000)
    return () => {
      clearInterval(interval)
    }
  })

  return (
    <div className="feed">
      <CommentBox />  
      <Post/>
    </div>
  )
}
