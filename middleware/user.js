const jwt = require("jsonwebtoken")
require('dotenv').config()
function usermiddleware(req, res, next) {
    const token = req.header.token;
    const valid = jwt.verify(token, jwt_user_secret);
    if (valid) {
        req.userId = valid.id;
        next();
    }
    else {
        res.status(404).json({
            message: "unauthorized user"
        })
    }

}

module.exports = {
    usermiddleware
}