const { History } = require('../models')

class HistoryController {
    static async findAllHistories(req, res, next) {
        try {
            let data = await History.findAll({where:{UserId: +req.loggedInUser.id}})
            res.status(200).json({ history: data })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = HistoryController