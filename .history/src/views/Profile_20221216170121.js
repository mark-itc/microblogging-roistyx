import { useState, useEffect, useReducer, form, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../contexts/AuthContext";
import "./Profile.css";
import { TweetContext } from "../contexts/TweetContext";
import { Form, Button, Card, Alert } from "react-bootstrap";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  addDocs,
} from "firebase/firestore/lite";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
// import FileUploader from "react-firebase-file-uploader";
import app from "../firebase";
import { width } from "@mui/system";
import { v4 } from "uuid";

const storage = getStorage(app);

// const firestoreIntance = getFirestore(app)
// const postCollection = collection(firestoreIntance, 'posts')

const ACTIONS = {
  PIC_UPLOADER: "pic_upload",
  PIC_UPDATE: "pic-update",
};

const initialProfileState = {
  userId: "",
  userName: "",
  profilePic: "https://placekitten.com/200/287",
  uid: null
};



function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.PIC_UPLOADER:
      return {
        ...state,
        [action.key]: action.value,
      }
      case ACTIONS.PIC_UPDATE:
      return {
        ...state,
      [action.key]: action.value,
      
      }
    default:
      return state;
  }
}



export function Profile() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialProfileState);
  const { currentUser } = useAuth();
  // console.log(currentUser.uid)
  const { picUrl, setPicUrl, posts, postCollection } = useContext(TweetContext);

  console.log(posts)

  async function func(tweetObj) {
    // console.log("tweetObj",tweetObj)
    const firestoreIntance = getFirestore(app);
    const postCollection = collection(firestoreIntance, "posts");
  
    try {
      await addDoc(postCollection, tweetObj);
    } catch (e) {
      console.log("Did not add tweet", e);
    }
  }

  async function getTweetList() {
    console.log("Hello world!")
    try {
    const tweetList = posts.map((doc) => doc.data())    
      console.log("live tweetList", tweetList)

    } catch(e) {
      console.log("Get tweetes failed",e)
    }
  }


  function handleSubmit(e) {
    if (true) {
      getTweetList() 
      return}
    // console.log(state.profilePic)
    if (state.profilePic === null) {
      alert("Please choose a file first!");
    }
    const storageRef = ref(storage, `${currentUser.uid}/profile-pic}`);
    // uploadBytes(storageRef, state.profilePic).then(() =>{
    //   alert("Image uploaded")
    // })

    const uploadTask = uploadBytesResumable(storageRef, state.profilePic);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress

        setProgress(percent + "%");
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setPicUrl(url);
          // console.log(url)
          setProgress("");
        });
      }
    );
    // console.log({profilePic: state.profilePic, userId: currentUser.uid})
  }
  // console.log(picUrl)
  return (
    <>
      <Form.Group controlId="formFileDisabled" className="mb-3">
        <Form.Label>Upload profile picture</Form.Label>
        <Form.Control
          onChange={(e) =>
            [dispatch({
              type: ACTIONS.PIC_UPLOADER,
              value: e.target.files[0],
              key: "profilePic",
              userId: currentUser.uid,
            }), 
            
            dispatch({
              type: ACTIONS.PIC_UPDATE,
              userId: currentUser.uid,
            })]
          }
          type="file"
          accept="image/*"
          // disabled
        />
        <Button onClick={handleSubmit}>Upload</Button>
      </Form.Group>
      <img alt="" style={{ width: "50px" }} src={picUrl} />
      <h3>{progress}</h3>
    </>
  );
}
