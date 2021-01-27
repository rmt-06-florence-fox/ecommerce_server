const express = require('express')
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', router)
app.use(errorHandler)

module.exports = app
