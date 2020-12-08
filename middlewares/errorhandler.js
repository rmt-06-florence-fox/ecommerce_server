module.exports = (err, req, res, next) => {
    if (err.status) {
      res.status(err.status).json({ message: err.message })
    } 
    else if (err.name === 'SequelizeValidationError') {
      const errors = err.errors.map(e => {
        return { message: e.validatorArgs[0].message }
      })
      res.status(400).json(errors)
    }
    else if (err.name === 'SequelizeUniqueConstraintError') {
      const diffErrors = err.errors.map(e => {
        return { message: e.message }
      })
      res.status(400).json(diffErrors)
    }
    else {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
