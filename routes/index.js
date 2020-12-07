const route = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')

route.use('/', userRoutes)
route.use('/products', productRoutes)

module.exports = route