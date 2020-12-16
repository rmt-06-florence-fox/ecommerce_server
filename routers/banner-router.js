const router = require('express').Router()
const BannerController = require('../controllers/banner-controller.js')
const authorization = require('../middlewares/authorization.js')

router.get('/', BannerController.fetchAll)
router.use(authorization)
router.post('/', BannerController.createBanner)
router.put('/:id', BannerController.update)
router.delete('/:id', BannerController.delete)

module.exports = router
