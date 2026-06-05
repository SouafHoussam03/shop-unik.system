const axios = require("axios");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
        purpose: "reset-password",
      },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    console.log("=================================");
    console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    console.log("RESET_LINK:", resetLink);
    console.log("=================================");

    // Send Email with Brevo
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "UNIK SYSTEM",
          email: "unik.system.website@gmail.com",
        },

        to: [
          {
            email: user.email,
            name: user.name,
          },
        ],

        subject: "Password Reset Request",

        htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
        </head>
        <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
          <div style="max-width:600px;margin:auto;background:white;border-radius:10px;overflow:hidden;">
            
            <div style="background:#ff0000;padding:25px;text-align:center;">
              <h1 style="color:white;margin:0;">UNIK SYSTEM</h1>
              <p style="color:white;margin-top:10px;">
                Password Reset Request
              </p>
            </div>

            <div style="padding:30px;">
              <h2>Hello ${user.name} </h2>

              <p>
                We received a request to reset your password.
              </p>

              <p>
                Click the button below to create a new password:
              </p>

              <div style="text-align:center;margin:30px 0;">
                <a
                  href="${resetLink}"
                  style="
                    background:#ff0000;
                    color:white;
                    padding:15px 30px;
                    text-decoration:none;
                    border-radius:30px;
                    font-weight:bold;
                    display:inline-block;
                  "
                >
                  Reset Password
                </a>
              </div>

              <p>
                This link will expire in <strong>15 minutes</strong>.
              </p>

              <p>
                If you did not request this password reset, you can safely ignore this email.
              </p>
            </div>

          </div>
        </body>
        </html>
        `,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_PASS,
          "content-type": "application/json",
        },
      }
    );

    console.log("Email Sent Successfully");
    console.log(response.data);

    return res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (err) {
    console.error("Forgot Password Error:");
    console.error(err.response?.data || err);

    return res.status(500).json({
      success: false,
      message: "Failed to send reset password email",
    });
  }
}

module.exports = forgotPassword;