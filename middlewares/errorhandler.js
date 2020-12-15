module.exports = (err, req, res, next)=>{
  if(err.status){
    res.status(err.status).json({message : err.message})
  }else if(err.name === 'SequelizeValidationError'){
    const errMsg = err.errors.map(e => e.message)
    res.status(400).json({messages :errMsg})
  }else if(err.name === 'SequelizeUniqueConstraintError'){
    const errMsg = err.errors.map(e => e.message)
    res.status(400).json({messages :errMsg})
  }
  else{
    res.status(500).json(err)
  }
}