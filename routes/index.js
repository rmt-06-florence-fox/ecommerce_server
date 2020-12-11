const router = require('express').Router()
const { UserController } = require('../controllers')
const { ProductController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/login', UserController.login)

router.use(authentication)
router.post('/products', authorization, ProductController.input)
router.get('/products', ProductController.show)
router.get('/products/:id', ProductController.showById)
router.put('/products/:id', authorization, ProductController.update)
router.delete('/products/:id', authorization, ProductController.delete)

module.exports = router