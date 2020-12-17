const router = require('express').Router()
const customerController = require('../controllers/customercontroller')
const cartController = require('../controllers/cartcontroller')

router.get('/', cartController.getAllProducts)
router.post('/register', customerController.register)
router.post('/login', customerController.login)

module.exports = router