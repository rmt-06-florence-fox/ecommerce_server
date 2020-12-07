const { User } = require('../models')

module.exports = async (req, res, next)=>{
  try{
    const isAdmin = await User.findOne({
      where: {
        id: req.loginUser.id,
        role: 'admin'
      }
    })
    if(isAdmin) next()
    else{
      throw{
        status: 401,
        message: `You aren't admin !`
      }
    }
  }catch(err){
    next(err)
  }
}