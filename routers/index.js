const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const userAuthorization = require('../middlewares/userAuthorization');
const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController');
const CategoryController = require('../controllers/CategoryController');
const CartController = require('../controllers/CartController');

router.post('/register', UserController.register);
router.post('/admin/login', UserController.login);
router.post('/user/login', UserController.userLogin)

router.get('/products', ProductController.getAll);
router.get('/categories', CategoryController.getAll);

router.use(authentication);

router.get('/carts', userAuthorization, CartController.getCart)
router.post('/carts', userAuthorization, CartController.add)
router.patch('/carts/minus/:id', userAuthorization, CartController.minus)
router.patch('/carts/plus/:id', userAuthorization, CartController.plus)
router.delete('/carts/:id', userAuthorization, CartController.delete)

router.get('/transactions', userAuthorization, CartController.getTransactionsUser)
router.get('/transaction/:id', userAuthorization, CartController.getOneTransaction)
router.post('/transaction', userAuthorization, CartController.addTrans)
router.delete('/transaction/:id', userAuthorization, CartController.deleteTrans)

router.use(authorization);
router.post('/categories', CategoryController.add);
router.get('/categories/:id', CategoryController.getOne);
router.put('/categories/:id', CategoryController.edit);
router.delete('/products/:id', CategoryController.delete);

router.get('/admin/transactions', CartController.getTransactions)

router.post('/products', ProductController.add);
router.get('/products/:id', ProductController.getOne);
router.put('/products/:id', ProductController.edit);
router.delete('/products/:id', ProductController.delete);

module.exports = router