import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)





const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState:[],
  reducers: {
    createAnecdote(state, action){
      const content = action.payload
      state.push({
        content,
        id: getId(),
      votes:0
      })
    },
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




export const {createAnecdote, voteAction, appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer