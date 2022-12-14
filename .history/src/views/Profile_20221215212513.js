import { useState, useEffect, useReducer, form, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../contexts/AuthContext";
import "./Profile.css";
import { TweetContext } from "../contexts/TweetContext";
import { Form, Button, Card, Alert } from "react-bootstrap";
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

const firestoreIntance = getFirestore(app);
const postCollection = collection(firestoreIntance, "posts");

const ACTIONS = {
  UPDATE_PIC: "upload-pic",
};

const initialProfileState = {
  userId: "",
  userName: "",
  profilePic: "https://placekitten.com/200/287",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_PIC:
      return {
        ...state,
        [action.key]: action.value,
      };
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
  const { picUrl, setPicUrl } = useContext(TweetContext);

  useEffect(() => {
    postCollection.database().update({
      avatar: "Jane",
    });
  });

  function handleSubmit(e) {
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
            dispatch({
              type: ACTIONS.UPDATE_PIC,
              value: e.target.files[0],
              key: "profilePic",
              userId: currentUser.uid,
            })
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
