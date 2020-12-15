const routes = require('express').Router()
const userRoute = require('./user')
const producRoute = require('./product')
const cartRoute = require('./cart')

routes.use('/', userRoute)
routes.use('/product',producRoute)
routes.use('/cart', cartRoute)

module.exports = routes