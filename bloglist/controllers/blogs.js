//router -> mini application to handle middleware and routes
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  
      const blogs = await Blog
      .find({}).populate('user', {name:1})
      response.json(blogs)

  })

  //isolates the token from the authorization header.
  //returns the Object which the token was based on
 
  blogsRouter.post('/', userExtractor, async  (request, response, next) => {
    const body = request.body

    const user = request.user

    if (!user) {
      return response.status(401).json({ error: 'operation not permitted' })
    }


    const blog = new Blog({
      title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user  :user.id
    })
  
      try{
      const savedBlog =  await blog.save()
      user.blogs =  user.blogs.concat(savedBlog._id)
      await user.save()

        response.status(201).json(savedBlog)
      }catch(Exception) {
          response.status(400).end()
      }

  })


  blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
    try {
     
      const blog = await Blog.findById(request.params.id);
      const user = request.user

    
      if (!user || blog.user.toString() !== user.id.toString()) {
        return response.status(401).json({ error: 'operation not permitted' })
      }


      user.blogs = user.blogs.filter(b => b.toString() !== blog.id.toString() )
      await user.save();
      // Delete the blog
      await Blog.findByIdAndDelete(request.params.id);
  
      response.status(204).end();
    } catch (exception) {
      next(exception);
    }
  });
  

  blogsRouter.put('/:id', userExtractor, async (request,response,next) => {
    const body = request.body  //new content 

    //blog to update
    const blog = await Blog.findById(request.params.id)
    //user who created the blog
    const user = request.user

    if (!user || blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    try{ 
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new: true})
      response.json(updatedBlog)
    }catch(Exception){
      next(Exception)
    }

  })




  module.exports = blogsRouter