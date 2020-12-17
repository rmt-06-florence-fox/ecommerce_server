const BannerController = require('../controllers/bannerController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const router = require('express').Router()

router.get('/', BannerController.getBanners)
router.get('/status', BannerController.showActive)

router.use(authentication.user)
router.use(authorization.admin)
router.post('/', BannerController.addBanner)
router.put('/:id', BannerController.editBanner)
router.patch('/:id', BannerController.changeStatus)
router.delete('/:id', BannerController.deleteBanner)

module.exports = router