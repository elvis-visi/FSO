import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

    const dispatch =  useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdoteContent = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(anecdoteContent))
    }
    

    return (
        <form onSubmit={addAnecdote}>
            <input  
                type = "text"
                name = "anecdote"
            />
            <button type="submit">add</button>
        </form>
    )

}



export default AnecdoteForm