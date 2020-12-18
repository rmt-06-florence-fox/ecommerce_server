if (process.env.NODE_ENV !== "production") {require('dotenv').config()}
const express = require('express')
const app = express()
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(express.urlencoded({ extended:false }))
app.use(express.json())
app.use(cors())


app.use(router)
app.use(errorHandler)

module.exports = app