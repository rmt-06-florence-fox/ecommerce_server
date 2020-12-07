const routes = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const authentication = require('../middlewares/authentication')

routes.use(userRoutes)
routes.use(authentication) // ! authentication
routes.use(productRoutes)

module.exports = routes