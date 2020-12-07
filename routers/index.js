const router = require('express').Router()
const UserController = require('../controllers/user-controller.js')

router.post('/register', UserController.createUser)
router.post('/login', UserController.login)

module.exports = router