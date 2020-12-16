module.exports = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({
      message: err.message
    })
  } else if (err.name === 'SequelizeValidationConstraintError' || err.name === 'SequelizeUniqueConstraintError') {
    // console.log(err, '<-- ini dari Error Handler')
    res.status(400).json({ message: `Invalid Email / Password !`})
  } else if (err.name === 'SequelizeValidationError') {
    // console.log(err, '<-- error handler')
    let error = err.errors.map(element => {
      // console.log(element.message, '<-- element')
      return element.message
    });
    // console.log(error, '<-- dari foreach')
    res.status(400).json({ message: error })
  } else {
    res.status(500).json({ message: `Internal Server Error !`})
  }
}