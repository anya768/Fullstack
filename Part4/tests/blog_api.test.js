const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { initialBlogs, blogsInDb, usersInDb, initialUsers } = require('./test_helper')

const api = supertest(app)

const blogs = initialBlogs
let userObject

beforeEach(async () => {
  await User.deleteMany({})

  for( let user of initialUsers){
    userObject = new User( {
      username: user.username,
      passwordHash: await bcrypt.hash( user.password, 10 ),
      name: user.name
    } )
    await userObject.save()
    userObject.password = user.password
  }


  await Blog.deleteMany({})

  const blogObjects = blogs
    .map(blog => new Blog({ ...blog, user: userObject._id }))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('blogs use id as their identifier', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})


test('post request to /api/blogs creates new blog', async () => {
  const user = (await usersInDb())[0]
  const userWithPassword = initialUsers[0]
  const loginResponse = await api.post('/api/login').send( { username:userWithPassword.username, password: userWithPassword.password } ).expect(200)
  const token = 'bearer ' + loginResponse.body.token

  await api.post('/api/blogs').send(
    {
      title: 'Reaasdct patterns',
      author: 'Michael Casd3han',
      url: 'https://reactpa23tterns.com/',
      likes: 73,
      userId: user.id
    }
  )
    .set({ 'Authorization': token })
    .expect(200)

  const response = await blogsInDb()

  expect(response).toHaveLength(3)
})

test('post request to /api/blogs creates new blog', async () => {
  const user = (await usersInDb())[0]
  const userWithPassword = initialUsers[0]
  const loginResponse = await api.post('/api/login').send( { username:userWithPassword.username, password: userWithPassword.password } ).expect(200)
  const token = 'bearer ' + loginResponse.body.token

  const response = await api.post('/api/blogs').send(
    {
      title: 'Reaasdct patterns',
      author: 'Michael Casd3han',
      url: 'https://reactpa23tterns.com/',
      userId: user.id
    }
  )
    .set({ 'Authorization': token })
    .expect(200)

  expect(response.body.likes).toBe(0)

})


test('post request to /api/blogswithout token returns unauthorized response', async () => {
  const user = (await usersInDb())[0]
  await api.post('/api/blogs').send(
    {
      title: 'Reaasdct patterns',
      author: 'Michael Casd3han',
      url: 'https://reactpa23tterns.com/',
      userId: user.id
    }
  )
    .expect(401)

})

test('delete /api/post/:id request returns successful response', async () => {
  const user = userObject
  const loginResponse = await api.post('/api/login').send( { username:user.username, password: user.password } ).expect(200)
  const token = 'bearer ' + loginResponse.body.token

  const response = await blogsInDb()
  await api
    .delete(`/api/blogs/${response[0].id}`)
    .set({ 'Authorization': token })
    .expect(204)
})

test('delete /api/post/:id request returns unauthorized response for no token', async () => {
  const response = await blogsInDb()
  await api
    .delete(`/api/blogs/${response[0].id}`)
    .expect(401)
})

test('delete /api/post/:id request returns unauthorized response for wrong user', async () => {
  const user = initialUsers[0]
  const loginResponse = await api.post('/api/login').send( { username:user.username, password: user.password } ).expect(200)
  const token = 'bearer ' + loginResponse.body.token

  const response = await blogsInDb()
  await api
    .delete(`/api/blogs/${response[0].id}`)
    .set({ 'Authorization': token })
    .expect(401)
})


test('put /api/post/:id request returns updates likes', async () => {
  const allBlogs = await blogsInDb()
  const response = await api
    .put(`/api/blogs/${allBlogs[0].id}`)
    .send({ ...allBlogs[0], likes: 500 })
  expect(response.body.likes).toBe(500)
})

afterAll(() => {
  mongoose.connection.close()
})