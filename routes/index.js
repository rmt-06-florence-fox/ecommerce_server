const router = require('express').Router()
const Controller = require('../controllers/controller')
const authentic = require('../middlewares/authentication')
const adminAuthorize = require('../middlewares/adminAuthorize')


router.post('/login', Controller.login)

router.use(authentic)
router.post('/products', adminAuthorize ,Controller.create)
router.put('/products/:id',adminAuthorize, Controller.update)
router.delete('/products/:id',adminAuthorize, Controller.delete)
// router.get('/products/:id',adminAuthorize, Controller.getData)
router.get('/products',adminAuthorize, Controller.fetchData)

module.exports = router