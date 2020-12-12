const router = require('express').Router()
const UserController = require('../controllers/user-controller.js')
const productRouter = require('./product-router.js')
const bannerRouter = require('./banner-router.js')
const authentication = require('../middlewares/authentication')

router.post('/register', UserController.createUser)
router.post('/login', UserController.login)

router.use(authentication)
router.use('/products', productRouter)
router.use('/banners', bannerRouter)

module.exports = router
