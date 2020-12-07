const {verify} = require('../helpers/tokening')

module.exports = (req,res,next) => {
   const {access_token} = req.headers

   if(!access_token){
      next({
         status:400,
         message:'You must login first'
      })
   }else{
      const decoded = verify(access_token)
      req.loggedIn = decoded
      next()
   }
}