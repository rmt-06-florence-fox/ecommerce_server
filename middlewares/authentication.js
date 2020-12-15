const verifyToken = require("../helpers/verifyToken")
const { User, Admin } = require("../models")

function authenticateAdmin(req, res, next){
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
      Admin.findOne({
        where: {
          id: decoded.id,
          email: decoded.email
        }
      })
        .then(admin => {
          if(admin){
            return admin
          }
          else {
            return User.findOne({
              where: {
                id: decoded.id,
                email: decoded.email
              }
            })
          }
        })
        .then(user => {
          if (user) {
            req.loggedIn = decoded
            console.log(req.loggedIn)
            next()
          }
          else {
            throw {
              status: 401,
              message: "Please login first"
            }
          }
        })
        .catch(err => {
          console.log(err.message + " << ini dari authentication ")
          next(err)
        })
    }
  } catch (error) {
      console.log(err.message + " << ini dari authentication ")
      next(error)
  }
}

module.exports = authenticateAdmin