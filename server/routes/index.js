const router = require('express').Router()
const Controller = require('../controllers/controller')


router.post('/login', Controller.login)
router.post('/products', Controller.create)

module.exports = router