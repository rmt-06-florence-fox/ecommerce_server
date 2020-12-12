if (process.env.NODE_ENV == 'development'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
// const http = require('http')
// const server = http.createServer(app)
// const PORT = 3000

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.use(errorHandler)

// server.listen(PORT, () => {
//     console.log('listen on port ', PORT );
// })
module.exports = app