import { useState, useEffect, useRef  } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import {  useDispatch, useSelector } from 'react-redux'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import {loginIn,setUser, clearUser} from './reducers/userReducer'

const App = () => {

  const [username,setUserName] = useState('')
  const [password,setPassword] = useState('')
 
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const message = useSelector(state => state.notification.message)

  const showMessage = (message) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    },5000)
  }

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  },[])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
  
    }
  }, [])

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

  const logout = (event) => {
    event.preventDefault()
  dispatch(clearUser())
  }

  if(user === null) {
    return (
      <>
      <p>Blogs app</p>
      <Notification message= {message} />
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUserName(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
      </>

    )
  }

  //visi

  return (
    <div>
      <h2>{`${user.username} is logged in`}</h2> 
      <button onClick={logout}>logout</button>
      <h2>blogs</h2>

      <Notification  message={message}   />

      <h2>create New</h2>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm onBlogCreated={() => blogFormRef.current.toggleVisibility()} />
      </Togglable>

     <Blogs />
    </div>

  )
}

export default App