const router = require('express').Router()
const { ProductController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', ProductController.create)
router.get('/', ProductController.getAll)

router.use('/:productId', Authorization.productAuthorization)
router.get('/:productId', ProductController.getOne)
router.put('/:productId', ProductController.update)
router.delete('/:productId', ProductController.delete)

module.exports = router