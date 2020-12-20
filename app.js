if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}
const errorHandler = require('./middlewares/error-handler.js')
const express = require('express')
const router = require('./routers')
const app = express()
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/' , router)
app.use(errorHandler)

module.exports = app