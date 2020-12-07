const express = require('express')
const app = express()
const routes = require("./routes/index")
require('dotenv').config()
const errorHandler = require("./middlewares/errorHandler")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", routes)
app.use(errorHandler)


module.exports = app