const {User} = require('../models')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const {accesstoken} = req.headers
        if(!accesstoken) {
            res.status(401).json({message: 'login first'})
        } else {
            // console.log('sebelum decoded')
            var decoded = jwt.verify(accesstoken, 'process.env.SECRET')
            User.findOne({
                where:{
                    id : decoded.id,
                }
            })
            .then(user =>{
                if(user) {
                    req.loggedIn = decoded
                    next()
                } else {
                    res.status(401).json({message: 'WRONG token, please relog'})
                }
            })
            .catch(err => {
                res.status(401).json({message: 'wrong token, please relog'})
            })
        }
        
    } catch (error) {
        res.status(401).json({message: 'wrong token, please relog'})
    }
}