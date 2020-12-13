
const express = require('express')
const ProductController = require('../controller/ProductController')
const BannerController = require ('../controller/BannerController')
const authentication = require('../middlewares/authentication')
const authorisation = require('../middlewares/autorisesion')
const router = express.Router()

router.get('/products', ProductController.showAll)
router.get('/banners', BannerController.getAllBanners)
router.use(authentication)
router.use(authorisation)
router.post('/products', ProductController.add)
router.post('/banners', BannerController.addBanner)
router.get('/products/:id', ProductController.getDatabyId)
router.put('/products/:id', ProductController.update)
router.delete('/products/:id', ProductController.delete)
router.delete('/banners/:id', BannerController.deleteBanner)
router.get('/banners/:id', BannerController.getDatabyId)
router.put('/banners/:id', BannerController.update)


module.exports = router