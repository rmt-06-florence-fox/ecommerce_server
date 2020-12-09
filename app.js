if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const errHandler = require('./middlewear/errhandler')
const router = require('./routers')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(router)
app.use(errHandler)

module.exports = app