const router = require('express').Router()
const AdminController = require('../controllers/AdminController')
const ProductController = require('../controllers/ProductController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.post('/login',AdminController.login)

router.use(authentication)
router.post('/product', authorization, ProductController.create)
router.get('/product', ProductController.readData)
router.put('/product/:id', authorization, ProductController.editData)
router.delete('/product/:id',authorization, ProductController.deleteData)

module.exports = router