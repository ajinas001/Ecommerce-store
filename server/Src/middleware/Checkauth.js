const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    console.log(req.cookies);
    console.log(token);
    console.log("middleware");

    if (!token) {
        return res.status(400).json({
            message: 'Token is not available'
        });
    } else {
        jwt.verify(token, "tokenkey", (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    message: 'Token verification failed. Not authorized'
                });
            } else {
                req.user = decoded; // Optional: You can set the decoded token data to the request object if needed
                next(); // Call next() to pass control to the next middleware or route handler
            }
        });
    }
};
