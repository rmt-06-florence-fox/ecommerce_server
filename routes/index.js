const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/login', UserController.login)

router.use(authentication)
router.get('/products', ProductController.getProducts)
router.post('/products', authorization, ProductController.create)
router.put('/products/:id', authorization, ProductController.update)
router.delete('/products/:id', authorization, ProductController.delete)

module.exports = router