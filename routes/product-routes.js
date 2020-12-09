const router = require('express').Router()
const {ProductController } = require('../controllers')

router.post('/',ProductController.create)
router.get('/', ProductController.getlist)
// router.get('/:id',ProductController.getById )
router.put('/:id',ProductController.dataUpdate)
// router.patch('/:id',ProductController.stockUpdate) //Next feature
router.delete('/:id', ProductController.delete)

module.exports= router
