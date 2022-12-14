import React, { useState, useEffect, useContext } from 'react'
import { Route, Routes, Switch } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import { ApiTweetsContext } from './components/ApiTweetsContext'
import {Profile} from './views/Profile'
import fetchFromAPI from './helper/api'
import Navbar from './components/Navbar'
import Feed from './views/Feed'
import Signup from './views/Signup'
import Login from './views/Login'
import './components/right-column.css'
import './components/left-column.css'
import './components/Navbar.css'
import './App.css'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { TweetContextProvider } from './contexts/TweetContext'



function App() {
  
  
  
    return (
    <>
    <TweetContextProvider>
      <div className="app">
      {<AuthProvider>
        <Navbar className='navbar'/> 
        <div className="feed-comment_box-container">
            <Routes>
              <Route path="/login" element={
                <Login/>}>
              </Route>
              <Route path="/" element={<Feed/>}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/profile" element={<Profile/>}></Route>
            </Routes>               
        </div>
        </AuthProvider>}
      </div>
      </TweetContextProvider>
    </>
  )
}

export default App

