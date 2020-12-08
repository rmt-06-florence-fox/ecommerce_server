const router = require('express').Router()
const { ProductController } = require('../controllers')

router.post('/', ProductController.create)

module.exports = router