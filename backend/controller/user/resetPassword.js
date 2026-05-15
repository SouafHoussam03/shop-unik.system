const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require("../../models/userModel")

async function resetPassword(req, res) {
    try {
        const { token, password } = req.body

        if (!token || !password) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Token and password are required"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Password must be at least 6 characters"
            })
        }

        if (!process.env.TOKEN_SECRET_KEY) {
            return res.status(500).json({
                success: false,
                error: true,
                message: "Token secret key is missing"
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.TOKEN_SECRET_KEY
        )

        if (decoded?.purpose !== "reset-password") {
            return res.status(401).json({
                success: false,
                error: true,
                message: "Invalid reset token"
            })
        }

        const user = await userModel.findById(decoded.id)

        if (!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "User not found"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        user.password = hashPassword
        await user.save()

        return res.json({
            success: true,
            error: false,
            message: "Password reset successfully"
        })

    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                error: true,
                message: "Reset link expired"
            })
        }

        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                error: true,
                message: "Invalid reset link"
            })
        }

        return res.status(500).json({
            success: false,
            error: true,
            message: "Something went wrong"
        })
    }
}

module.exports = resetPassword
