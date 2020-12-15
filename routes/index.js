const route = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const bannerRoutes = require('./banner')
const cartRoutes = require('./cart')

route.use('/', userRoutes)
route.use('/products', productRoutes)
route.use('/banners', bannerRoutes)
route.use('/cart', cartRoutes)

module.exports = route