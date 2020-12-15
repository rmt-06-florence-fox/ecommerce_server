const express = require('express')
const router = express.Router()
const { CartController } = require('../controllers')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', CartController.addOrEditCart)

module.exports = router