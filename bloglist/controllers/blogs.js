//router -> mini application to handle middleware and routes
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  
      const blogs = await Blog.find({})
      response.json(blogs)

  })
  
  blogsRouter.post('/',async  (request, response, next) => {
    const body = request.body
    
    const blog = new Blog({
      title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
    })
  
      try{
      const savedBlog =  await blog.save()
        response.status(201).json(savedBlog)
      }catch(Exception) {
          response.status(400).end()
      }

  })


  blogsRouter.delete('/:id', async (request,response,next) => {

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  })

  blogsRouter.put('/:id', async (request,response,next) => {
    const body = request.body  //new content 

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    try{ 
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
      response.json(updatedBlog)
    }catch(Exception){
      next(Exception)
    }

  })




  module.exports = blogsRouter