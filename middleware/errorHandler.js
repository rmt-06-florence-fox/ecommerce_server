module.exports = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({message: err.message})
  } else if (err.name === 'SequelizeValidationError') {
    const message = err.errors.map(e => e.message)
    res.status(400).json({message})
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    // console.log(err.errors);
    let message
    if (err.errors[0].message === 'email must be unique') {
      message = ['sorry, your email has been taken']
    } else if (err.errors[0].message === 'ProductId must be unique') {
      message = ['you already wish listed this item ']
    }
    res.status(400).json({message})
  } else {
    res.status(500).json({message : `internal server error`})
  }
}