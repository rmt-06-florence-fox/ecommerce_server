require('dotenv').config
const cors = require('cors')
const express = require('express')
const app = express()
const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(routes)


module.exports = app