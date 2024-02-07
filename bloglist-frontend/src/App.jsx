import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
  
    }
  }, [])

  const visi = "visi";

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username,password})

        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )


        setUser(user)
        setUserName('')
        setPassword('')

    }catch(exception){

    }

  } 

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)


  }

  if(user === null) {
    return (
      <form onSubmit={handleLogin}>
        <div>
        username 
        <input 
        type="text"
        value={username}
        onChange={({target}) => setUserName(target.value)}
        />
        </div>
     
          <div>
          password 
          <input
          type="password"
          value={password}
          onChange={({target}) => setPassword(target.value)}
          />
          </div>
          <button type="submit">login</button>

      </form>
    )
  }

  //visi

  return (
    <div>
      <h2>{`${user.username} is logged in`}</h2> 
      <button onClick={logout}>logout</button>
      <h2>blogs</h2>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>

  )
}

export default App