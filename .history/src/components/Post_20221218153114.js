import React from "react";

import Avatar from "@mui/material/Avatar";
import { v4 } from "uuid";
import "./Post.css";

export default function Post({ displayName, text, date, avatar }) {
  return (
    <div key={v4()} className="post">
      <Avatar src={avatar}></Avatar>
      <div className="header">
        <div className="username">{displayName}</div>
        <div className="date">{date}</div>
      </div>
      <div className="post-body">{text}</div>
    </div>
  );
}
