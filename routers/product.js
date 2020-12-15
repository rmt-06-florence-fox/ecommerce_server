const { Product } = require('../models')
const route = require('express').Router()
const ProductController = require('../controllers/product')
const authentication = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')

route.get('/',ProductController.getProduct)

route.use(authentication)
route.post('/',authorization,ProductController.postProduct)
route.put('/:id',authorization,ProductController.putProduct)
route.delete('/:id',authorization,ProductController.deleteProduct)

module.exports = route