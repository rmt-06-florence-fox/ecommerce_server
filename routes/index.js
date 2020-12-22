const router = require ('express').Router()
const UserController = require ('../controllers/userController')
const productRoute = require ('./productRoute')

router.post ("/login", UserController.login)
router.use ('/products', productRoute)

module.exports = router