const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use(authentication);

router.get('/products', ProductController.getAll);

router.use(authorization);
router.post('/products', ProductController.add);
router.get('/products/:id', ProductController.getOne);
router.put('/products/:id', ProductController.edit);
router.delete('/products/:id', ProductController.delete);

module.exports = router