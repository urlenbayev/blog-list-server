const {test, after} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

})


test('there are 12 blogs', async () => {
  const res = await api.get('/api/blogs')

  assert.strictEqual(res.body.length, 12)
})

test('the first blog is about MongoDB', async () => {
  const res = await api.get('/api/blogs')
  const titles = res.body.map(_ => _.title)
  assert.strictEqual(titles.includes('Introduction to MongoDB'), true)
})

after(async () => {
  await mongoose.connection.close()
})