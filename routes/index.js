const routes = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const authentication = require('../middlewares/authentication')
const categoryRoutes = require('./category')
const bannerRoutes = require('./banner')

routes.use(userRoutes)
routes.use(authentication) // ! authentication
routes.use(productRoutes)
routes.use(categoryRoutes)
routes.use(bannerRoutes)

module.exports = routes