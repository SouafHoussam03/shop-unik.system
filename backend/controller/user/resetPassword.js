const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");

async function resetPassword(req, res) {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Token and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await userModel.findByIdAndUpdate(
      decoded.id,
      {
        password: hashPassword,
      },
      {
        runValidators: false,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    console.error("Reset password error:", err.name, err.message);

    return res.status(401).json({
      success: false,
      message:
        err.name === "TokenExpiredError"
          ? "Token expired"
          : "Invalid or expired token",
    });
  }
}

module.exports = resetPassword;