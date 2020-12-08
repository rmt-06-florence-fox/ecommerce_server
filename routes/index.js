const router = require('express').Router()
const AdminController = require('../controllers/adminController')
const CustommerController = require('../controllers/customerController')
const ProductRoute = require('./productRoute')
const CategoryRoute = require('./categoryRoute')


router.post('/adminRegister', AdminController.register)
router.post('/adminLogin', AdminController.login)
router.post('/customerRegister', CustommerController.register)
router.post('/customerLogin', CustommerController.login)
router.use('/products', ProductRoute)
router.use('/category', CategoryRoute)

module.exports = router