import { useState } from "react"
import { UseDispatch, useDispatch, useSelector } from "react-redux"}
import { initializeBlogs, deleteBlog, updateBlog } from './reducers/blogsReducer'

const Blog = ({ blog, handleUpdate, canRemove}) =>  {
 

  const [visible, setVisible] = useState(false)

  //initially display ''
  const hideWhenVisible = {display: visible ? 'none' : '' }
    //initially display none
  const showWhenVisible = { display: visible ? '' : 'none' }

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const message = useSelector(state => state.notification)

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

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  // {blogs.
  //   slice() // shallow copy of blogs, to not mutate the state of blogs
  //   .sort((a,b) =>  b.likes-a.likes).map(blog =>
  //     <Blog key={blog.id} blog={blog}
  //      handleUpdate={() => addLikes(blog.id)} 
  //      handleDelete = {() => handleDeleteBlog(blog.id)}
  //      canRemove={user && blog.user.username===user.username}
  //      />
  //   )}

  return (
 <>
  <div style={{...blogStyle, ...hideWhenVisible}}>
    {blog.title} {blog.author}  <button onClick={toggleVisibility}>View</button>
  </div>  
  <div style={{...blogStyle, ...showWhenVisible}}>
    <p>{blog.title} {blog.author}  <button onClick={toggleVisibility}>hide</button></p>
    <p>{blog.url}</p>
    <p>likes {blog.likes} <button onClick={handleUpdate}>like</button></p>
    <p>{blog.author}</p>
   
   {canRemove && 
   <button onClick={handleDeleteBlog}>Remove </button>
   }
    


  </div>
 </>
 
  )

}





export default Blog