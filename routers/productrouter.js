const router = require('express').Router()
const ProductController = require('../controllers/productcontroller')
const {authentication, productAuthorization} = require('../middleware/auth')

router.use(authentication)

router.get('/', ProductController.getAllProducts)
router.post('/', ProductController.addProduct)
router.get('/category/', ProductController.categoryFilter)

router.get('/:id', productAuthorization, ProductController.getProductById)
router.put('/:id', productAuthorization, ProductController.editProductById)
router.delete(':/id', productAuthorization, ProductController.deleteProduct)

module.exports = router