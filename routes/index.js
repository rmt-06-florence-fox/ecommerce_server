const router = require('express').Router()
const {UserController} = require('../controllers')
const {ProductController} = require('../controllers')
const authentication = require('../middlewares/authentication')


router.post('/login', UserController.login)

router.use(authentication)
router.get('/products', ProductController.fetch)
router.post('/products', ProductController.add)
router.get('/products/:id', ProductController.fetchById)
router.put('/products/:id', ProductController.update)
router.delete('/products/:id', ProductController.destroy)

module.exports = router