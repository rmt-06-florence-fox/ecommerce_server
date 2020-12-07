const express = require('express')
const router = express.Router()
const { ProductController } = require('../controllers')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

router.use(Authentication)

router.use(Authorization)
router.post('/', ProductController.create)

module.exports = router