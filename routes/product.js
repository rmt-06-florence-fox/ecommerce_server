const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')

router.use(authenticate)
router.get('/', ProductController.getProduct)
router.get('/:id', ProductController.getProductById)
router.use(authorize)
router.post('/', ProductController.addProduct)
router.patch('/:id', ProductController.addStock)
router.put('/:id', ProductController.editProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router