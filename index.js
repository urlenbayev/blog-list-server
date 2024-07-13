const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const Blog = require('./models/Blog').Blog
mongoose.connect(config.mongoUrl)


//Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


//Endpoints

//GET http://localhost:3001/api/blogs
//Result is an array of blogs with title, author, url and likes
app.get('/api/blogs', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  })
})

//POST http://localhost:3001/api/blogs
//For creating a blog
app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body)

  blog.save().then(result => {res.status(201).json(result)})
})

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})