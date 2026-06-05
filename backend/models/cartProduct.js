const mongoose = require("mongoose")

const addToCartSchema = new mongoose.Schema(
    {

        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true
        },

        quantity: {
            type: Number,
            default: 1,
            min: 1
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        }

    },
    {
        timestamps: true
    }
)

// PREVENT DUPLICATE PRODUCT IN CART
addToCartSchema.index(
    { userId: 1, productId: 1 },
    { unique: true }
)

const addToCartModel = mongoose.model(
    "addToCart",
    addToCartSchema
)

module.exports = addToCartModel