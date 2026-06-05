const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

function generateSlug(text = "") {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s_]+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
}

async function UploadProductController(req, res) {
    try {
        const sessionUserId = req.userId

        const hasPermission = await uploadProductPermission(sessionUserId)

        if (!hasPermission) {
            return res.status(403).json({
                message: "Permission denied",
                error: true,
                success: false
            })
        }

        const {
            productName,
            brandName,
            category,
            subCategory,
            productImage,
            description,
            price,
            sellingPrice,
            seoTitle,
            seoDescription,
            seoKeywords,
            slug
        } = req.body

        if (!productName || !brandName || !category || !price || !sellingPrice) {
            return res.status(400).json({
                message: "Missing required fields",
                error: true,
                success: false
            })
        }

        const productSlug =
            slug?.trim() || generateSlug(productName)

        const productData = {
            productName,
            brandName,
            category,
            subCategory : String(subCategory || ""),
            productImage: productImage || [],
            description,
            price,
            sellingPrice,
            seoTitle: seoTitle || productName,
            seoDescription: seoDescription || "",
            seoKeywords: seoKeywords || "",
            slug: productSlug
        }

        const newProduct = new productModel(productData)
        const savedProduct = await newProduct.save()

        return res.status(201).json({
            message: "Product uploaded successfully",
            error: false,
            success: true,
            data: savedProduct
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = UploadProductController
