if(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
    require('dotenv').config() // jangan lupa nanti dikasih kondisi untuk deploy
}
const express = require("express")
const app = express()
const routes = require('./routes/index')
const errorHandler = require("./middlewares/errorHandler")
var cors = require('cors')
const PORT = process.env.PORT
 
app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log("I LOVE YOU " + PORT)
})

module.exports = app