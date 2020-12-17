const express = require("express")
const app = express()
const cors = require('cors')
const route = require('./routes/index')
const errorhandler = require('./middlewares/errorhandler')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', route)
app.use(errorhandler)


module.exports = app