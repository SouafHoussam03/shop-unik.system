const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    // validation
    if (!email || !email.includes("@")) {
      throw new Error("Invalid email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    if (!name) {
      throw new Error("Please provide name");
    }

    // check user exists
    const user = await userModel.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create user
    const payload = {
      email,
      name,
      password: hashPassword,
      role: "GENERAL"
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    // remove password
    const userWithoutPassword = saveUser.toObject();
    delete userWithoutPassword.password;

    res.status(201).json({
      data: userWithoutPassword,
      success: true,
      error: false,
      message: "User created Successfully!"
    });

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;