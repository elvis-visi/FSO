import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

//add a parameterized link for each blog


const Blogs = () => {
    const blogs = useSelector(state => state.blogs)
      return (
        <div>
            {blogs.
        slice() // shallow copy of blogs, to not mutate the state of blogs
        .sort((a,b) =>  b.likes-a.likes)
        .map(blog => 
         <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`} >{blog.title}</Link> 
         </div>
        
        
        )}
        </div>
      )
}

export default Blogs