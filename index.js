const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(config.mongoUrl)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});


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