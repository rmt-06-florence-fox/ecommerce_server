const route = require('express').Router()
const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/ProductController')
const AdminAuthentification = require('../middlewares/AdminAuthentification')
const authorization = require('../middlewares/authorization')

route.post('/login', UserController.login)
route.use(AdminAuthentification)
route.get('/product', authorization, ProductController.getProduct)
route.post('/product', authorization, ProductController.addProduct)
route.put('/product/:id', authorization, ProductController.editProduct)
route.delete('/product/:id', authorization, ProductController.deleteProduct)
route.get('/product/:id', authorization, ProductController.getProductById)



module.exports = route