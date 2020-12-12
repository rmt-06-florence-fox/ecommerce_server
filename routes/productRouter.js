const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
// const authorization = require('../middlewares/authorize')

router.get('/', productController.showAll)
router.post('/', productController.addProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.delete)

module.exports = router