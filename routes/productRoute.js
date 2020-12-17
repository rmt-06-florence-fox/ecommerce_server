const router = require('express').Router()
const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', ProductController.allProducts)
router.use(authentication.user)
router.post('/', authorization.admin, ProductController.addProduct)
router.put('/:id', authorization.admin, ProductController.editProduct )
router.delete('/:id', authorization.admin, ProductController.deleteProduct)

module.exports = router