function errorHandlers(err, req, res, next){
  if (err.name === "SequelizeValidationError"){
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
    res.status(500).json({message: "Internal Server Error"})
  }
};

module.exports = errorHandlers