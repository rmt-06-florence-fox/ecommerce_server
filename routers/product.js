const { Product } = require('../models')
const route = require('express').Router()
const ProductController = require('../controllers/product')
const authentication = require('../middlewares/authentication')

route.use(authentication)
route.get('/',authentication,ProductController.getProduct)

module.exports = route