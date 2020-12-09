module.exports = async (req, res, next) => {
  try {
    // console.log(req.loggedUser, '<-- dari authorization')
    if (req.loggedUser.role === 'admin') {
      next()
    } else {
      throw {
        status: 401,
        msg: `You are not authorized to use this feature !`
      }
    }
  }
  catch(err) {
    next(err)
  }
}