const router = require('express').Router()
const { ProductController } = require('../controllers')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

router.get('/', ProductController.getAll)
router.use(Authentication.userAuthentication)
router.post('/', ProductController.create)

router.use('/:productId', Authorization.productAuthorization)
router.get('/:productId', ProductController.getOne)
router.put('/:productId', ProductController.update)
router.delete('/:productId', ProductController.delete)

module.exports = router