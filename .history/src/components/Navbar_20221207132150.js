import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { currentUser } = useAuth()
  const [error, setError] = useState();
  // if(!useAuth()) return 
  // const {} = useAuth()
  // console.log(currentUser)

  // async function handleLogout(currentUser) {
  //   setError('')
    
  //   try {
  //     await logout()

  //   } catch {
  //     setError('Failed to log out')
  //     console.log(error)

  //   }

  }


  return (
    <div className="navbar">
        <span className="menu-items"><Link className="link-element" to="/">Home</Link></span>
        <Button variant='link'  className="link-element" to="/profile">Log Out</Button>
        <span className="menu-items"><strong>Logged in as {currentUser.email}</strong></span>
    </div>
  )
}