const route = require('express').Router()
const {BannerController} = require('../controllers')
const authAdmin = require('../middlewares/authAdmin')
const authentication = require('../middlewares/authentication')

route.get('/', BannerController.findAllBanner)
route.use(authentication)
route.get('/:id', authAdmin, BannerController.findByIdBanner)
route.post('/', authAdmin, BannerController.addBanner)
route.put('/:id', authAdmin, BannerController.updateBanner)
route.delete('/:id', authAdmin, BannerController.deleteBanner)


module.exports = route