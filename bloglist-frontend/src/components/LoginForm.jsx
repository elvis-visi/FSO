import { useState } from "react"
import { useDispatch } from "react-redux"
import { setNotification, clearNotification } from "../reducers/notificationReducer"
import { loginIn } from "../reducers/userReducer"
import { Table, Form, Button } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

const LoginForm = () => {

        const [username,setUserName] = useState('')
        const [password,setPassword] = useState('')

        const dispatch = useDispatch()
        const navigate = useNavigate()

        const showMessage = (message) => {
            dispatch(setNotification(message))
            setTimeout(() => {
            dispatch(clearNotification())
            },5000)
            navigate('/')
        }

        const handleLogin = async (event) => {
            event.preventDefault()
            try{
              dispatch(loginIn({username,password}))
                setUserName('')
                setPassword('')
                navigate('/')
            }catch(exception){
              showMessage('Wrong credentials')
            }
          } 

    return (
        <div>
            <h2>Login</h2>
        <Form onSubmit={handleLogin}>
            <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
            type="text"
            value={username}
            onChange={({ target }) => setUserName(target.value)}
            />
            </Form.Group>
        
            <Form.Group>
            <Form.Label>password:</Form.Label>
            <Form.Control
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            />
            </Form.Group>
            <Button variant="primary" type="submit">
          login
        </Button>
        
        </Form>
        </div>
      
    )

}

export default LoginForm
