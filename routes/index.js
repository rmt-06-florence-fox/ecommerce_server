const routes = require('express').Router()
const productRoutes = require('./productRoutes')
const userRoutes = require('./userRoutes')
const cartRoutes = require('./cartRoutes')

routes.use('/',userRoutes)
routes.use('/product',productRoutes)
routes.use('/cart',cartRoutes)




module.exports = routes