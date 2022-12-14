import {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import { useAuth } from '../contexts/AuthContext'
import './ProfileModal.css'
import {useTweetContext } from '../contexts/TweetContext'
import { Form, Button, Card, Alert } from 'react-bootstrap'

export function StaticExample() {
  const [show, setShow] = useState(false);
  const { currentUser } = useAuth()
  // console.log(currentUser.uid)
  const {posts} = useTweetContext()

  async function handlePicSubmit(e) {
    console.log(e)
  }
 



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Profile
      </Button>
        <Modal show={show} 
        // onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handlePicSubmit}>
                <Form.Group id='email'>
                    <Form.Label>Upload profile image</Form.Label>
                    <Form.Control type='email' />
                </Form.Group>
                <Button className='w-100' 
                // disabled={loading} 
                type='submit'>Sign Up</Button>
            </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal> 
    </>
  );
}

