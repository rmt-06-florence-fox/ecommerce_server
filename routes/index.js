const routes = require('express').Router()
const userRoute = require('./user')
const producRoute = require('./product')

routes.use('/', userRoute)
routes.use('/product',producRoute)


module.exports = routes