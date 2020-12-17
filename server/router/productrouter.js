
const express = require('express')
const ProductController = require('../controller/ProductController')
const CategoryController = require('../controller/CategoryController')
const BannerController = require ('../controller/BannerController')
const authentication = require('../middlewares/authentication')
const authorisation = require('../middlewares/authorisCust')
const router = express.Router()

router.get('/category', CategoryController.findAll)
router.get('/products', ProductController.showAll)
router.get('/banner', BannerController.getAllBanners)
router.get('/banner/:bannerId', BannerController.getDatabyId)
router.use(authentication)
router.use(authorisation)
router.post('/products', ProductController.add)
router.post('/banner', BannerController.addBanner)
router.get('/products/:id', ProductController.getDatabyId)
router.put('/products/:id', ProductController.update)
router.delete('/products/:id', ProductController.delete)
router.delete('/banner/bannerId', BannerController.deleteBanner)
router.put('/banner/:bannerId', BannerController.update);
router.put('/banner/:id', BannerController.update)


module.exports = router