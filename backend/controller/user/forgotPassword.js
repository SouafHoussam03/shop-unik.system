const axios = require("axios")
const jwt = require("jsonwebtoken")
const userModel = require("../../models/userModel")

async function forgotPassword(req, res) {
    try {
        const email = req.body?.email?.trim()?.toLowerCase()

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

        const brevoApiKey =
            process.env.BREVO_API_KEY || process.env.BREVO_PASS

        if (!brevoApiKey) {
            return res.status(500).json({
                success: false,
                error: true,
                message: "Brevo API key is missing"
            })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "User not found"
            })
        }

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

        const frontendUrl = process.env.FRONTEND_URL.replace(/\/$/, "")
        const resetLink = `${frontendUrl}/reset-password/${token}`

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
                    <div style="font-family: Arial, sans-serif; background:#f6f6f6; padding:30px;">
                        <div style="max-width:600px; margin:auto; background:white; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
                            
                            <div style="background:#dc2626; color:white; padding:24px;">
                                <h2 style="margin:0;">UNIK SYSTEM</h2>
                                <p style="margin:6px 0 0;">Password Reset Request</p>
                            </div>

                            <div style="padding:28px; color:#333;">
                                <h3>Hello ${user.name || "User"},</h3>

                                <p>
                                    We received a request to reset your password.
                                    Click the button below to create a new password.
                                </p>

                                <a 
                                    href="${resetLink}"
                                    style="
                                        background:#dc2626;
                                        color:white;
                                        padding:14px 24px;
                                        text-decoration:none;
                                        border-radius:999px;
                                        display:inline-block;
                                        margin-top:16px;
                                        font-weight:bold;
                                    "
                                >
                                    Reset Password
                                </a>

                                <p style="margin-top:24px; color:#666;">
                                    This link will expire in 15 minutes.
                                </p>

                                <p style="color:#666;">
                                    If you did not request this, you can ignore this email.
                                </p>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                headers: {
                    accept: "application/json",
                    "api-key": brevoApiKey,
                    "content-type": "application/json"
                }
            }
        )

        return res.json({
            success: true,
            error: false,
            message: "Reset link sent successfully"
        })

    } catch (err) {
        console.log(err.response?.data || err.message || err)

        return res.status(500).json({
            success: false,
            error: true,
            message: "Failed to send reset email"
        })
    }
}

module.exports = forgotPassword
