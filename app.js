if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const app = express()
const route = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(route)
app.use(errorHandler)

module.exports = app