const router = require('express').Router()
const Controller = require('../controllers/controller')
const authentic = require('../middlewares/authentication')


router.post('/login', Controller.login)

router.use(authentic)
router.post('/products', Controller.create)
router.put('/products/:id', Controller.update)

module.exports = router