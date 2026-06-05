const userModel = require("../../models/userModel")
const bcrypt = require("bcryptjs")

async function userSignUpController(req, res) {
    try {
        const {
            email,
            password,
            name,
            phone,
            address,
            profilePic
        } = req.body

        const cleanEmail = email?.trim()?.toLowerCase()
        const cleanName = name?.trim()
        const cleanPhone = phone?.trim()
        const cleanAddress = address?.trim()

        if (!cleanEmail || !cleanEmail.includes("@")) {
            throw new Error("Invalid email")
        }

        if (!password) {
            throw new Error("Please provide password")
        }

        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters")
        }

        if (!cleanName) {
            throw new Error("Please provide name")
        }

        if (!cleanPhone) {
            throw new Error("Please provide phone number")
        }

        if (!cleanAddress) {
            throw new Error("Please provide address")
        }

        const user = await userModel.findOne({
            email: cleanEmail
        })

        if (user) {
            throw new Error("User already exists")
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const payload = {
            email: cleanEmail,
            name: cleanName,
            phone: cleanPhone,
            address: cleanAddress,
            profilePic: profilePic || "",
            password: hashPassword,
            role: "GENERAL"
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        const userWithoutPassword = saveUser.toObject()
        delete userWithoutPassword.password

        return res.status(201).json({
            data: userWithoutPassword,
            success: true,
            error: false,
            message: "User created successfully"
        })

    } catch (err) {
        return res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = userSignUpController