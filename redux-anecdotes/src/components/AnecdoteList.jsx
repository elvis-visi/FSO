/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { useMemo } from 'react';

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
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const handleVote = (id) => {
        dispatch(voteAction(id))
    }

    const filteredAndSortedAnecdotes = useMemo(() => {
        return anecdotes
            .filter(an => an.content.toLowerCase().includes(filter))
            .sort((a, b) => b.votes - a.votes)
    }, [anecdotes, filter])

    return (
        <div>
            {filteredAndSortedAnecdotes
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
