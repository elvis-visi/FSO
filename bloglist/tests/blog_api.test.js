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


afterAll(async () => {
    await mongoose.connection.close()
})