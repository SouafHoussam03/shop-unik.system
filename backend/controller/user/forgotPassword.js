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

    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${encodeURIComponent(
      token
    )}`;

    console.log("Reset link:", resetLink);
    console.log("Sending Email...");

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "UNIK SYSTEM",
          email: "unik.system.website@gmail.com",
        },

        to: [
          {
            email,
          },
        ],

        subject: "Reset Password",

        htmlContent: `
          <div style="font-family:sans-serif;padding:20px">
            <h2>Hello ${user.name}</h2>

            <p>Click below to reset your password</p>

            <a
              href="${resetLink}"
              style="
                background:#dc2626;
                color:white;
                padding:12px 20px;
                text-decoration:none;
                border-radius:6px;
                display:inline-block;
                margin-top:10px;
              "
            >
              Reset Password
            </a>
          </div>
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

    console.log("Email Sent");
    console.log(response.data);

    return res.status(200).json({
      success: true,
      message: "Reset link sent successfully",
    });
  } catch (err) {
    console.log(err.response?.data || err);

    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
}

module.exports = forgotPassword;