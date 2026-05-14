const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require("../../models/userModel")

async function resetPassword(req, res) {

    try {

        const {
            token,
            password
        } = req.body

        // ✅ validation
        if (!token || !password) {

            return res.status(400).json({
                success: false,
                message: "Token and password are required"
            })
        }

        // ✅ verify token
        const decoded = jwt.verify(
            token,
            process.env.TOKEN_SECRET_KEY
        )

        // ✅ find user
        const user = await userModel.findById(decoded.id)

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // ✅ hash password
        const salt = bcrypt.genSaltSync(10)

        const hashPassword = await bcrypt.hash(password, salt)

        // ✅ update password
        user.password = hashPassword

        await user.save()

        return res.json({
            success: true,
            message: "Password reset successfully"
        })

    } catch (err) {

        console.log(err)

        return res.status(500).json({
            success: false,
            message: "Invalid or expired token"
        })
    }
}

module.exports = resetPassword