const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const authentication = require('../middlewares/adminAuth')

router.get('/', productController.showAll)
router.use(authentication)
router.post('/', productController.addProduct)
router.get('/:id', productController.showById)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.delete)

module.exports = router