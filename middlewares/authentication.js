const {User} = require("../models/index")
const Helper = require("../helper/Helper")

module.exports = async (req, res, next)=>{
    try{
        // console.log("access authentication")
        const access_token = req.headers.access_token
        // console.log(req.headers)
        if(access_token){
            const decoded = Helper.verifyToken(access_token)
            req.loginUser = decoded
            const user = await User.findOne({
                where:{
                    id: decoded.id
                }
            })
            if(user){
                next()
            }
            else {
                throw {
                    status: 401,
                    message: 'please login first'
                }
            }  
        } else {
            throw {
                status: 401,
                message: 'please login first'
            }
        }
        
        
    }catch (e){
        next(e)
    }
}