const { User } = require('../models/index') 

async function authorization (req, res, next){
    try {
        const data = await User.findOne({
            where:{
                email: req.loggedInUser.email
            }
        })
        if(data){
            if(data.role === 'admin'){
                next()
            }else{
                res.status(401).json({message: `You don't have access`})
            }
        }else{
            res.status(404).json({message: `User not found`})
        }
    } catch (error) {
        res.status(500).json({message: `Internal Server Error`})
    }
}

module.exports = authorization