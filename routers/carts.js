const router = require('express').Router()
const CartsController = require('../controllers/cartsController')
const authentication = require('../middlewares/authentication')
const {authorizationCustomer} = require('../middlewares/authorization')

router.use(authentication)
router.get('/', authorizationCustomer, CartsController.listCarts)
router.post('/', authorizationCustomer, CartsController.addCart)
router.get('/:id', authorizationCustomer, CartsController.findCart)
router.patch('/:id', authorizationCustomer, CartsController.updateCart)
router.post('/checkout', authorizationCustomer, CartsController.checkout)
router.delete('/:id', authorizationCustomer, CartsController.deleteCart)

module.exports = router