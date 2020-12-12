if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
  }
const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const errorhandler = require('./middlewares/errorhandler')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(routes)
app.use(errorhandler)
module.exports = app