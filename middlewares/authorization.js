const {User} = require('../models');


async function authorization (req, res, next){
    const id = req.loggedIn.id;
    try {
        const loginUser = await User.findOne({where: {id}});
        if(loginUser && loginUser.role === 'admin'){
            next()
        } else {
            throw {
                status: 401
            }
        }
    } catch(error){
        next(error);
    }
}

module.exports = authorization