const router = require('express').Router();
const { UserController, ProductController } = require('../controller');2,
const authentication = require('../middlewares/authentication');
const isAdmin = require('../middlewares/isAdmin');

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.use(authentication);2,

router.get('/products', ProductController.getProducts);

router.use(isAdmin);

router.post('/products', ProductController.createProduct);

router.put('/products/:id', ProductController.editProduct);

router.patch('/products/:id', ProductController.updateProduct);

router.delete('/products/:id', ProductController.deleteProduct);

module.exports = router;
