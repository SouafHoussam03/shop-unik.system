const userModel = require("../../models/userModel")
const addToCartModel = require("../../models/cartProduct")
const orderModel = require("../../models/orderModel")
const uploadProductPermission = require("../../helpers/permission")

async function adminUsersCartDelivery(req, res) {
    try {
        const hasPermission = await uploadProductPermission(req.userId)

        if (!hasPermission) {
            return res.status(403).json({
                message: "Permission denied",
                success: false,
                error: true
            })
        }

        const users = await userModel.find().select("-password").lean()

        const result = await Promise.all(
            users.map(async (user) => {
                const cartItems = await addToCartModel
                    .find({ userId: user._id.toString() })
                    .populate("productId")
                    .lean()

                const orders = await orderModel
                    .find({ userId: user._id.toString() })
                    .populate("cartItems.productId")
                    .sort({ createdAt: -1 })
                    .lean()

                return {
                    user,
                    cartItems,
                    orders,
                    lastDeliveryInfo: orders?.[0]?.deliveryInfo || null
                }
            })
        )

        return res.json({
            message: "Users cart and delivery data",
            success: true,
            error: false,
            data: result
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message || "Something went wrong",
            success: false,
            error: true
        })
    }
}

module.exports = adminUsersCartDelivery