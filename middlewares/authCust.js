function authorizeCust (req, res, next) {
  try {
    if (req.loggedIn.role === "customer"){
      next()
    }
    else {
      throw({
        status: 401,
        message: "You are not authorized"
      })
    }
  }
  catch {
    console.log(err.message + " <<< ini dari authorize cust")
    next(err)
  }
}

module.exports = authorizeCust