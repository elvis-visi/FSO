import { useState } from "react"

const Blog = ({ blog, handleUpdate }) =>  {

  const [visible, setVisible] = useState(false)

  //initially display ''
  const hideWhenVisible = {display: visible ? 'none' : '' }
    //initially display none
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
    <p>likes {blog.likes} <button onClick={handleUpdate}>like</button></p>
    <p>{blog.author}</p>
  </div>
 </>
 
  )

}





export default Blog