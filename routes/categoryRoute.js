const router = require('express').Router()
const CategoryController = require('../controllers/categoryController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', CategoryController.allCategories)

router.use(authentication.user)
router.use(authorization.admin)
router.post('/', CategoryController.addCategory)
router.delete('/:id', CategoryController.deleteCategory)


module.exports = router