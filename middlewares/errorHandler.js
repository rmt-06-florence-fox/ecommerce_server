module.exports = (err, req, res, next) => {
  if (err.status) {
      res.json(err.status).json({message: err.message})
  }
  else if (err.name == 'SequelizeValidationError') {
      let errArray = []
      for (let i = 0; i < err.errors.length; i++) {
          errArray.push(err.errors[i].message)
      }
      res.status(401).json({message: errArray})
  }
  else if (err.name == 'SequelizeUniqueConstraintError') {
      let errArray = []
      for (let i = 0; i < err.errors.length; i++) {
          errArray.push(err.errors[i].message)
      }
      res.status(401).json({message: errArray})
  }
  else {
      res.status(500).json(err)
  }
}