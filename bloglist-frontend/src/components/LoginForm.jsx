import { useState } from "react"
import { useDispatch } from "react-redux"
import { setNotification, clearNotification } from "../reducers/notificationReducer"
import { loginIn } from "../reducers/userReducer"

const LoginForm = () => {

        const [username,setUserName] = useState('')
        const [password,setPassword] = useState('')

        const dispatch = useDispatch()

        const showMessage = (message) => {
            dispatch(setNotification(message))
            setTimeout(() => {
            dispatch(clearNotification())
            },5000)
        }

        const handleLogin = async (event) => {
            event.preventDefault()
            try{
              dispatch(loginIn({username,password}))
                setUserName('')
                setPassword('')
        
            }catch(exception){
              showMessage('Wrong credentials')
            }
          } 

    return (
        <div>
            <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <div>
            username 
            <input 
            type="text"
            value={username}
            onChange={({ target }) => setUserName(target.value)}
            />
            </div>
        
            <div>
            password 
            <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            />
            </div>
            <button type="submit">login</button>
        
        </form>
        </div>
      
    )

}

export default LoginForm
