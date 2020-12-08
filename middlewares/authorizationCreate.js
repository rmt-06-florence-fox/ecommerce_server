function authorizeAdmin (req, res, next) {
  try {
    if (req.loggedInAdmin){
      next()
    }
    else {
      throw({
        status: 401,
        message: "You are not authorized"
      })
    }
  }
  catch (error){
    next(error)
  }
}

module.exports = authorizeAdmin