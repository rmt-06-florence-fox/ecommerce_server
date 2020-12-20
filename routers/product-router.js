const router = require('express').Router()
const ProductController = require('../controllers/product-controller.js')
const authorization = require('../middlewares/authorization.js')

router.get('/', ProductController.fetchAll)

router.use(authorization)
router.post('/', ProductController.addProduct)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)

module.exports = router