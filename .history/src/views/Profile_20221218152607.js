import { useState, useEffect, useReducer, form, useContext } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./Profile.css";
import { TweetContext } from "../contexts/TweetContext";
import { Form, Button, Figure, ListGroup } from "react-bootstrap";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
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
  const [progress, setProgress] = useState("");
  const [state, dispatch] = useReducer(reducer, initialProfileState);
  const { currentUser } = useAuth();
  const { userUrl, getProfilePic } = useContext(TweetContext);

  useEffect(() => {
    getProfilePic();
  });

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
      (err) => console.log(err)
    );
    setProgress("");
  }

  return (
    <div className="profile">
      {currentUser ? (
        <ListGroup>
          <ListGroup.Item>
            <Figure.Image
              className="m-3"
              width={250}
              alt="Profile Picture"
              src={userUrl}
            />
          </ListGroup.Item>
          <ListGroup.Item>Your email: {currentUser.email}</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        </ListGroup>
      ) : (
        "No user logged in"
      )}
      <Form.Group className="mt-4">
        <Form.Label className="">Upload profile picture</Form.Label>
        <Form.Control
          className="mb-3"
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
        <Button className="mb-3" onClick={handleSubmit}>
          Upload
        </Button>
        {progress ? <h3>{progress}</h3> : ""}
      </Form.Group>
    </div>
  );
}
