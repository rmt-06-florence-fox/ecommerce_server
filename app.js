if(process.NODE_ENV !=='production')
   require('dotenv').config()

const express = require('express')
const app = express();
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/',router)
app.use(errorHandler)

module.exports = app