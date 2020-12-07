require('dotenv').config()
const express = require('express')
const app = express()
const { urlencoded } = require('express')
const routes = require('./routes/index')
// const port = 3000
const errorHandler = require('./middlewares/errorHandler')

//Body Parcers
app.use(express.json())
app.use(urlencoded({ extended: true}))

//middlewares
app.use('/', routes)
app.use(errorHandler.handle)

// app.listen(port, () => console.log(port))

module.exports = app