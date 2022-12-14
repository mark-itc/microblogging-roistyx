import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ApiTweetsContext } from "./components/ApiTweetsContext";
import { UserContext } from "./components/UserContext";
import { TweetsRenderContext } from "./components/TweetsRenderContext";
import { TweetPosterContext } from "./components/TweetPosterContext";
import fetchFromAPI from "./helper/api";
import Navbar from "./components/Navbar";
import Feed from "./views/Feed";
import Signup from "./views/Signup";
import Profile from "./views/Profile";
import "./components/right-column.css";
import "./components/left-column.css";
import "./components/Navbar.css";
import "./App.css";

function App() {
  const [profile, setProfile] = useState(undefined);
  const [tweetMessage, setTweetMessage] = useState("");
  const [apiPosts, setApiPosts] = useState([]);
  const [tweetsRender, setTweetsRender] = useState([]);

  return (
    <>
      <div className="app">
        <Navbar className="navbar" />

        <div className="left-column"></div>
        <div className="feed-comment_box-container">
          {/* <ApiTweetsContext.Provider value={{apiPosts, setApiPosts}}>
          <TweetsRenderContext.Provider value={{tweetsRender, setTweetsRender}}>
          <UserContext.Provider value={{profile, setProfile}}>
          <TweetPosterContext.Provider value={{tweetMessage, setTweetMessage}}>
            <Routes>
              <Route path="/" element={<Feed/>}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              </Routes>
          </TweetPosterContext.Provider>
          </UserContext.Provider>
          </TweetsRenderContext.Provider>
          </ApiTweetsContext.Provider> */}
          <Signup />
        </div>
        <div className="right-column"></div>
      </div>
    </>
  );
}

export default App;
