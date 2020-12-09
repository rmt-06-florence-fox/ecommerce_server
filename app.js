require('dotenv').config()
const express = require("express")
const port = process.env.PORT || 3000
const cors = require('cors')
const errorhandler = require ('./middleware/errorhandler')
const router = require('./routers/index')

const app = express()

app.use(cors())
app.use(express.query())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorhandler)

app.use('/', router)
app.listen(port, ()=>{
  console.log(`listening on http://localhost:${port}`);
})

module.exports = app