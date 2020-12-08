module.exports = (req, res, next) => {
	if (req.loggedInUser.role === 'admin') {
		next();
	} else {
		const errorName = 'NotAdmin';
		next({
			name: errorName,
		});
	}
};
