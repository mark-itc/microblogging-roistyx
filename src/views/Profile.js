import { useState, useEffect, useReducer, useContext } from "react";
import { Form, Button, Figure, ListGroup } from "react-bootstrap";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useAuth } from "../contexts/AuthContext";
import { TweetContext } from "../contexts/TweetContext";
import app from "../firebase";
import "./Profile.css";

const storage = getStorage(app);

const ACTIONS = {
  PIC_UPLOADER: "pic_upload",
  PIC_UPDATE: "pic-update",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.PIC_UPLOADER:
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
}

export function Profile() {
  const [progress, setProgress] = useState("");
  const [state, dispatch] = useReducer(reducer);
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
        {progress > 0 ? <h3>{progress}</h3> : ""}
      </Form.Group>
    </div>
  );
}
