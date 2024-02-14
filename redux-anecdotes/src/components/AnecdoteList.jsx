/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'

const Anecdote = ({ handleVote, anecdote }) => {
    return (
        <p>
            {anecdote.content} has {anecdote.votes} votes
            <button onClick={() => handleVote(anecdote.id)}>Vote</button>
        </p>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const handleVote = (id) => {
        dispatch(voteAction(id))
    }

    return (
        <div>
            {anecdotes
                .slice()
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote => (
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleVote={() => handleVote(anecdote.id)}
                    />
                ))
            }
        </div>
    )
}

export default AnecdoteList
