const router = require('express').Router()
const UsersController = require('../controllers/usersController')

router.post('/login', UsersController.login)
router.post('/loginCustomer', UsersController.loginCustomer)
router.post('/registerCustomer', UsersController.registerCustomer)

module.exports = router