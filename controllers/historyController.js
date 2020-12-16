const { History } = require('../models')

class HistoryController{
    static history(req, res, next){
        History.findAll({
            where: {
                UserId: req.userLogin.id
            },
            order: [
                ['id', 'ASC']
            ]
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static addHistory(req, res, next){
        const array = req.body.data
        // console.log(array, '<<?')
        History.bulkCreate(array)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteHistory(req, res, next){
        History.destroy({
            where: {
                UserId: req.userLogin.id
            }
        })
            .then(_ => {
                res.status(200).json({ msg: 'Data has been deleted' })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = HistoryController