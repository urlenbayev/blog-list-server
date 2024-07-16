const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blog')

const api = supertest(app)

const testBlogs = 
 [
  {
    "title": "Creating Your First RESTful API Service with Rails",
    "author": "Ajay Naik",
    "url": "https://medium.com/@ajay.naik44/creating-your-first-restful-api-service-with-rails-b7a39d59656a",
    "likes": 0,
  },
  {
    "title": "How to have background jobs in Rails",
    "author": "Mateo mojica",
    "url": "https://mateo-mojica.medium.com/how-to-have-background-jobs-in-rails-e4c93ded96cf",
    "likes": 50,
  },
 ]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(testBlogs[0])
  await blogObject.save()
  blogObject = new Blog(testBlogs[1])
  await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

})


test('there are 2 blogs', async () => {
  const res = await api.get('/api/blogs')

  assert.strictEqual(res.body.length, 2)
})


test('id formatted correctly', async () => {
  const res = await api.get('/api/blogs')
  const result = res.body.every(_ => Object.keys(_).includes("id"))
  assert.strictEqual(result, true)
})


test.only('valid post blogs, rows number in db increased by one', async () => {
  const newBlog = {
    "title": "Why use Scala for building backend applications?",
    "author": "JAROSLAV REGEC",
    "url": "https://scalac.io/blog/why-use-scala/",
    "likes": 1 
  }
  const initialRows = testBlogs.length 


  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await Blog.find({})
  const rows = blogs.length


  const res = await api.get('/api/blogs')

  const saved = res.body.some( blog => 
    blog.title === newBlog.title &&
    blog.author === newBlog.author &&
    blog.url === newBlog.url &&
    blog.likes === newBlog.likes
  )

  assert.strictEqual(rows, initialRows + 1)
  assert.strictEqual(saved, true)
})


after(async () => {
  await mongoose.connection.close()
})