const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')

router.get('/', ProductController.getProduct)
router.use(authenticate)
router.get('/order', ProductController.getOrder)
router.post('/order', ProductController.addOrder)
router.patch('/order', ProductController.updateQuantity)
router.delete('/order', ProductController.deleteOrder)
router.use(authorize)
router.get('/:id', ProductController.getProductById)
router.post('/', ProductController.addProduct)
router.patch('/:id', ProductController.addStock)
router.put('/:id', ProductController.editProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router