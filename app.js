if (process.env.NODE_ENV !== 'Production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const route = require('./routes')
const errorHandler = require('./middleware/errorHandler')

require('dotenv').config()
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(route)

app.use(errorHandler)

module.exports = app