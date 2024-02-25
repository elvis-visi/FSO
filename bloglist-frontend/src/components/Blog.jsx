import { useState } from "react"
import {  useDispatch, useSelector } from "react-redux"
import { initializeBlogs, deleteBlog, updateBlog } from '../reducers/blogsReducer'

const Blog = ({blog}) =>  {
 

  const [visible, setVisible] = useState(false)

  //initially display ''
  const hideWhenVisible = {display: visible ? 'none' : '' }
    //initially display none
  const showWhenVisible = { display: visible ? '' : 'none' }

  const dispatch = useDispatch()

  const message = useSelector(state => state.notification)
  const user = useSelector(state => state.user)

  const showMessage = (message) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    },5000)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDeleteBlog  = async (id) => {
    if(window.confirm('Are you sure you want to delete this blog?')){
      try{
        dispatch(deleteBlog(id))

      }catch(exception){
      showMessage(`Only the user's creator can delete blog`)
    }
  }
  }

  const addLikes = async (id) => {
    dispatch(updateBlog(id))
   }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
 <>
            <div style={{...blogStyle, ...hideWhenVisible}}>
                {blog.title} {blog.author}  <button onClick={toggleVisibility}>View</button>
              </div>  
              <div style={{...blogStyle, ...showWhenVisible}}>
                <p>{blog.title} {blog.author}  <button onClick={toggleVisibility}>hide</button></p>
                <p>{blog.url}</p>
                <p>likes {blog.likes} <button onClick={ () => addLikes(blog.id)}>like</button></p>
                <p>{blog.author}</p>
              
              {user && blog.user.username===user.username && 
              <button onClick={() => handleDeleteBlog(blog.id)}>Remove </button>
              }
                
              </div>   
    
 </>
 
  )

}


export default Blog