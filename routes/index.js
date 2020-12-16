const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const ProductController = require('../controllers/productController')
const BannerController = require('../controllers/bannerController')
const CartController = require('../controllers/cartController')
const HistoryController = require('../controllers/historyController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/admin/login', UserController.loginAdmin)
router.post('/googleLogin', UserController.googleLogin)
router.get('/products', ProductController.getProducts)
router.get('/banners', BannerController.getBanners)
router.use(authentication)
router.get('/carts', CartController.carts)
router.get('/carts/:ProductId', CartController.cartsProductId)
router.post('/carts', CartController.addCarts)
router.post('/carts/decrement', CartController.decrementCarts)
router.delete('/carts/:id', CartController.deleteCarts)
router.get('/history', HistoryController.history)
router.delete('/history', HistoryController.deleteHistory)
router.post('/history', HistoryController.addHistory)
router.put('/products/:id', ProductController.update)


router.get('/products/:id', ProductController.getProductsById)
router.post('/products', authorization, ProductController.create)
router.delete('/products/:id', authorization, ProductController.delete)

router.get('/banners/:id', BannerController.getBannersById)
router.post('/banners', authorization, BannerController.create)
router.put('/banners/:id', authorization, BannerController.update)
router.delete('/banners/:id', authorization, BannerController.delete)


module.exports = router