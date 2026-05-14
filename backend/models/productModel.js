const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,

    seoTitle: {
        type: String,
        default: ""
    },
    seoDescription: {
        type: String,
        default: ""
    },
    seoKeywords: {
        type: String,
        default: ""
    },
    slug: {
        type: String,
        default: "",
        trim: true,
        lowercase: true
    }
}, {
    timestamps: true
})

const productModel = mongoose.model("product", productSchema)

module.exports = productModel
