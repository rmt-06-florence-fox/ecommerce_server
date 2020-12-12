const errorHandler = (err, req, res, next) => {
  let statusCode;
  let messages;

  switch (err.name) {
    case "SequelizeValidationError":
      statusCode = 400;
      let errors = []
      err.errors.forEach(element => {
        errors.push(element.message)
      });
      messages = errors.join(', ')
      break;
    case "JsonWebTokenError":
      statusCode = 401;
      messages = "You have to login first"
      break;
    case "NOT_FOUND":
      statusCode = 404;
      messages = "Error Not Found"
      break;
    case "INVALID_EMAIL_PASS":
      statusCode = 400;
      messages = "Email or password is incorrect"
      break;
    case "ACCESS_DENIED":
      statusCode = 403;
      messages = "User not Authenticated"
      break;
    case "AUTH_FAILED":
      statusCode = 401;
      messages = "User not Authenticated"
      break;
    default:
      statusCode = 500;
      messages = "Internal Server Error"
      break;
  }

  console.log(err)

  res.status(statusCode).json(messages)
  
}

module.exports = errorHandler