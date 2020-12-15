if (process.env.NODE_ENV  != 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
// const port = process.env.PORT || 3000
const routes = require('./routes/index')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use('/', routes)
app.use(errorHandler)

module.exports = app