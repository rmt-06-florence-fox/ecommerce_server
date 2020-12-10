module.exports = function (err, req, res, next) {
  let status = null
  let name = err.name

  switch (name) {
    case 'SequelizeValidationError':
      status = 400
      error = err.errors.map(el => {
        return el.message
      }).join(', ')
      break;
    case 'Wrong User Password':
      status = 401
      error = 'Invalid email/password'
      break;
    case 'Authentication failed':
      status = 401
      error = 'Authentication failed'
      break;
    case 'Not Authorized':
      status = 403
      error = 'Not Authorized'
      break;
    case 'Not Found':
      status = 404
      error = 'Not Found'
      break;
    default:
      status = 500
      error = 'Internal Server Error'
  }
  res.status(status).json({ error })
}

