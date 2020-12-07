if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require('express')
const router = require('./routers')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/' , router)

module.exports = app