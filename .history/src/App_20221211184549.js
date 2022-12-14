import React, { useState, useEffect, useContext } from 'react'
import { Route, Routes, Switch } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import { ApiTweetsContext } from './components/ApiTweetsContext'
import { UserContext } from './components/UserContext'
import { TweetsRenderContext } from './components/TweetsRenderContext'
import { TweetPosterContext } from './components/TweetPosterContext'
import fetchFromAPI from './helper/api'
import Navbar from './components/Navbar'
import Feed from './views/Feed'
import Signup from './views/Signup'
import Login from './views/Login'
import Profile from './views/Profile'
import './components/right-column.css'
import './components/left-column.css'
import './components/Navbar.css'
import './App.css'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import {StaticExample} from './components/ProfileModal'
import { TweetProvider,  } from '../contexts/TweetContext'


function App() {

  const {string} =useContext(TweetProvider)
  
    return (
    <>
      <div className="app">
      {<AuthProvider>
        <Navbar className='navbar'/> 
        <div className="left-column"></div>
        <div className="feed-comment_box-container">
            <Routes>
              <Route path="/login" element={
                 <Login/>}>
              </Route>
              <Route path="/" element={
                 <Feed/>}>
              </Route>
              <Route path="/signup" element={<Signup />}></Route>
            </Routes>            
            
        </div>
        </AuthProvider>}
        <div className="right-column"></div>
      </div>
    </>
  )
}

export default App

{/* <TweetProvider>
              <Routes>
                <Route path="/login" element={
                  <Login/>}>
                </Route>
                <Route path="/" element={
                  <Feed/>}>
                </Route>
                <Route path="/signup" element={<Signup />}></Route>
              </Routes> 
            </TweetProvider> */}