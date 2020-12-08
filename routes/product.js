const router = require('express').Router()
const { ProductController } = require('../controllers')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', ProductController.create)

module.exports = router