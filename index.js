const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')


mongoose.connect(config.mongoUrl)


//Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


//Routers
const blogsRouter = require('./controllers/blogs')


//Endpoints
app.use('/api/blog', blogsRouter)


app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})