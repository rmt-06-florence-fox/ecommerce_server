const { WishList } = require('../models/index')

function authorization (req, res, next) {
    console.log(req.loggedInUser.id)
    WishList.findOne({where: {id: req.params.id}})
    .then(data => {
        if(!data){
            return res.status(400).json({message: "No wishlist was found"})
        }
        else if(data.UserId == req.loggedInUser.id){
            next()
        }
        else {
            console.log("masuk ke sini")
            throw res.status(401).json({message: "sorry, you are not authorized"})
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json(err)
    })
}

module.exports = authorization