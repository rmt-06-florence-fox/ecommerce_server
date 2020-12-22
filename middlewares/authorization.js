const {User} = require("../models/index")

module.exports = async(req, res, next)=>{
    try{
        const data = await User.findOne({
            where:{
                id: req.loginUser.id,
                role: 'admin'
            }
        })
        if(data){
            next()
        }
        else{
            throw {
                status: 401,
                message: `you aren't authorized to access this product`
            }
            // res.status(401).json({message: `you aren't authorized to access this Product`})
        }
    }catch (e){
        next(e)
    }
}