module.exports = (err, req, res, next) => {
	let status = 500;
	let message = 'Internal Server Error';
	// console.log(err);
	// console.log(err.name);

	if (err.name === 'SequelizeValidationError') {
		status = 400;
		message = [];
		err.errors.forEach((el) => {
			message.push(el.message);
		});
	} else if (err.name === 'SequelizeUniqueConstraintError') {
		status = 400;
		message = 'This Email has been Taken, try another one';
	} else if (err.name === 'InvalidAccountOrPassword') {
		status = 401;
		message = 'Invalid Account Or Password';
	} else if (err.name === 'NotAdmin') {
		status = 401;
		message = 'Only Admin Who Have Authorization for this Action';
	} else if (err.name === 'NotLoginYet') {
		status = 401;
		message = 'Please Login First';
	} else if (err.name === 'JsonWebTokenError') {
		status = 401;
		message = 'Invalid Account Or Password';
	} else if (err.name === 'EmailOrPasswordCannotBeNull') {
		status = 400;
		message = 'Email or Password Cannot be Empty';
	} else if (err.name === 'ProductNotFound') {
		status = 404;
		message = 'Product Not Found';
	} else if (err.name === 'StockCannotBeNull') {
		status = 400;
		message = 'Stock Cannot be Empty';
	} else if (err.name === 'StockCannotLessThanZero') {
		status = 400;
		message = 'Stock cannot Less Than Zero';
	} else if (err.name === 'PriceCannotLessThanZero') {
		status = 400;
		message = 'Price cannot Less Than Zero';
	} else if (err.name === 'ThisForCustomer') {
		status = 401;
		message = 'This Site is For Customer Only';
	} else if (err.name === 'StockNotEnough') {
		status = 400;
		message = 'This Products Stocks is Not Enough';
	} else if (err.name === 'ThisCartQuantityAlreadyOne') {
		status = 400;
		message =
			'This Cart Quantity is Already One, Please use Remove Cart to Delete It';
	} else if (err.name === 'CartNotFound') {
		status = 404;
		message = 'Cart Not Found';
	} else if (err.name === 'YouAlreadyAddThisWishlist') {
		status = 400;
		message = 'You are Already Add This Product to Your Wishlist';
	} else if (err.name === 'WishListNotFound') {
		status = 404;
		message = 'This Wishlist Not Found';
	}
	res.status(status).json({
		message: message,
	});
};
