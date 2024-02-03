//router -> mini application to handle middleware and routes
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  
      const blogs = await Blog
      .find({}).populate('user', {name:1})
      response.json(blogs)

  })
  
  blogsRouter.post('/',async  (request, response, next) => {
    const body = request.body

    //when creating a blog, the userID is sent along with
    //the blog's content in the request.body
    const user = await User.findById(body.userId)


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