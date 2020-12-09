const { User } = require('../models')
const Helper = require('../helpers/helper')

class UserController{
  static async loginAdmin(req, res, next){   //ganti nama loginadmin
    try{
      const findData = await User.findOne({
        where: { email: req.body.email, role: 'admin' }
      })
      if(findData){
        if(Helper.verifyPassword(req.body.password, findData.password)){
          const access_token = Helper.generateToken({
            id: findData.id,
            email: findData.email
          })
          res.status(200).json({
            id: findData.id,
            email: findData.email,
            access_token
          })
        }else{
          throw{
            status: 400,
            message: `Invalid email / password !`
          }
        }
      }else{
        throw{
          status: 400,
          message: `Invalid account !`
        }
      }
    }catch(err){
      next(err)
    }
  }


}

module.exports = UserController