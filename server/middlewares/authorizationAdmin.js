module.exports = async (req, res, next) => {
    try {
           if(req.loggedInUser.role === "admin") {
                next();
            } else {
               throw {
                   status: 401,
                   message: "Unauthorized Access!"
               }
            }
    } catch (err) {
        next(err);
    }
}