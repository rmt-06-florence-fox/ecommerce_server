const product = require('express').Router()
const ProductController = require('../controllers/productcontroller')
const { authentication } = require('../middlewares')

product.get('/', ProductController.getProduct)

product.use(authentication)
product.post('/', ProductController.createProduct)

module.exports = product