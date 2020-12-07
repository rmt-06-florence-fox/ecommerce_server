if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const express = require('express')
const errorhandler = require('./middlewares/errorhandler')
const app = express()
const router = require('./routes')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// console.log(process.env.TEST)

app.use('/', router)

app.use(errorhandler)

module.exports = app;