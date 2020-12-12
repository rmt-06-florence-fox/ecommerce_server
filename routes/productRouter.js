const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
// const authorization = require('../middlewares/authorize')

router.get('/products', productController.showAll)
router.post('/products', productController.addProduct)
router.put('/products/:id', productController.updateProduct)
router.delete('/products/:id', productController.delete)

module.exports = router