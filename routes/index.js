const route = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const bannerRoutes = require('./banner')
const cartRoutes = require('./cart')
const wishListRoutes = require('./wishlist')
const historyRoute = require('./history')

route.use('/', userRoutes)
route.use('/products', productRoutes)
route.use('/banners', bannerRoutes)
route.use('/cart', cartRoutes)
route.use('/wishlist', wishListRoutes)
route.use('/history', historyRoute)

module.exports = route