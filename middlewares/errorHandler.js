module.exports = (err,req,res,next) => {
   if(err.name){
      res.status(400).json({message:err.errors[0].message})
   }else if(err.status){
      res.status(err.status).json({message:err.message})
   }else{
      res.status(500).json(err)
   }
}