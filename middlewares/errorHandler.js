module.exports = function (err, request, response, next) {
	let status = null;
	let name = err.name;

	switch (name) {
		case "SequelizeValidationError":
			status = 400;
			message = err.errors.map(el => {
				return el.message
			}).join(", ");
			break;

		case "email not found":
			status = 404;
			message = 'Invalid Email / Password'
			break;

		case "empty email":
			status = 400;
			message = "Email cannot be empty!"
			break;

		case "empty password":
			status = 400;
			message = "Password cannot be empty!"
			break;

		case "InvalidEmailPassword":
			status = 400;
			message = "Email or Password is Invalid!";
			break;


		case "AuthenticationFailed":
			status = 401;
			message = "Authentication failed!"
			break;

		case "Unauthorized":
			status = 403;
			message = "Unauthorized action!"
			break;

		case "NotFound":
			status = 404;
			message = "Not found!"
			break;

		default:
			status = 500;
			message = "Internal Server Error!"
	}
	console.log(err);
	response.status(status).json({ message });
}