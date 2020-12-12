const route = require('express').Router()
const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/ProductController')
const AdminAuthentification = require('../middlewares/AdminAuthentification')
const authorization = require('../middlewares/authorization')

route.post('/login', UserController.login)
route.get('/product', ProductController.getProduct)
route.post('/product', AdminAuthentification, ProductController.addProduct)
route.put('/product/:id', AdminAuthentification, authorization, ProductController.editProduct)
route.delete('/product/:id', AdminAuthentification, authorization, ProductController.deleteProduct)
route.get('/product/:id', AdminAuthentification, authorization, ProductController.getProductById)



module.exports = route