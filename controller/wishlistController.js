const { Wishlist, Product } = require("../models");

class WishlistController {
	static getWishlists(req, res, next) {
		const UserId = req.loggedInUser.id;
		console.log("Tas Baru");
		Wishlist.findAll({
			where: {
				UserId,
			},
			include: [Product],
		})
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((err) => {
				next(err);
			});
	}

	static addWishlist(req, res, next) {
		const UserId = req.loggedInUser.id;
		const ProductId = req.params.productId;
		console.log("Tas Baru");
		const newWishlist = {
			UserId,
			ProductId,
		};
		Product.findOne({
			where: {
				id: ProductId,
			},
		})
			.then((data) => {
				if (!data) {
					next({
						name: "ProductNotFound",
					});
				} else {
					console.log("Tas Baru");
					return Wishlist.findOne({
						where: {
							UserId,
							ProductId,
						},
					});
				}
			})
			.then((data) => {
				if (data) {
					next({
						name: "YouAlreadyAddThisWishlist",
					});
				} else {
					return Wishlist.create(newWishlist);
				}
			})
			.then((data) => {
				console.log("Tas Baru");
				res.status(201).json({
					message: "Success add this Product to Your Wishlist",
				});
			})
			.catch((err) => {
				next(err);
			});
	}

	static deleteWishlist(req, res, next) {
		const wishlistId = req.params.wishlistId;
		const UserId = req.loggedInUser.id;
		console.log("Tas Baru");
		Wishlist.findOne({
			where: {
				id: wishlistId,
				UserId,
			},
		})
			.then((data) => {
				if (!data) {
					console.log("Tas Baru");
					next({
						name: "WishListNotFound",
					});
				} else {
					return Wishlist.destroy({
						where: {
							id: wishlistId,
						},
					});
				}
			})
			.then((data) => {
				console.log("Tas Baru");
				res.status(200).json({
					message: "Success Remove this Product from Your Wishlist",
				});
			})
			.catch((err) => {
				next(err);
			});
	}
}

module.exports = WishlistController;
