const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as JSON', async () => {

    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
},100000)

test('there are two blogs', async () => {

    const response =  await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)

})

test(`the first blog's title is`, async() => {
    const response =  await api.get('/api/blogs')

   expect(response.body[0].title).toBe('FSO')

})

afterAll(async () => {
    await mongoose.connection.close()
})