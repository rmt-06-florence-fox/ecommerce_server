const route = require('express').Router()
const {BannerController} = require('../controllers')
const authAdmin = require('../middlewares/authAdmin')

route.get('/', BannerController.findAllBanner)
route.use(authAdmin)
route.get('/:id', BannerController.findByIdBanner)
route.post('/', BannerController.addBanner)
route.put('/:id', BannerController.updateBanner)
route.delete('/:id', BannerController.deleteBanner)


module.exports = route