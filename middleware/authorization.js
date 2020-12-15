const { User } = require('../models/index')

module.exports = async (req, res, next)=>{
  try{
    const isAdmin = await User.findOne({
      where: {
        email: req.loginUser.email,
        role: 'admin'
      }
    })
    console.log(isAdmin, '<<<<<<<<<<<<<<<<<< is admin');
    if(isAdmin){
      next()
    }else{
      throw{
        status: 401,
        message: `You not admin!`
      }
    }
  }catch(err){
    console.log(err);
    next(err)
  }
}