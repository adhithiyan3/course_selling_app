const jwt = require("jsonwebtoken");
require('dotenv').config()

function adminmiddleware(req, res, next) {
    const token = req.headers.token;
    const valid = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
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