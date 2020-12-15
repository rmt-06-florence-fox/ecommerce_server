const routes = require('express').Router()
const roleAuthorization = require('../middlewares/role-authorization')
const { BannerController } = require('../controllers')
const checkid = require('../middlewares/check-bannerid')

// ! authorization
routes.use(roleAuthorization)
routes.post('/banners', BannerController.addBanner)

// ! check id first
routes.use('/banners/:id', checkid)
routes.put('/banners/:id', BannerController.editBanner)
routes.delete('/banners/:id', BannerController.deleteBanner)


module.exports = routes