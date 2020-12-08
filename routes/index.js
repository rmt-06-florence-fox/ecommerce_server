const routes = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const authentication = require('../middlewares/authentication')
const categoryRoutes = require('./category')

routes.use(userRoutes)
routes.use(authentication) // ! authentication
routes.use(productRoutes)
routes.use(categoryRoutes)

module.exports = routes