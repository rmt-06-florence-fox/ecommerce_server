const UserController = require('../controllers/userController')
const productionRoute = require('./productRoute')
const bannerRoute = require('./bannerRouter')
const categoryRoute = require('./categoryRouter')
const cartRoute = require('../routes/cartRouter')
const route = require('express').Router()


route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.post('/customerLogin', UserController.customerLogin)
route.use('/products', productionRoute)
route.use('/banner', bannerRoute)
route.use('/category', categoryRoute)
route.use('/cart', cartRoute)
module.exports = route  