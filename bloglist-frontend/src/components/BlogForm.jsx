import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { Table, Form, Button } from 'react-bootstrap'

const BlogForm = ({ onBlogCreated }) => {
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
        })).then(() => {
            // Assuming createBlog is a thunk that resolves after the blog is created
            setTitle('');
            setAuthor('');
            setUrl('');
            onBlogCreated(); // Call the callback passed from the parent component
          });
       
    }

    return (
        <div>
            <Form  onSubmit={addBlog}>
            <Form.Group>
            <Form.Label>title:</Form.Label>
                <Form.Control
                type="text"
                value={title}
                onChange= {({ target }) => setTitle(target.value)}
                />
            </Form.Group>
            <Form.Group>
            <Form.Label>author:</Form.Label>
                <Form.Control
                type="text"
                value={author}
                onChange= {({ target }) => setAuthor(target.value)}
                />
            </Form.Group>
            <Form.Group>
            <Form.Label>url:</Form.Label>
                <Form.Control
                type="text"
                value={url}
                onChange= {({ target }) => setUrl(target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
          submit
        </Button>
            </Form >
        </div>
    )
}
export default BlogForm