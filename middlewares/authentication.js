
const JwtHelper = require('../helpers/jwtHelper')
const { User } = require('../models')

module.exports = async (req, res, next)=>{
  let decodedToken
  
  try {
    if(!req.headers.access_token) throw { status : 401, message : 'please login first' }

    decodedToken = JwtHelper.decode(req.headers.access_token)

    if(decodedToken){
      const user = await User.findOne({where : { email : decodedToken.email }})
      if(user){
        req.loggedInUser = user;
        next();
      }else{
        throw { status : 401, message : 'please login first' }
      }
    }else throw { status : 401, message : 'please login first' }
    
    

  } catch (error) {
    next(error)
  }

  
}