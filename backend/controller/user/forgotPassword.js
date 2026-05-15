const axios = require("axios")
const jwt = require("jsonwebtoken")
const userModel = require("../../models/userModel")

async function forgotPassword(req, res) {

    try {

        const email = req.body?.email?.trim()?.toLowerCase()

        // ================= VALIDATION =================

        if (!email) {

            return res.status(400).json({
                success: false,
                error: true,
                message: "Email is required"
            })
        }

        if (!process.env.TOKEN_SECRET_KEY) {

            return res.status(500).json({
                success: false,
                error: true,
                message: "Token secret key is missing"
            })
        }

        if (!process.env.FRONTEND_URL) {

            return res.status(500).json({
                success: false,
                error: true,
                message: "Frontend URL is missing"
            })
        }

        if (!process.env.BREVO_API_KEY) {

            return res.status(500).json({
                success: false,
                error: true,
                message: "Brevo API key is missing"
            })
        }

        // ================= USER =================

        const user = await userModel.findOne({ email })

        if (!user) {

            return res.status(404).json({
                success: false,
                error: true,
                message: "User not found"
            })
        }

        // ================= TOKEN =================

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                purpose: "reset-password"
            },
            process.env.TOKEN_SECRET_KEY,
            {
                expiresIn: "15m"
            }
        )

        // ================= RESET LINK =================

        const frontendUrl = process.env.FRONTEND_URL.replace(/\/$/, "")

        const resetLink =
            `${frontendUrl}/reset-password/${token}`

        // ================= SEND EMAIL =================

        await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "UNIK SYSTEM",
                    email: "unik.system.website@gmail.com"
                },

                to: [
                    {
                        email: user.email,
                        name: user.name || "User"
                    }
                ],

                subject: "Reset Password - UNIK SYSTEM",

                htmlContent: `
                    <div style="font-family:Arial,sans-serif;background:#f5f5f5;padding:30px;">

                        <div style="max-width:600px;margin:auto;background:white;border-radius:18px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);">

                            <div style="background:#dc2626;color:white;padding:25px;text-align:center;">

                                <h1 style="margin:0;">
                                    UNIK SYSTEM
                                </h1>

                                <p style="margin-top:8px;">
                                    Password Reset Request
                                </p>

                            </div>

                            <div style="padding:35px;color:#333;">

                                <h2>
                                    Hello ${user.name || "User"} 👋
                                </h2>

                                <p>
                                    We received a request to reset your password.
                                </p>

                                <p>
                                    Click the button below to create a new password.
                                </p>

                                <div style="margin:35px 0;text-align:center;">

                                    <a 
                                        href="${resetLink}"
                                        style="
                                            background:#dc2626;
                                            color:white;
                                            text-decoration:none;
                                            padding:14px 28px;
                                            border-radius:999px;
                                            font-weight:bold;
                                            display:inline-block;
                                        "
                                    >
                                        Reset Password
                                    </a>

                                </div>

                                <p style="color:#666;">
                                    This link will expire in 15 minutes.
                                </p>

                                <p style="color:#666;">
                                    If you did not request this, you can safely ignore this email.
                                </p>

                            </div>

                        </div>

                    </div>
                `
            },
            {
                headers: {
                    accept: "application/json",
                    "api-key": process.env.BREVO_API_KEY,
                    "content-type": "application/json"
                }
            }
        )

        // ================= RESPONSE =================

        return res.status(200).json({
            success: true,
            error: false,
            message: "Reset link sent successfully"
        })

    } catch (err) {

        console.log(
            "FORGOT PASSWORD ERROR => ",
            err.response?.data || err.message || err
        )

        return res.status(500).json({
            success: false,
            error: true,
            message:
                err.response?.data?.message ||
                err.message ||
                "Failed to send reset email"
        })
    }
}

module.exports = forgotPassword