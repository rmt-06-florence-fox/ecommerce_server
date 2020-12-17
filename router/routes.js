const router = require('express').Router()
const UserControl = require('../controller/user')
const ProductControl = require('../controller/product')
const cartrouter = require('./cartsrouter')
const {adminAuthentication} = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/signin', UserControl.signin)
router.post('/signup', UserControl.signup)

router.get('/products', ProductControl.showData)
router.use("/carts", cartrouter)

router.use(adminAuthentication)

router.post('/products', authorization, ProductControl.create)
router.get('/products/:id', ProductControl.getDataById)
router.put('/products/:id', authorization, ProductControl.edit)
router.delete('/products/:id', authorization, ProductControl.deleteData)


module.exports = router