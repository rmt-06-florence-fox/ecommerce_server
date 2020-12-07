const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

console.log(process.env.TEST)

module.exports = app;