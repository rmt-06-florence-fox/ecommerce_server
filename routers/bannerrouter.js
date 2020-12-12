const router = require('express').Router()
const BannerController = require('../controllers/bannercontroller')
const {authentication, bannerAuthorization} = require('../middleware/auth')

router.use(authentication)

router.get('/', BannerController.getAllBanners)
router.post('/', BannerController.addBanner)

router.get('/:id', bannerAuthorization, BannerController.getBannerById)
router.put('/:id', bannerAuthorization, BannerController.editBannerById)
router.delete('/:id', bannerAuthorization, BannerController.deleteBanner)

module.exports = router