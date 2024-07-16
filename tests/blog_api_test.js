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

test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

})


test.only('there are 2 blogs', async () => {
  const res = await api.get('/api/blogs')

  assert.strictEqual(res.body.length, 2)
})

test('the first blog is about MongoDB', async () => {
  const res = await api.get('/api/blogs')
  const titles = res.body.map(_ => _.title)
  assert.strictEqual(titles.includes('Introduction to MongoDB'), true)
})

after(async () => {
  await mongoose.connection.close()
})