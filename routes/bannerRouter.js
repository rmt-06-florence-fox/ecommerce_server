const route = require('express').Router()
const BannerController = require('../controllers/bannerControllers')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

route.use(authentication, authorization)
route.get('/', BannerController.getAllBanner)
route.post('/', BannerController.createBanner)
route.put('/:id', BannerController.editBanner)
route.delete('/:id', BannerController.deleteBanner)

module.exports = route