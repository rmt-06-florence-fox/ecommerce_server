const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
// const UserController = require('../controllers/userController')

router.use('/admin', userRouter)
// router.post('/register', (req, res) => {
//     console.log(201).json('register success')
// })

module.exports = router