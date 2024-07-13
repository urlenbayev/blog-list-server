const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')


//GET http://localhost:3001/api/blogs
//Result is an array of blogs with title, author, url and likes
blogsRouter.get('/', (req, res) => {
  Blog.find({})
    .then(blogs => {res.json(blogs)})
})

//POST http://localhost:3001/api/blogs
//For creating a blog
blogsRouter.post('/', (req, res) => {
  const blog = new Blog(req.body)
  blog.save()
    .then(result => {res.status(201).json(result)})
    .catch(error => next(error))
})

module.exports = blogsRouter