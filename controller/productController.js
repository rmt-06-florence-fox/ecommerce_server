const { Product } = require("../models");

class ProductController {
	static getProducts(req, res, next) {
		Product.findAll({
			order: [["id", "ASC"]],
		})
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((err) => {
				next(err);
			});
	}

	static getProductById(req, res, next) {
		const id = req.params.id;
		Product.findOne({
			where: {
				id,
			},
		})
			.then((data) => {
				if (!data) {
					const errorName = "ProductNotFound";
					next({
						name: errorName,
					});
				} else {
					res.status(200).json(data);
				}
			})
			.catch((err) => {
				next(err);
			});
	}

	static createProduct(req, res, next) {
		const newProduct = {
			name: req.body.name,
			image_url: req.body.image_url,
			price: req.body.price,
			stock: req.body.stock,
		};
		if (req.body.stock < 0) {
			const errorName = "StockCannotLessThanZero";
			next({
				name: errorName,
			});
		} else if (req.body.price < 0) {
			const errorName = "PriceCannotLessThanZero";
			next({
				name: errorName,
			});
		} else {
			Product.create(newProduct)
				.then((data) => {
					res.status(201).json(data);
				})
				.catch((err) => {
					next(err);
				});
		}
	}

	static editProduct(req, res, next) {
		const id = req.params.id;
		const editProduct = {
			name: req.body.name,
			image_url: req.body.image_url,
			price: req.body.price,
			stock: req.body.stock,
		};

		if (req.body.stock < 0) {
			const errorName = "StockCannotLessThanZero";
			next({
				name: errorName,
			});
		} else if (req.body.price < 0) {
			const errorName = "PriceCannotLessThanZero";
			next({
				name: errorName,
			});
		} else {
			Product.findOne({
				where: {
					id,
				},
			})
				.then((data) => {
					if (!data) {
						const errorName = "ProductNotFound";
						next({
							name: errorName,
						});
					} else {
						return Product.update(editProduct, {
							where: {
								id,
							},
							returning: true,
						});
					}
				})
				.then((data) => {
					res.status(200).json(data[1][0]);
				})
				.catch((err) => {
					next(err);
				});
		}
	}

	static updateProduct(req, res, next) {
		const id = req.params.id;
		const updateProduct = {
			stock: req.body.stock,
		};

		if (req.body.stock < 0) {
			const errorName = "StockCannotLessThanZero";
			next({
				name: errorName,
			});
		} else {
			Product.findByPk(id)
				.then((data) => {
					if (data) {
						return Product.update(updateProduct, {
							where: {
								id,
							},
							returning: true,
						});
					} else {
						const errorName = "ProductNotFound";
						next({
							name: errorName,
						});
					}
				})
				.then((data) => {
					res.status(200).json(data[1][0]);
				})
				.catch((err) => {
					next(err);
				});
		}
	}

	static deleteProduct(req, res, next) {
		const id = req.params.id;
		Product.findByPk(id)
			.then((data) => {
				if (data) {
					return Product.destroy({
						where: {
							id,
						},
					});
				} else {
					res.status(404).json({
						message: "Product Not Found",
					});
				}
			})
			.then((data) => {
				const message = "Product Deleted";
				res.status(200).json({
					message,
				});
			})
			.catch((err) => {
				next(err);
			});
	}
}

module.exports = ProductController;
