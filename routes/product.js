const router = require('express').Router()
const ProductController = require('../controller/productController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
router.use(authentication)
router.get('/', ProductController.getAll)
router.use(authorization)
router.post('/', ProductController.create)

module.exports = router