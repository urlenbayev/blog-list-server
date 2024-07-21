const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('./utils/morganMiddleware')

mongoose.connect(config.mongoUrl)
  .then(console.log('Connected to db'))
  .catch(error => {console.log(error)})


//Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan)


//Routers
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')


//Endpoints
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})