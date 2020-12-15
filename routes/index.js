const routes = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const authentication = require('../middlewares/authentication')
const categoryRoutes = require('./category')
const bannerRoutes = require('./banner')
const cartRoutes = require('./cart')
const transactionRoutes = require('./transaction')
const customerLanding = require('./landing')


// ? Customer can see this without login
routes.use(customerLanding)
routes.use(userRoutes)

// ? After this only logged in user can access 
routes.use(authentication) // ! authentication

// ? Customer routes
routes.use(transactionRoutes)
routes.use(cartRoutes)

// ? Admin routes
routes.use(productRoutes)
routes.use(categoryRoutes)
routes.use(bannerRoutes)

module.exports = routes