const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                error: true,
                message: "Please Login"
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {

            if (err) {
                return res.status(401).json({
                    success: false,
                    error: true,
                    message: "Invalid Token"
                });
            }

            req.userId = decoded._id;
            next();
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: true,
            message: err.message
        });
    }
}

module.exports = authToken;