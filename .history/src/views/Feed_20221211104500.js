import { React, useEffect, useContext, useState } from 'react'
import { ApiTweetsContext } from '../components/ApiTweetsContext'
import app from '../firebase'
import Post from '../components/Post'
import TweetBox from './TweetBox'
import './Feed.css'


export default function Feed(displayName, username, text, date, avatar) {
const [posts, setPosts] = useState(true)

//   const {setApiPosts} = useContext(ApiTweetsContext)
//   useEffect(() => {
//     let fetchTweetList =  async () => {
//       const results = await fetchFromAPI()
//       setApiPosts(results)
//     }
//     fetchTweetList()
//   }, [])
  
//   useEffect(() => {
//     let interval = setInterval( async () => {
//       const results = await fetchFromAPI()
//       setApiPosts(results)
//     }, 10000)
//     return () => {
//       clearInterval(interval)
//     }
//   })

useEffect(() => {
  app.collection('posts').onSnapshot((snapshot => setPosts(snapshot.docs.map(doc => doc.date()))))
console.log(posts)

},[text])

  return (
    <div className="feed">
      {/* <CommentBox/>   */}
      <TweetBox/>

      <Post displayName="Roie" username="r_ie"
      text="HELLO WORLD!"
      date="2002"
      avatar="https://placekitten.com/200/287" />
    </div>
  )
}
