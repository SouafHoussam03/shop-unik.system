const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;

        console.log("token:", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                error: true,
                message: "Please Login"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.TOKEN_SECRET_KEY
        );

        req.userId = decoded._id;

        next();

    } catch (err) {
        console.error("Auth Error:", err.message);

        return res.status(401).json({
            success: false,
            error: true,
            message: "Invalid or expired token"
        });
    }
}

module.exports = authToken;