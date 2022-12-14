import {useState, useEffec, useReducer, form} from 'react'
import Modal from 'react-bootstrap/Modal';
import { useAuth } from '../contexts/AuthContext'
import './Profile.css'
import {useTweetContext } from '../contexts/TweetContext'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
// import FileUploader from "react-firebase-file-uploader";
import app from '../firebase';
import { width } from '@mui/system';
import { v4 } from 'uuid'


const storage = getStorage(app);


export function Profile() {
  const [show, setShow] = useState(false)
  const [progress, setProgress] = useState(0)
  const [picUrl, setPicUrl] = useState(null)
  const [profileUpload, setProfileUpload] = useState(null)
 
  const { currentUser } = useAuth()
  // console.log(currentUser.uid)
  const {posts} = useTweetContext()
  

  function handleSubmit(e) {
    if (profileUpload === null) {
          alert("Please choose a file first!")
        }

    fetch(`/${currentUser.uid}`)
  .then(response => {
    return console.log(response.blob());
  })
  
    //   const storageRef = ref(storage, `/${currentUser.uid}/${profileUpload}`)
    //   uploadBytes(storageRef, profileUpload).then(() =>{
    //     alert("Image uploaded")
    //   })
    
    // const uploadTask = uploadBytesResumable(storageRef, state.profilePic)
    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const percent = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     ); // update progress
    
    //     setProgress(percent);
    //   },
    //   (err) => console.log(err),
    //   () => {
    //     // download url
    //     getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //       setPicUrl(url)
    //      console.log(url)
    //     });
    //   }
    // );
    // console.log({profilePic: state.profilePic, userId: currentUser.uid})
  }
//   console.log(picUrl)
  return (
    <>
      <form  >
        <label>Upload profile picture</label>
        <input onChange={
          (e)=> {setProfileUpload(e.target.value)}} 
        type="file" accept="image/*" 
        // disabled 
        />
        <Button onClick={(handleSubmit)}>Upload</Button>
      </form>
      <img alt="" style={{width: "50px"}} src={picUrl}/>
      <h3>{progress}%</h3>
    </>
  );
}

