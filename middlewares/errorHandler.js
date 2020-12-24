function errorHandlers(err, req, res, next){
  if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError"){
    let errorMessages = []
    for (let i = 0; i < err.errors.length; i++){
      errorMessages.push(err.errors[i].message)
    }
    res.status(400).json({message: errorMessages})
  }
  else if(err.status){
    res.status(err.status).json({message: err.message})
  }
  else {
    console.log(err )
    res.status(500).json({message: "Internal Server Error"})
  }
};

module.exports = errorHandlers