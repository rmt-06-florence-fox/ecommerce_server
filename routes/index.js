const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const ProductController = require('../controllers/productController')
const BannerController = require('../controllers/bannerControlle')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)
router.use(authentication)
router.get('/products', ProductController.getProducts)
router.get('/products/:id', ProductController.getProductsById)
router.post('/products', authorization, ProductController.create)
router.put('/products/:id', authorization, ProductController.update)
router.delete('/products/:id', authorization, ProductController.delete)

router.get('/banners', BannerController.getBanners)
router.get('/banners/:id', BannerController.getBannersById)
router.post('/banners', authorization, BannerController.create)
router.put('/banners/:id', authorization, BannerController.update)
router.delete('/banners/:id', authorization, BannerController.delete)


module.exports = router