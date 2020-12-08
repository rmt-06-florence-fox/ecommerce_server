require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require ("./routes")
const errorhandler = require ('./middlewares/errorhandler.js')

app.use (express.urlencoded({extended:false}))
app.use(express.json())
app.use ('/', router)
app.use (errorhandler)

module.exports = app