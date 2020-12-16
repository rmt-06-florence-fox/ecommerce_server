const product = require('express').Router()
const ProductController = require('../controllers/productcontroller')
const { Auth } = require('../middlewares')

product.get('/', ProductController.getProduct)

product.use(Auth.authentication)
product.post('/', ProductController.createProduct)

product.use('/:id', Auth.authorizeAdmin)
product.get('/:id', ProductController.getProductById)
product.put('/:id', ProductController.updateProduct)
product.delete('/:id', ProductController.deleteProduct)

module.exports = product