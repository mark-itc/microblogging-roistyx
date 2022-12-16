import { React, useEffect, useContext } from "react";
import { ApiTweetsContext } from "../components/ApiTweetsContext";
import fetchFromAPI from "../helper/api";
import Post from "../components/Post";
import CommentBox from "./CommentBox";
import "./Feed.css";

export default function Feed(displayName, username, text, date, avatar) {
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

  return (
    <div className="feed">
      {/* <CommentBox/>   */}
      <Post
        displayName="Roie"
        username="r_ie"
        text="HELLO WORLD!"
        date="2002"
        avatar="https://placekitten.com/200/287"
      />
    </div>
  );
}
