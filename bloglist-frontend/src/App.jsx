import { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
      setErrorMessage(`a new blog ${returnedBlog.title} by ${user.name}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
      <Notification message= {errorMessage} />
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

      <Notification  message={errorMessage}   />

      <h2>create New</h2>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog = {addBlog}/>
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleUpdate={() => addLikes(blog.id)} />
      )}
    </div>

  )
}

export default App