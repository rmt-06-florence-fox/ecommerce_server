if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const router = require ('./routers')
const errHandler = require ('./middlewares/errHandler')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(router)
app.use(errHandler)


module.exports = app