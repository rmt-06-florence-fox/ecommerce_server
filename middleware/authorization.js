const {Admin} = require('../models')

module.exports = async (req, res, next) => {
    try {
        const data = await Admin.findOne({
            where: {
                id: req.loggedIn.id
            }
        })
        if(data.role === 'admin') {
            next()
        } else {
            res.status(401).json({message: 'you are not authorized'})
        }
    } catch (error) {
        res.status(500).json(error)
    } 
}