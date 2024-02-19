import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query' 
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './components/NotificationContext'

const App = () => {

  const queryClient = useQueryClient()
  const [notification, dispatch] = useContext(NotificationContext)

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updateAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(an => an.id !== updateAnecdote.id ? an  : updateAnecdote))
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes:anecdote.votes+1})
    dispatch({type:'show', payload:`anecdote ${anecdote.content} voted`})
   setTimeout(() => {
    dispatch({type:'hide', payload:``})
   },5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn:getAnecdotes
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  const anecdotes  =result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
