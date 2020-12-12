const route = require('express').Router()
const productRoute = require('./productRoute')
const categoryRoute = require('./categoryRoute')
const UserController = require('../controllers/UserController')
const ProductCategoryController = require('../controllers/ProductCategory')

route.use('/products', productRoute)
route.use('/categories', categoryRoute)
route.post('/login', UserController.login)
route.post('/productCategory', ProductCategoryController.add)
route.put('/editProductCategory/:id', ProductCategoryController.edit)

module.exports = route