const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }

        if (!password) {
            throw new Error("Please provide password");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            throw new Error("Please check Password");
        }

        const tokenData = {
            _id: user._id,
            email: user.email
        };

        const token = jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: "8h" }
        );

        const tokenOption = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 8
        };

        res.cookie("token", token, tokenOption);

        return res.status(200).json({
            message: "Login successfully",
            success: true,
            error: false
        });

    } catch (err) {
        return res.status(400).json({
            message: err.message || "Login failed",
            error: true,
            success: false
        });
    }
}

module.exports = userSignInController;