const route = require('express').Router()
const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/ProductController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const CategoryController = require('../controllers/CategoryController')
const CartController = require('../controllers/CartController')
const cartauthorization = require('../middlewares/cartauthorization')


route.post('/login', UserController.login)
route.post('/signin', UserController.signin)
route.post('/register', UserController.register)
route.get('/product', ProductController.getProduct)
route.get('/category', CategoryController.getCategory)

route.use(authentication)

route.get('/productAdmin', ProductController.getProductAdmin)
route.get('/cart', CartController.getCart)
route.get('/history', CartController.getHistoryCart)
route.post('/cart', CartController.addCart)
route.delete('/cart/:id', cartauthorization, CartController.deleteCart)
route.put('/cart/:id', cartauthorization, CartController.editCart)

route.get('/categoryAdmin', CategoryController.getCategory)
route.post('/category', CategoryController.addCategory)
route.get('/category/:id', CategoryController.getCategoryById)
route.put('/category/:id', CategoryController.editCategory)
route.delete('/category/:id', CategoryController.deleteCategory)

route.post('/product', authorization, ProductController.addProduct)
route.put('/product/:id', authorization, ProductController.editProduct)
route.delete('/product/:id', authorization, ProductController.deleteProduct)
route.get('/product/:id', authorization, ProductController.getProductById)



module.exports = route