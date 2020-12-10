if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express")
const app = express()
const routes = require("./Routes")
const cors = require("cors")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use("/", routes)

app.use((err, req, res, next) => {
    // console.log(err)
    // console.log(err.name, "Masuk error handling")
    if (err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({msg: err.errors[0].message})
    } else if (err.name === "SequelizeValidationError") {
        res.status(400).json({msg: err.errors[0].message})
    } else if (err.name === "Invalid Account") {
        res.status(401).json({msg: err.name})
    } else if (err.name === "DataNotFound") {
        res.status(404).json({msg: err.name})
    } else if (err.name === "Login First") {
        res.status(401).json({msg: err.name})
    } else if (err.name === "Not Authorized") {
        res.status(401).json({msg: "You Are Not Authorized"})
    } else {
        res.status(500).json({msg: "Internal Service Error"})
        console.log(err, "error handler")
    }
})

module.exports = app