const jwt = require("jsonwebtoken");
require('dotenv').config()
const {jwt_admin_secret } =require('../config')

function adminmiddleware(req, res, next) {
    const token = req.headers.token;
    const valid = jwt.verify(token, jwt_admin_secret);
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
    adminmiddleware: adminmiddleware
}