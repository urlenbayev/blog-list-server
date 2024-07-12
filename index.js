require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3001


const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.DB_CONNECTION_URL
mongoose.connect(mongoUrl)


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})