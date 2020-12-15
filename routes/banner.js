const router = require('express').Router()
const { BannerController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', BannerController.create)
router.get('/', BannerController.getAll)

router.use('/:bannerId', Authorization.bannerAuthorization)
router.get('/:bannerId', BannerController.getOne)
router.put('/:bannerId', BannerController.update)
router.delete('/:bannerId', BannerController.delete)

module.exports = router