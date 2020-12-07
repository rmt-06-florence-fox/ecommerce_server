const route = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const authentication = require('../middlewares/authentication')

route.use('/', userRoutes)
route.use(authentication)
route.use('/products', productRoutes)

module.exports = route