import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createMessage, removeNotification } from '../reducers/messageReducer'

const AnecdoteForm = () => {

    const dispatch =  useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdoteContent = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(anecdoteContent))
        dispatch(createMessage(`You added ${anecdoteContent}`))

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