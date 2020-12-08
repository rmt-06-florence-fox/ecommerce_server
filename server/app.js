if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const route = require('./routes')
// const errorHandler = require

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(route)

module.exports = app