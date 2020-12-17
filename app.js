if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require('express')
const app = express()
const router = require('./routes')
const errorhandler = require('./middlewares/errorhandler')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(router)
app.use(errorhandler)

module.exports = app