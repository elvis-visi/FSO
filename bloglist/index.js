const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

const blogsRouter = require('../bloglist/controllers/blogs')

const mongoUrl = 'mongodb+srv://fullstack:fullstack@cluster0.xjms7ej.mongodb.net/blogListApp?retryWrites=true&w=majority'
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)




app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})