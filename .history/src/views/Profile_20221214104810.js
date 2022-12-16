import { useState, useEffec, useReducer } from "react";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../contexts/AuthContext";
import "./Profile.css";
import { useTweetContext } from "../contexts/TweetContext";
import { Form, Button, Card, Alert } from "react-bootstrap";

const ACTIONS = {
  UPLOAD_PIC: "upload-pic",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPLOAD_PIC:
      return { count: state.count + 1 };
    default:
      return state;
  }
}

const defaultPic = "https://placekitten.com/200/287";

export function Profile() {
  const [show, setShow] = useState(false);
  const [state, dispatch] = useReducer(reducer, { profilePic: defaultPic });
  const { currentUser } = useAuth();
  // console.log(currentUser.uid)
  const { posts } = useTweetContext();

  async function handlePicSubmit(e) {
    dispatch({ type: ACTIONS.UPLOAD_PIC });
  }

  return (
    <>
      <Form.Group controlId="formFileDisabled" className="mb-3">
        <Form.Label>Upload profile picture</Form.Label>
        <Form.Control
          type="file"
          // disabled
        />
        <Button onClick={handlePicSubmit}>Upload</Button>
      </Form.Group>
    </>
  );
}
