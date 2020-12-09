const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')

router.use(authenticate)
router.use(authorize)
router.post('/', ProductController.addProduct)
router.put('/:id', ProductController.editProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router