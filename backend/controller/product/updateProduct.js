const uploadProductPermission = require('../../helpers/permission')
const productModel = require('../../models/productModel')

function generateSlug(text = "") {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s_]+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
}

async function updateProductController(req, res) {
    try {
        const hasPermission = await uploadProductPermission(req.userId)

        if (!hasPermission) {
            return res.status(403).json({
                message: "Permission denied",
                error: true,
                success: false
            })
        }

        const {
            _id,
            productName,
            brandName,
            category,
            productImage,
            description,
            price,
            sellingPrice,
            seoTitle,
            seoDescription,
            seoKeywords,
            slug
        } = req.body

        if (!_id) {
            return res.status(400).json({
                message: "Product id is required",
                error: true,
                success: false
            })
        }

        const productSlug =
            slug?.trim() || generateSlug(productName)

        const updateData = {
            productName,
            brandName,
            category,
            productImage: productImage || [],
            description,
            price,
            sellingPrice,
            seoTitle: seoTitle || productName,
            seoDescription: seoDescription || "",
            seoKeywords: seoKeywords || "",
            slug: productSlug
        }

        const updateProduct = await productModel.findByIdAndUpdate(
            _id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        )

        if (!updateProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false
            })
        }

        return res.json({
            message: "Product updated successfully",
            data: updateProduct,
            success: true,
            error: false
        })

    } catch (err) {
        return res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateProductController
