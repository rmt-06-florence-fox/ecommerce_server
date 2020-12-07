const router = require('express').Router()
const ProductController = require('../controllers/product-controller.js')

router.post('/', ProductController.addProduct)

module.exports = router