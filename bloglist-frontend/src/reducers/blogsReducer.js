import { createAction, createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
import { setNotification, clearNotification } from './notificationReducer'


const blogsSlice = createSlice({
    name:'blogs',
    initialState: [],
    reducers: {
        setBlogs(state,action){
            return action.payload
        },
        appendBlog(state,action){
            state.push(action.payload)
        }
    }
})

export const {setBlogs,appendBlog} = blogsSlice.actions

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

export default blogsSlice.reducer