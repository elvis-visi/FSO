import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

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

  const addBlog = async (event) =>{
    event.preventDefault()
    const blog = {
      title,
      author,
      url
    }

    try{

      const returnedBlog = await blogService.create(blog);
      setBlogs(blogs.concat(returnedBlog));
      setErrorMessage(`a new blog ${returnedBlog.title} by ${user.name}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setTitle('');
      setAuthor('');
      setUrl('');

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

<form onSubmit={addBlog}>
  <div>
      title: 
      <input
      type="text"
      value={title}
      onChange={({target}) => setTitle(target.value)}
      />
  </div>
  <div>
      author: 
      <input
      type="text"
      value={author}
      onChange={({target}) => setAuthor(target.value)}
      />
  </div>
  <div>
      url: 
      <input
      type="text"
      value={url}
      onChange={({target}) => setUrl(target.value)}
      />
  </div>
  <button type="submit">create</button>
</form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>

  )
}

export default App