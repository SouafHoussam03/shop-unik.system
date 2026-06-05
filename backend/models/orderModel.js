const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    cartItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    deliveryInfo: {
        fullName: String,
        phone: String,
        city: String,
        address: String,
        deliveryMethod: String,
        note: String
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    paymentStatus: {
        type: String,
        default: "pending"
    },
    stripeSessionId: String
}, {
    timestamps: true
})

const orderModel = mongoose.model("order", orderSchema)

module.exports = orderModel