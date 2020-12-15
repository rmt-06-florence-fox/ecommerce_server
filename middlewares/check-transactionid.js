const { Transaction } = require('../models')

module.exports = async (req, res, next) => {
    const id = req.params.id
    const UserId = req.loggedIn.id

    try {
        const transaction = await Transaction.findOne({
            where: {
                id
            }
        })

        if (!transaction) {
            throw {
                status: 404,
                message: `Error Not Found`
            }
        } else {
            if (transaction.status === 'completed') {
                throw {
                  status: 401,
                  message: `Cannot Edit / Delete Completed Status`
                }
            } else {
              if (UserId != transaction.UserId) {
                throw {
                  status: 403,
                  message: `Cannot edit others transaction`
                }
              } else {
                next()
              }
            }
        }
    } catch (error) {
        next(error)
    }
}