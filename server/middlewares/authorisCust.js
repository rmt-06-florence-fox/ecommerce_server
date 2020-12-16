
const {User,Product,Cart} = require('../models')

module.exports = async (req, res, next) => {
  try {
    const loggedUserId = req.loginUser.id
    console.log(loggedUserId)
    let data = await User.findOne({
      where: {id: loggedUserId}
      })
    if (data) {
      next()
    }
    else {
      throw {
        status: 401,
        message: `You Dont Have Permission to Do this Action`}
    
    }
  }
  
  catch(error){
      console.log(error)
      next(error)

  }

}