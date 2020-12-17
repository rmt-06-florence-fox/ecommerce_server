const router = require('express').Router()
const AdminController = require('../controllers/adminController')
const CustommerController = require('../controllers/customerController')
const CartController = require('../controllers/cartController')
const ProductRoute = require('./productRoute')
const CategoryRoute = require('./categoryRoute')
const BannerRoute = require('./bannerRoute')
const CartRoute = require('./cartRoute')
const WishlishRoute = require('./wishlistRoute')
const authentication = require('../middlewares/authentication')

router.get('/', (req, res) => {
    res.send('halo testing dunia')
})

router.post('/adminRegister', AdminController.register)
router.post('/adminLogin', AdminController.login)
router.post('/customerRegister', CustommerController.register)
router.post('/customerLogin', CustommerController.login)
router.patch('/checkout', authentication.user, CartController.checkout)
router.get('/history', authentication.user, CartController.history)

router.use('/products', ProductRoute)
router.use('/categories', CategoryRoute)
router.use('/banners', BannerRoute)
router.use('/cart', CartRoute)
router.use('/wishlist', WishlishRoute)

module.exports = router