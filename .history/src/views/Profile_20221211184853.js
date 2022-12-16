// import React, { useContext } from 'react';
// import { useNavigate } from "react-router-dom";

// import Button from '@mui/material/Button';
// import '../components/Button.css'
// import './Profile.css'

// function Profile() {
//     const {profile, setProfile} = useContext(UserContext)
//     const navigate = useNavigate();

//     function usernameCreated() {

//       if (profile) {
//         navigate("/");
//       }
//     }

//     const submitProfileName= (e) => {
//         e.preventDefault();
//         if (profile === "") alert("Enter text")
//         localStorage.setItem("PROFILE_NAME", profile)
//         usernameCreated()
//         return profile
//     }
//     return (
//       <div className="profile">
//         <h1>Profile</h1>
//         <form>
//           <div className='profile-box_input'>
//             <input onChange={(event) => setProfile(event.target.value)} placeholder="Your name" value={profile} type="text"/>
//               <Button
//               className='profile-box_input-Button'
//               type='submit' onClick={submitProfileName}>
//               Save
//             </Button>
//           </div>
//       </form>
//     </div>
//     )
// }

// export default Profile;
