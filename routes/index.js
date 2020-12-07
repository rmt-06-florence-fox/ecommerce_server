const router = require('express').Router()
const AdminController = require('../controllers/adminController')

router.post('/adminRegister', AdminController.register)
router.post('/adminLogin', AdminController.login)

module.exports = router