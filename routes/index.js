const router = require('express').Router();
const {
	UserController,
	ProductController,
	CartController,
	WishlistController,
} = require('../controller');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.post('/loginUser', UserController.loginUser);

router.get('/products', ProductController.getProducts);

router.get('/products/:id', ProductController.getProductById);

router.use(authentication);

router.post('/carts/:productId', CartController.addCart);

router.patch('/minusCart/:cartId', CartController.minusCart);

router.delete('/deleteCart/:cartId', CartController.removeCart);

router.get('/carts', CartController.getCart);

router.post('/wishlists/:productId', WishlistController.addWishlist);

router.delete('/wishlists/:wishlistId', WishlistController.deleteWishlist);

router.get('/wishlists', WishlistController.getWishlists);

// router.use(authorization);

router.post('/products', authorization, ProductController.createProduct);

router.put('/products/:id', authorization, ProductController.editProduct);

router.patch('/products/:id', authorization, ProductController.updateProduct);

router.delete('/products/:id', authorization, ProductController.deleteProduct);

module.exports = router;
