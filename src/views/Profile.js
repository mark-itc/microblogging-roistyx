import React, { useState, useContext } from 'react';
import { UserContext } from '../components/UserContext'
// import Button from '../components/Button';
// import TextInput from '../components/TextInput'
// import Button from '../components/Button'
import Button from '@mui/material/Button';
import '../components/Button.css'
import './Profile.css'

function Profile() {
    // const [ profile, setProfile ] = useState("")
    const {profile, setProfile} = useContext(UserContext)

    const submitProfileName= (e) => {
        e.preventDefault();
        if (profile === "") alert("Enter text")
        localStorage.setItem("PROFILE_NAME", profile)
        return
    }

    // localStorage.setItem(LocalKey, localtweetsList)
  // console.log(JSON.parse(localStorage.getItem("myITCtweetApp")))
//   const db = JSON.parse(localStorage.getItem("myITCtweetApp"))

    return (
        <div className="profile"> 
            <h1>Profile</h1>   
            <form>
        <div className='profile-box_input'>
          <input onChange={(event) => setProfile(event.target.value)} placeholder="Your name" value={profile} type="text"/>
          <Button 
            className='profile-box_input-Button' 
            type='submit' onClick={submitProfileName}>
            Save
        </Button>
        </div>
        <div className="button-container">
          {/* {tweetMessageLength >= 140 ? <div className="length-error" >The tweet can't contain more then 140 chars.</div> : ""} */}
        
        </div>
      </form>
            </div>
       
    )
}

export default Profile;