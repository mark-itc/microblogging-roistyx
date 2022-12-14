import React, { useRef, useState, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export const ACTIONS = {
    SET_ERROR: 'set-error',
    TOGGLE_TODO: 'set-loading',
   
  }
  
  function reducer(errors, action) {
    switch(action.type) {
      case ACTIONS.SET_ERROR:
        return [...todos, newTodo(action.payload.name)]
       case ACTIONS.TOGGLE_TODO:
        return todos.map(todo => {
          if(todo.id === action.payload.id){
            return {...todo, complete: !todo.complete}
          }
          return todo
        })
        case ACTIONS.DELETE_TODO:
          return todos.filter(todo => todo.id !== action.payload.id)
          
        default:
          return todos
      }
    
    }

export default function Login() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const navigate = useNavigate()
    const [todos, dispatch] = useReducer(reducer, [])
    


    async function handleSubmit(e) {
        e.preventDefault()
    
        try {
            setError("")
            setLoading(true)
           await login(emailRef.current.value, passwordRef.current.value)
           navigate('/')
        } catch {
            setError("Log in failed")
        }
        setLoading(false)
    }
    // add error input errors
  return (
    <>
    <Card className='card'>
        <Card.Body>
            <h2 className='text-center mb-4'>Log In</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} required/>
                </Form.Group>
                <Form.Group id='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={passwordRef} required/>
                </Form.Group>
                <Button className='w-100' disabled={loading} type='submit'>Log In</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
        Creat an account <Link to='/signup'>Sign Up</Link>
    </div>
    </>
  )
}
