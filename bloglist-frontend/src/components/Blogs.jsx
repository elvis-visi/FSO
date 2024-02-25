import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = () => {
    const blogs = useSelector(state => state.blogs)
      return (
        <div>
            {blogs.
        slice() // shallow copy of blogs, to not mutate the state of blogs
        .sort((a,b) =>  b.likes-a.likes)
        .map(blog => {
           return <Blog key={blog.id} blog={blog}/>
        }
        )}
        </div>
      )
}

export default Blogs