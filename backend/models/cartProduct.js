const mongoose = require('mongoose')

const addToCartSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const addToCartModel = mongoose.model("addToCart", addToCartSchema)

module.exports = addToCartModel
