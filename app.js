// if (process.env.NODE_ENV == "development" || process.env.NODE_ENV == "development" ) {
//     require("dotenv").config()
// }

require("dotenv").config()
const express = require("express")
const app = express()
const PORT = 3000
const router = require("./routes/index")
const cors = require('cors')
const errorHandler = require("./middlewares/errorHandler")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`start in port:${PORT}`);
})


module.exports = app