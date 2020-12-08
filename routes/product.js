const router = require('express').Router()
const { ProductController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', ProductController.create)
router.get('/', ProductController.getAll)




router.use('/:id', authorization)
router.get('/:id', ProductController.getOne)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)

module.exports = router