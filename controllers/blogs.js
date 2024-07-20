const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')


//GET http://localhost:3001/api/blogs
//Result is an array of blogs with title, author, url and likes
/* 
[
  {
    "title": "Introduction to MongoDB",
    "author": "John Doe",
    "url": "https://example.com/mongodb-intro",
    "likes": 15,
    "id": "66917cb6dda6d7bed93e0618"
  },
  ...
] 
*/
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})


//POST http://localhost:3001/api/blogs
//For creating a blog
blogsRouter.post('/', async (req, res, next) => {
  const blog = new Blog(req.body)
  
  try {
    const result = await blog.save()
    res.status(201).json(result)
  } catch(error) {
    next(error)
  }
})


//PUT http://localhost:3001/api/blogs/:id
//For updating title, author, url and likes for a blog
blogsRouter.put('/:id', async (req, res, next) => {
  const { id }  = req.params
  const blog = req.body 

  try {
    const result = await Blog.findByIdAndUpdate(id, blog, {new: true})
    res.status(200).json(result)
  } catch(error) {
    next(error)
  }
})

module.exports = blogsRouter