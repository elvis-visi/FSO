import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from '../services/anecdotes'
import { createMessage, removeNotification } from '../reducers/messageReducer'

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState:[],
  reducers: {
    voteAction(state,action){
      return state.map(an => an.id !== action.payload.id ? an :
        action.payload)
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

export const updateAnecdote = (id) => {

  return async (dispatch,getState) => {
    const anecdotes = getState().anecdotes;
    const anecdoteToUpdate = anecdotes.find(an => an.id === id)
    const newAnecdote = await anecdotesService.updateVotes(id, {...anecdoteToUpdate, votes:anecdoteToUpdate.votes+1 })
    dispatch(voteAction(newAnecdote))
    dispatch(createMessage(`You voted for ${newAnecdote.content}`))

    setTimeout(() => {
        dispatch(removeNotification())
    },5000)
  }
}



export const { voteAction, appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer