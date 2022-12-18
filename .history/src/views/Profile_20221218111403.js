import { useState, useEffect, useReducer, form, useContext } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./Profile.css";
import { TweetContext } from "../contexts/TweetContext";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import app from "../firebase";

const storage = getStorage(app);

const ACTIONS = {
  PIC_UPLOADER: "pic_upload",
  PIC_UPDATE: "pic-update",
};

const initialProfileState = {
  userId: "",
  userName: "",
  profilePic: "https://placekitten.com/200/287",
  uid: null,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.PIC_UPLOADER:
      return {
        ...state,
        [action.key]: action.value,
      };
    case ACTIONS.PIC_UPDATE:
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
}

export function Profile() {
  const [picUpdate, setPicUpdate] = useState([]);
  const [progress, setProgress] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialProfileState);
  const { currentUser } = useAuth();
  const { picUrl, setPicUrl } = useContext(TweetContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (state.profilePic === null) {
      alert("Please choose a file first!");
    }
    const storageRef = ref(storage, `/${currentUser.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, state.profilePic);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(percent + "%");
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("url", url);
          setProgress("");
        });
      }
    );
  }
  //  console.log("newCurrentUser",newCurrentUser)
  return (
    <div className="profile">
      {currentUser ? (
        <div>
          <img alt="" style={{ width: "50px" }} src={picUrl} />
          <p>
            {currentUser.uid}, {currentUser.email}
          </p>
        </div>
      ) : (
        "No user logged in"
      )}
      <Form.Group className="mb-3">
        <Form.Label>Upload profile picture</Form.Label>
        <Form.Control
          onChange={(e) =>
            dispatch({
              type: ACTIONS.PIC_UPLOADER,
              value: e.target.files[0],
              key: "profilePic",
              userId: currentUser.uid,
            })
          }
          type="file"
          accept="image/*"
        />
        <Button onClick={handleSubmit}>Upload</Button>
      </Form.Group>
      <Spinner animation="border" />

      {progress ? <Spinner animation="border" /> : ""}
    </div>
  );
}
