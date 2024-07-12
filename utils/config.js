require('dotenv').config()

const port=process.env.PORT
const mongoUrl = process.env.DB_CONNECTION_URL

module.exports ={
  port,
  mongoUrl
}