module.exports = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({message: err.message})
  } else if (err.name === 'SequelizeValidationError') {
    const message = err.errors.map(e => e.message)
    res.status(400).json({message})
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    const message = err.errors.map(e => e.message)
    res.status(400).json({message})
  } else {
    res.status(500).json({message : `internal server error`})
  }
}