const router = require('express').Router()
const UserController = require('../controllers/user-controller.js')
const productRouter = require('./product-router.js')

router.post('/register', UserController.createUser)
router.post('/login', UserController.login)

router.use('/products', productRouter)

module.exports = router