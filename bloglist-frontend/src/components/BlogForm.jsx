import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'

const BlogForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()


    const addBlog = (event) => {
        event.preventDefault()
        //create the blog object, pass it to addBlog in App
        dispatch(createBlog({
            title,
            author,
            url
        }))
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <form onSubmit={addBlog}>
            <div>
                title: 
                <input
                type="text"
                value={title}
                onChange= {({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author: 
                <input
                type="text"
                value={author}
                onChange= {({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url: 
                <input
                type="text"
                value={url}
                onChange= {({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
            </form>
        </div>
    )
}
export default BlogForm