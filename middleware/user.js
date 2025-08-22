const jwt = require("jsonwebtoken")
require('dotenv').config()
const {jwt_user_secret } =require('../config')
function usermiddleware(req, res, next) {
    const token = req.Headers.token;
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