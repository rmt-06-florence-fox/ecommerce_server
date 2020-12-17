async function authorize(req, res, next) {
  try {
    const role = req.loggedin.role
    if (role === 'admin') {
      next()
    } else {
      throw {
        status: 401,
        message: 'Unauthorized'
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authorize
