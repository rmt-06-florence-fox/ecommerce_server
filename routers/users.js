const router = require('express').Router()
const UsersController = require('../controllers/usersController')

router.post('/login', UsersController.login)

module.exports = router