const verifyToken = require("../helpers/verifyToken")
const { User, Admin } = require("../models")

function authenticateUser(req, res, next){
  try {
    const { access_token } = req.headers

    if(!access_token){
      throw({
        status: 401,
        message: "Please login first"
      })
    }
    else {
      const decoded = verifyToken(access_token)
      User.findOne({
        where: {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role
        }
      })
        .then(user => {
          if(user){
            req.loggedInUser = decoded
            next()
          }
          else {
            return Admin.findOne({
              where: {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role
              }
            })
          }
        })
        .then(admin => {
          if(admin) {
            req.loggedInAdmin = decoded
            next()
          }
          else {
            throw({
              status: 401,
              message: "You must login first"
            })
          }
        })
        .catch(error => {
          next(error)
        })
    }
  } catch (error) {
      next(error)
  }
}

module.exports = authenticateUser