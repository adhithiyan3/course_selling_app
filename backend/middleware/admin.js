const jwt = require("jsonwebtoken");
require('dotenv').config()

function adminmiddleware(req, res, next) {
    const token = req.header.token;
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