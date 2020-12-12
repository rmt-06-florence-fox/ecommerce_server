const route = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const bannerRoutes = require('./banner')
const authentication = require('../middlewares/authentication')

route.use('/', userRoutes)
route.use(authentication)
route.use('/products', productRoutes)
route.use('/banners', bannerRoutes)

module.exports = route