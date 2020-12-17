const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/register', UserController.registCust)
router.post('/login', UserController.loginCust)

module.exports = router