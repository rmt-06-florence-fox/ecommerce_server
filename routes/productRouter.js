const router = require('express').Router()
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const ProductController = require('../controllers/productController')

router.use(authentication)
router.get('/', ProductController.getAllProduct)
router.use(authorization)
router.post('/', ProductController.createProduct)

module.exports = router