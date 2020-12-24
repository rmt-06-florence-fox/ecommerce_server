module.exports = (req,res,next) =>{
   const role = req.loggedIn.role
   console.log(req.loggedIn,'req logged in')
   if(role ==='admin' || role ==='user'){
      next()
   } else {
      next({
         status:400,
         message: "You are not authorized to add/edit/update/delete product"
      })
   }
}