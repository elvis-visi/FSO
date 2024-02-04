//router -> mini application to handle middleware and routes
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  
      const blogs = await Blog
      .find({}).populate('user', {name:1})
      response.json(blogs)

  })

  //isolates the token from the authorization header.
  //returns the Object which the token was based on
 
  blogsRouter.post('/',async  (request, response, next) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)


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


  blogsRouter.delete('/:id', async (request, response, next) => {
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET);
      if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
      }
  
      const blog = await Blog.findById(request.params.id);
      if (!blog) {
        return response.status(404).json({ error: 'blog not found' });
      }
  
      if (blog.user.toString() !== decodedToken.id.toString()) {
        return response.status(403).json({ error: 'only the creator can delete this blog' });
      }
  
      // Delete the blog
      await Blog.findByIdAndDelete(request.params.id);
  
      // Find the user and remove the blog from their blogs array
      const user = await User.findById(decodedToken.id);
      user.blogs = user.blogs.filter(blogId => blogId.toString() !== request.params.id);
      await user.save();
  
      response.status(204).end();
    } catch (exception) {
      next(exception);
    }
  });
  

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