const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
	static register(req, res, next) {
		const { email, password } = req.body;
		User.create({
			email,
			password,
		})
			.then((user) => {
				res.status(201).json({
					id: user.id,
					email: user.email,
				});
			})
			.catch((err) => {
				next(err);
			});
	}

	static login(req, res, next) {
		// res.status(200).json('masuk');
		const email = req.body.email;
		const password = req.body.password;
		if (!email || !password) {
			const errorName = 'EmailOrPasswordCannotBeNull';
			next({
				name: errorName,
			});
		}
		User.findOne({
			where: {
				email,
			},
		})
			.then((user) => {
				if (user && comparePassword(password, user.password)) {
					const access_token = generateToken({
						id: user.id,
						email: user.email,
						role: user.role,
					});
					// console.log(access_token);
					res.status(200).json({ access_token });
				} else {
					const errorName = 'InvalidAccountOrPassword';
					next({
						name: errorName,
					});
				}
			})
			.catch((err) => {
				next(err);
			});
	}

	static loginUser(req, res, next) {
		// res.status(200).json('masuk');
		const email = req.body.email;
		const password = req.body.password;
		if (!email || !password) {
			const errorName = 'EmailOrPasswordCannotBeNull';
			next({
				name: errorName,
			});
		}
		User.findOne({
			where: {
				email,
			},
		})
			.then((user) => {
				if (user && comparePassword(password, user.password)) {
					if (user.role === 'admin') {
						const errorName = 'ThisForCustomer';
						next({
							name: errorName,
						});
					} else {
						const access_token = generateToken({
							id: user.id,
							email: user.email,
							role: user.role,
						});
						// console.log(access_token);
						res.status(200).json({ access_token });
					}
				} else {
					const errorName = 'InvalidAccountOrPassword';
					next({
						name: errorName,
					});
				}
			})
			.catch((err) => {
				next(err);
			});
	}
}

module.exports = UserController;
