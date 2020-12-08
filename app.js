const { request } = require("express");

if(process.env.NODE_ENV !== "production"){
  require("dotenv").config()
}
const express = require("express")
const app = express()
const router = require("./routers/index.js")
const errorHandler = require("./middlewares/errorHandler");


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(router)
app.use(errorHandler)

module.exports = app