require("dotenv").config()

const express = require("express")
const app = express()
const routes = require("./Routes")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/", routes)

app.use((err, req, res, next) => {
    // console.log(err.name, "Masuk error handling")
    if (err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({msg: err.errors[0].message})
    } else if (err.name === "SequelizeValidationError") {
        res.status(400).json({msg: err.errors[0].message})
    } else if (err.name === "Invalid Account") {
        res.status(401).json({msg: err.name})
    }
})

module.exports = app