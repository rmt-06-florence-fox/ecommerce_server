const {User} = require('../models')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const {accesstoken} = req.headers
        console.log(req.headers.accesstoken, '====')
        if(!accesstoken) {
            res.status(401).json({message: 'login first'})
        } else {
            // console.log('sebelum decoded')
            var decoded = jwt.verify(accesstoken, 'process.env.SECRET')
            console.log(decoded, "di decoded")
            User.findOne({
                where:{
                    id : decoded.id,
                }
            })
            .then(user =>{
                console.log(user)
                console.log('masuk then')

                if(user) {
                    console.log('masuk if')
                    req.loggedIn = decoded
                    next()
                } else {
                    console.log('masuk else')
                    res.status(401).json({message: 'WRONG token, please relog'})
                }
            })
            .catch(err => {
                console.log(err ,'masuk catch')
                res.status(401).json({message: 'wrong token, please relog'})
            })
        }
        
    } catch (error) {
        res.status(401).json({message: 'wrong token, please relog'})
    }
}