import './App.css';
import './components/Navbar.css';
import './components/left-column.css';
import './components/right-column.css';
import Feed from './views/Feed';
import Profile from './views/Profile';
import Navbar from './components/Navbar';
import {UserContext} from './components/UserContext';
import {TweetPosterContext} from './components/TweetPosterContext';
import {ApiTweetsContext} from './components/ApiTweetsContext';
import {TweetsRenderContext} from './components/TweetsRenderContext'
import React, {useState, useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import fetchFromAPI from './helper/api';




function App() {
  const [ profile, setProfile ] = useState("")
  const [tweetMessage, setTweetMessage] = useState("");
  const [apiPosts, setApiPosts] = useState([])
  const [tweetsRender, setTweetsRender] = useState('')
  
  useEffect(() => {
    let fetchTweetList =  async () => {
      const results = await fetchFromAPI();
      setApiPosts(results)
      
    };
    fetchTweetList()
  }, []);
  
 
  return (
    <>
      <div className="app">
        <Navbar className='navbar'/>
        <div className="left-column"></div>
        <div className="feed-comment_box-container">
        <ApiTweetsContext.Provider value={{apiPosts, setApiPosts}}>
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
          </ApiTweetsContext.Provider>
        </div>
        <div className="right-column"></div>
      </div>
    
    </>
  );
}

export default App;
