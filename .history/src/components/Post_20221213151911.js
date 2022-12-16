import React, { useContext, useEffect, useState } from "react";
import { ApiTweetsContext } from "../components/ApiTweetsContext";
import { TweetsRenderContext } from "../components/TweetsRenderContext";
import { TweetPosterContext } from "../components/TweetPosterContext";
import Avatar from "@mui/material/Avatar";
import { v4 as uuidv4 } from "uuid";
import "./Post.css";
import { collection, doc, setDoc } from "firebase/firestore";

export default function Post({
  displayName,
  username,
  text,
  date,
  avatar,
  key,
}) {
  const [posts, setPost] = useState([]);
  // const {apiPosts} = useContext(ApiTweetsContext)
  // const { setTweetMessage} = useContext(TweetPosterContext)
  // const {tweetsRender} = useContext(TweetsRenderContext)

  // useEffect(() => {
  //   const {content, userName, date} = tweetsRender
  //   apiPosts.unshift({content, userName, date})
  //   setTweetMessage('')
  // },[tweetsRender])

  return (
    <div key={key} className="post">
      <Avatar src={avatar}></Avatar>
      <div className="header">
        <div className="username">{displayName}</div>
        <div className="date">{date}</div>
      </div>
      <div className="post-body">{text}</div>
    </div>
  );
}
