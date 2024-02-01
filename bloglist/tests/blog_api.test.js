const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    //array of Blog documents
    const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
    //array of promises
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})


test('blogs are returned as JSON', async () => {

    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
},100000)

test('there are two blogs', async () => {

    const response =  await helper.blogsInDb()

    expect(response).toHaveLength(2)

})

test('id property is defined', async () => {

    const response =  await helper.blogsInDb()
    //array of JSON objects
    expect(response[0].id).toBeDefined()
})

test('blog posted correctly to the DB', async () =>{

    const blog = {
        title: 'example',
        author: 'sevi',
        url:'www.example.com',
        likes: 3
    }

    await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    //compare the DB length to the initial lenght
    const response = await helper.blogsInDb();
    const titles = response.map(blog => blog.title)

    expect(response).toHaveLength(helper.initialBlogs.length  +1)

    //verify the content of the blog is saved correctly
    expect(titles).toContain(blog.title)


})

test('if the likes property is missing from the request, it will default to the value 0',async () =>{


    const newBlog = {
        title: 'Test Default Likes',
        author: 'No Likes Author',
        url: 'http://nolikes.example.com'
        // Notice the likes property is intentionally omitted
      };
    
      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
    
      expect(response.body.likes).toBeDefined();
      expect(response.body.likes).toBe(0);
}
)

describe('Testing when url or title are missing', () => {
    test('url missing', async() => {

        const newBlog = {
            title:'url missing',
            author: 'No Likes Author',
            likes:3
          };
    
          const response = await api.
          post('/api/blogs')
          .send(newBlog)
          .expect(400)
    })

    test('title missing', async() => {

        const newBlog = {
           url:'www.google.com',
            author: 'No Likes Author',
            likes:3
          };
    
          const response = await api.
          post('/api/blogs')
          .send(newBlog)
          .expect(400)
    })
})




afterAll(async () => {
    await mongoose.connection.close()
})