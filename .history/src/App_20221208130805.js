import React, { useState, useEffect } from "react";
import { Route, Routes, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ApiTweetsContext } from "./components/ApiTweetsContext";
import { UserContext } from "./components/UserContext";
import { TweetsRenderContext } from "./components/TweetsRenderContext";
import { TweetPosterContext } from "./components/TweetPosterContext";
import fetchFromAPI from "./helper/api";
import Navbar from "./components/Navbar";
import Feed from "./views/Feed";
import Signup from "./views/Signup";
import Login from "./views/Login";
import Profile from "./views/Profile";
import "./components/right-column.css";
import "./components/left-column.css";
import "./components/Navbar.css";
import "./App.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { StaticExample } from "./components/ProfileModal";

function App() {
  const [profile, setProfile] = useState(undefined);
  const [tweetMessage, setTweetMessage] = useState("");
  const [apiPosts, setApiPosts] = useState([]);
  const [tweetsRender, setTweetsRender] = useState([]);

  //

  return (
    <>
      <div className="app">
        <StaticExample disabled={true} />
        {
          <AuthProvider>
            <Navbar className="navbar" />
            <div className="left-column"></div>
            <div className="feed-comment_box-container">
              <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
              </Routes>

              {/* <AuthProvider>
            <Navbar className='navbar'/>
              <Container className='d-flex align-item justify-content-center' style={{minHeight:'100vh'}}>
                <div className='w-100' style={{maxWidth: '400px'}}>
                  <Signup/>
                </div>
              </Container>
            </AuthProvider> */}
            </div>
          </AuthProvider>
        }
        <div className="right-column"></div>
      </div>
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
    </>
  );
}

export default App;
