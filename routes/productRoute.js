const ProductController = require('../controllers/productController')

const route = require('express').Router()
const authenctication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

route.get('/', ProductController.getAllProduct)
route.use(authenctication, authorization)
route.post('/', ProductController.createProduct)
route.get('/:id', ProductController.getProductById)
route.put('/:id', ProductController.editProduct)
route.patch('/:id', ProductController.updateStock)
route.delete('/:id', ProductController.deleteStock)
module.exports = route