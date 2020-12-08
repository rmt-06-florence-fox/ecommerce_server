const { Product } = require("../models/index.js")
function authorizeAdminEditDelete(req, res, next){
  Product.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(product => {
      if(product){
        if (req.loggedIn.role === "admin"){
          next()
        }
        else {
          throw({
            status: 401,
            message: "You are not authorized"
          })
        }
      }
      else {
        throw({
          status: 404,
          message: "Error! Data not found"
        })
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorizeAdminEditDelete