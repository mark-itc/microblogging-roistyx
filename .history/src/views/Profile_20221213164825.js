import {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import { useAuth } from '../contexts/AuthContext'
import './Profile.css'
import {useTweetContext } from '../contexts/TweetContext'
import { Form, Button, Card, Alert } from 'react-bootstrap'

export function Profile() {
  const [show, setShow] = useState(false);
  const { currentUser } = useAuth()
  // console.log(currentUser.uid)
  const {posts} = useTweetContext()

  async function handlePicSubmit(e) {
    console.log(e)
  }
 
  return (
    <>
      <Form.Group controlId="formFileDisabled" className="mb-3">
        <Form.Label>Upload profile picture</Form.Label>
        <Form.Control type="file" 
        // disabled 
        />
        <Button onClick={handlePicSubmit}>Upload</Button>
      </Form.Group>
    </>
  );
}

