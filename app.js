if (process.env.NODE_ENV != 'production') {require('dotenv').config()}
const express = require('express')
const app = express()
const router = require ('./routers')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(router)


module.exports = app