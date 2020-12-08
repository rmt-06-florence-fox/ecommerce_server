const route = require('express').Router()
const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/ProductController')
const authentification = require('../middlewares/authentification')

route.post('/login', UserController.login)
route.use(authentification)
route.post('/product', authentification, ProductController.addProduct)



module.exports = route