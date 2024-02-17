import ReactDOM from 'react-dom/client'
import App from './App'


import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './reducers/filterReducer'
import anecdotesReducer from './reducers/anecdoteReducer'
import messageReducer from './reducers/messageReducer'



const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
    message:messageReducer
  }
})
console.log(store.getState())





ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)