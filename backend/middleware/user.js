const jwt = require("jsonwebtoken")
require('dotenv').config()
function usermiddleware(req, res, next) {
    const token = req.headers.token;
    const valid = jwt.verify(token, process.env.JWT_USER_SECRET);
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