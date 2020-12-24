const { Admin } = require("../models/index.js")
const verifyPassword = require("../helpers/verifyPassword")
const generateToken = require("../helpers/generateToken")
class AdminController {
  static login(req, res, next){
    Admin.findOne({
      where: {
        email: req.body.email,
      }
    })
    .then(admin => {
      if(admin){
        if(verifyPassword(req.body.password, admin.password)){
          let access_token = generateToken({id: admin.id, email: admin.email, role: admin.role})
          res.status(200).json({ access_token })
        }
        else {
          throw({
            status: 401,
            message: "Invalid email/password"
          })
        }
      }
      else {
        throw({
          status: 401,
          message: "Invalid email/password"
        })
      }
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = AdminController