const router = require('express').Router()
const {ProductController } = require('../controllers')
const { Authentication } = require('../middlewares')

router.get('/', ProductController.getlist)
router.use(Authentication)
router.post('/',ProductController.create)
router.put('/:id',ProductController.dataUpdate)
router.delete('/:id', ProductController.delete)
// router.get('/:id',ProductController.getById )
// router.patch('/:id',ProductController.stockUpdate) //Next feature

module.exports= router
