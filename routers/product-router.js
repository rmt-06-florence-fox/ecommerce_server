const router = require('express').Router()
const ProductController = require('../controllers/product-controller.js')

router.get('/', ProductController.fetchAll)
router.post('/', ProductController.addProduct)

module.exports = router