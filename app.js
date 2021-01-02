if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}
const cors = require('cors')
const express = require('express')
const app = express()
const router = require('./routes')
const errorhandler = require('./middlewares/errorhandler')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)
app.use(errorhandler)

module.exports = app