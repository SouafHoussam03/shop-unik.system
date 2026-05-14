const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function deleteProductController(req, res) {
    try {
        const sessionUserId = req.userId
        const { productId } = req.body

        const hasPermission = await uploadProductPermission(sessionUserId)

        if (!hasPermission) {
            return res.status(403).json({
                message: "Permission denied",
                error: true,
                success: false
            })
        }

        if (!productId) {
            return res.status(400).json({
                message: "Product id is required",
                error: true,
                success: false
            })
        }

        const deletedProduct = await productModel.findByIdAndDelete(productId)

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false
            })
        }

        return res.json({
            message: "Product deleted successfully",
            error: false,
            success: true,
            data: deletedProduct
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message || "Something went wrong",
            error: true,
            success: false
        })
    }
}

module.exports = deleteProductController
