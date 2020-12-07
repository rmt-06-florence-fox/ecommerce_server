const express = require('express')
const router = express.Router()
const { ProductController } = require('../controllers')
const Authentication = require('../middlewares/authentication')

router.use(Authentication)
router.post('/', ProductController.create)

module.exports = router