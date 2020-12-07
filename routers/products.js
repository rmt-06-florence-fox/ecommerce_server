const router = require('express').Router()
const ProductsController = require('../controllers/productsController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', authorization, ProductsController.listProducts)
router.post('/', authorization, ProductsController.addProduct)
router.get('/:id', authorization, ProductsController.findProduct)
router.put('/:id', authorization, ProductsController.updateProduct)
router.delete('/:id', authorization, ProductsController.deleteProduct)

module.exports = router