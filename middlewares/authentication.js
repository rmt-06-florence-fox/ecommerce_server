const {verifyToken} = require('../helpers/jswebtoken');
const {User} = require('../models');


async function authentication (req, res, next){
    const {access_token} = req.headers;
    if(!access_token){
        const err = {
            status: 401,
            message: 'You need to login to have an access'
        }
        res.status(err.status).json({message: err.message})
    } else {
        try{
            const decoded = verifyToken(access_token);
            const foundUser = await User.findOne({where: {id: decoded.id, email: decoded.email}})
            if(foundUser){
                req.loggedIn = decoded;
                next()
            } else {
                const err = {
                    status: 401,
                    message: 'Seems like you are doin some bad things :)'
                }
                res.status(err.status).json({message: err.message})
            }
        } catch(error){
            console.log(error)
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
}

module.exports = authentication