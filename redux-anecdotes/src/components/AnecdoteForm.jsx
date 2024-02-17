import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createMessage, removeNotification } from '../reducers/messageReducer'
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {

    const dispatch =  useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const anecdoteContent = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdotesService.createNew(anecdoteContent)
        dispatch(createAnecdote(newAnecdote.content))
        dispatch(createMessage(`You added ${newAnecdote.content}`))

        setTimeout(() => {
            dispatch(removeNotification())
        },5000)
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