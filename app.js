if(process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
const express = require('express')
const app = express()
const cors = require('cors')
const { urlencoded } = require('express')
const routes = require('./routes/index')
const port = process.env.PORT
const errorHandler = require('./middlewares/errorHandler')

//Body Parcers
app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true}))

//middlewares
app.use('/', routes)
app.use(errorHandler.handle)

app.listen(port, () => console.log(port))

module.exports = app