import { createAction, createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
import { setNotification, clearNotification } from './notificationReducer'

//state directly refers to this array of blogs.

const blogsSlice = createSlice({
    name:'blogs',
    initialState: [],
    reducers: {
        setBlogs(state,action){
            return action.payload
        },
        appendBlog(state,action){
            state.push(action.payload)
        },
        removeBlog(state,action){
            const id = action.payload
            console.log('id',id)
            return state.filter(blog => blog.id !== id )
        },
        upBlog(state,action){
            const updatedBlog = action.payload
            return state.map(b => b.id !== updatedBlog.id ? b : updatedBlog )
        },
    }
})

export const {setBlogs,appendBlog, removeBlog, upBlog} = blogsSlice.actions



export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogsService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = blog => {
    return async dispatch => {
      const newBlog = await blogsService.create(blog) //add blog to backend first
      dispatch(appendBlog(newBlog)) // add the returned newBlog from the server to the blogs state
      dispatch(setNotification(`Blog '${newBlog.title}' created successfully!`)); 
      setTimeout(() => {
          dispatch(clearNotification()); 
      }, 5000);
    }
}

export const deleteBlog = id => {
    return async dispatch => {
        await blogsService.deleteBlog(id)
        dispatch(removeBlog(id))
    }
}

export const updateBlog = id => {
    
    return async (dispatch,getState) => {
    //get blog to update 
    const blogToUpdate = getState().blogs.find(b => b.id === id)
    //update the blog -> pass id and updatedBlog
    const updatedBlog = await blogsService.updateBlog(id,
        {...blogToUpdate, likes: blogToUpdate.likes + 1})
    //get the returned blog(updated) from backend and update the blogs state
    dispatch(upBlog(updatedBlog))
}
    }

    export const blogComment = (id,comment) => {
        return async dispatch => {
            const newBlog = await blogsService.addComment(id, comment)
            dispatch(upBlog(newBlog))
        }
    }
   

export default blogsSlice.reducer