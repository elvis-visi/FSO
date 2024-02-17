import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from '../services/anecdotes'
import { createMessage, removeNotification } from '../reducers/messageReducer'

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState:[],
  reducers: {
    voteAction(state,action){
      return state.map(an => an.id !== action.payload ? an :
        {...an,votes:an.votes  +1})
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecdotes(state,action){
      return action.payload
    }
  }
})


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch =>{
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
    dispatch(createMessage(`You added ${newAnecdote.content}`))

    setTimeout(() => {
        dispatch(removeNotification())
    },5000)
  }
}



export const { voteAction, appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer