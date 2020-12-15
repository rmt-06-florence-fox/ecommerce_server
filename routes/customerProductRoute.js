const route = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authentication = require('../middlewares/authentication')
const authorizationCustomer = require('../middlewares/authorizationCustomer')

route.use(authentication)
route.patch('/:id', authorizationCustomer, ProductController.patchProduct)
route.delete('/', authorizationCustomer, ProductController.deleteStock)


module.exports = route