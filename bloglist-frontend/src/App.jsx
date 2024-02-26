import { useEffect, useRef  } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import {  useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import {setUser, clearUser} from './reducers/userReducer'

const App = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
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

  const logout = (event) => {
    event.preventDefault()
  dispatch(clearUser())
  }

  if(user === null) {
    return (
      <>
      <h2>log in to application</h2>
      <Notification/>
      <Togglable buttonLabel='login'>
        <LoginForm />
      </Togglable>
      </>
    )
  }

  return (
    <div>
      <h2>{`${user.username} is logged in`}</h2> 
      <button onClick={logout}>logout</button>
      <h2>blogs</h2>
      <Notification/>
    
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm onBlogCreated={() => blogFormRef.current.toggleVisibility()} />
      </Togglable>
     <Blogs />
    </div>

  )
}

export default App