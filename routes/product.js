const router = require('express').Router()
const ProductController = require('../controller/productController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
router.get('/', ProductController.getAll)
router.get('/:id', ProductController.getById)
router.use(authentication)
router.use(authorization)
router.post('/', ProductController.create)
router.put('/:id', ProductController.put)
router.delete('/:id', ProductController.remove)
module.exports = router