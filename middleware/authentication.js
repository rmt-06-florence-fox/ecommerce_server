const {verifyToken} = require('../helper/helper_token')
const {Admin} = require('../models')

module.exports = async (req, res, next) => {
    try {
        let access_token = req.headers.access_token
        if(!access_token) {
            res.status(401).json({message: 'you are not authorized'})
        } else {
            let decoded = verifyToken(access_token)
            req.loggedIn = decoded
          
            const data = await Admin.findOne({
                where: {
                    id: decoded.id
                }
            }) 
    
            if(data) next()
            else {
                res.status(401).json({message: 'you are not authorized'})
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
   
}