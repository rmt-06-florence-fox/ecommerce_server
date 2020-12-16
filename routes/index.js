const route = require('express').Router()
const productRoute = require('./productRoute')
const categoryRoute = require('./categoryRoute')
const userProductRoute = require('./userProductRoute')
const TransactionRoute = require('./transactionRoute')
const UserController = require('../controllers/UserController')
const ProductCategoryController = require('../controllers/ProductCategory')

route.use('/products', productRoute)
route.use('/categories', categoryRoute)
route.use('/carts', userProductRoute)
route.use('/transactions', TransactionRoute)
route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.post('/productCategory', ProductCategoryController.add)
route.put('/editProductCategory/:id', ProductCategoryController.edit)

module.exports = route