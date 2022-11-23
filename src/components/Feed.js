import {React, useEffect, useState} from 'react'
import CommentBox from './CommentBox'
import FlipMove from "react-flip-move";
import Post from './Post'
import './Feed.css'
// import dataBase from './dataBase';

export default function Feed() {
  const db = JSON.parse(localStorage.getItem("myITCtweetApp"))
  const isFeedEmpty = () => {
      if (db) return false
      else return true
    }
       
  return (
    <div className="feed">
        <CommentBox/>
        {!isFeedEmpty() ?
          db.reverse().map((post) => (
              <Post
                key={post.id}
                tweetMessage={post.tweetMessage}
                date={post.date}
                username={post.username}/>))
            : "Your feed is empty :)"
        }
    </div>
  )
}
