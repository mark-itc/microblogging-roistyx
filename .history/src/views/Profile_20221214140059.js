import {useState, useEffec, useReducer} from 'react'
import Modal from 'react-bootstrap/Modal';
import { useAuth } from '../contexts/AuthContext'
import './Profile.css'
import {useTweetContext } from '../contexts/TweetContext'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import { width } from '@mui/system';

const storage = getStorage(app);
// console.log(storage)

const ACTIONS = {
  UPDATE_PIC: 'upload-pic',
}

const initialProfileState = {
  userId: "",
  userName: "",
  profilePic: "https://placekitten.com/200/287"

}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_PIC:
      return { 
        ...state,
        [action.key]: action.value
       }
    default:
      return state
    }
  }

  

export function Profile() {
  const [show, setShow] = useState(false)
  const [progress, setProgress] = useState(0)
  const [picUrl, setPicUrl] = useState(null)
  const [state, dispatch] = useReducer(reducer, initialProfileState)
  const { currentUser } = useAuth()
  // console.log(currentUser.uid)
  const {posts} = useTweetContext()
  

  async function handleSubmit(e) {
    if (state.profilePic === initialProfileState.profilePic) {
          alert("Please choose a file first!")
        }
      const storageRef = firebase.storage().ref(`/${currentUser.uid}/${state.profilePic}`);
      const  fileUrl = await storageRef.getDownloadURL();
      console.log(fileUrl)

    //   const storageRef = ref(storage, `/${currentUser.uid}/${state.profilePic}`)
    
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
      // }
    // );
    // console.log({profilePic: state.profilePic, userId: currentUser.uid})
  }
  console.log(picUrl)
  return (
    <>
      <Form.Group controlId="formFileDisabled" className="mb-3">
        <Form.Label>Upload profile picture</Form.Label>
        <Form.Control onChange={(e)=> dispatch({
          type: ACTIONS.UPDATE_PIC,
          value: e.target.value,
          key: "profilePic",
          userId: currentUser.uid
        })} type="file" accept="image/*" 
        // disabled 
        />
        <Button onClick={(handleSubmit)}>Upload</Button>
      </Form.Group>
      <img alt="" style={{width: "50px"}} src={picUrl}/>
      <h3>{progress}%</h3>
    </>
  );
}

