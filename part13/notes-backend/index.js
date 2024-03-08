// Express application -> backend server
const express = require('express')
const app = express()

// import PORT on which we will listen for http requests on
// DB connection
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

//controller (mini-app) which will handle the requests to /api/notes
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(express.json())

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

//wait for the connection to DB to be established, then start the server
const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()