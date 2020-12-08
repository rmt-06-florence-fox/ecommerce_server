const express = require("express")
const app = express()
const route = require('./routes/index')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', route)


module.exports = app