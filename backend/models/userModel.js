const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },

    phone: {
        type: String,
        required: true,
        trim: true
    },

    address: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    profilePic: {
        type: String,
        default: ""
    },

    role: {
        type: String,
        enum: ["ADMIN", "GENERAL"],
        default: "GENERAL"
    },
    lastActiveAt: {
        type: Date,
        default: null
    }

}, {
    timestamps: true
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel