import { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import {  useDispatch, useSelector } from 'react-redux'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [username,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)


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
      setUser(user)
  
    }
  }, [])

  const addBlog = async (blogObject) =>{
    try{
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      showMessage(`a new blog ${returnedBlog.title} by ${user.name}`)
    }catch(exception){

    }

  }

  const addLikes = async (id) => {
    //get the blog to update
    const blogToUpdate = blogs.find(b => b.id === id)
    //increase likes by 1 call update (id, newBlog)
   
   try{
    const updatedBlog = await blogService.updateBlog(id, {...blogToUpdate, likes: blogToUpdate.likes + 1})
    //update the blogs state 
    setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
   }catch(exception){

   }
   
  }

  const deleteBlog = async (id) => {
    if(window.confirm('Are you sure you want to delete this blog?')){
      try{
        await blogService.deleteBlog(id);
        setBlogs(blogs.filter(blog => blog.id !== id))

      }catch(exception){
      showMessage(`Only the user's creator can delete blog`)
    }
  }
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username,password})

        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )

        blogService.setToken(user.token)
        setUser(user)
        setUserName('')
        setPassword('')

    }catch(exception){
      showMessage('Wrong credentials')
    }

  } 

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)


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
        <BlogForm createBlog = {addBlog}/>
      </Togglable>

      {blogs.
      slice() // shallow copy of blogs, to not mutate the state of blogs
      .sort((a,b) =>  b.likes-a.likes).map(blog =>
        <Blog key={blog.id} blog={blog}
         handleUpdate={() => addLikes(blog.id)} 
         handleDelete = {() => deleteBlog(blog.id)}
         canRemove={user && blog.user.username===user.username}
         />
      )}
    </div>

  )
}

export default App