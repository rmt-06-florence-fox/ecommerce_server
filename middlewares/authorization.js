const { User } = require('../models')

module.exports = async (req, res, next)=>{

  try {
    const user = await User.findOne({ where : { id : req.loggedInUser.id , role : 'admin'} })
    // console.log(user);
    if(user){
      next()
    }else throw { status : 401 , message : 'you are not an admin'}
  } catch (error) {
    next(error)
  }

  // if(req.loggedInUser.role === 'admin'){
  //   next()
  // }else next({ status : 400 , message : 'you have no access'})
}