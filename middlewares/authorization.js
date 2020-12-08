const { Task } = require('../models')

module.exports = async (req, res, next) => {
    try {
        const task = await Task.findOne({ where: { id: req.params.id }})
        if (!task) {
            throw {status: 404, message: `Error, Data Not Found`}
        } else if (task.UserId == req.loggedInUser.id) {
            next()
        } else {
            throw {status: 401,message: `You are not authorized to access this data`}
        }
    } catch (error) {
        next(error)
    }
}