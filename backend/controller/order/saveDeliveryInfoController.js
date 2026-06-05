const orderModel = require("../../models/orderModel")
const addToCartModel = require("../../models/cartProduct")

async function saveDeliveryInfoController(req, res) {
    try {
        const userId = req.userId
        const { deliveryInfo } = req.body

        if (!userId) {
            return res.status(401).json({
                message: "Please login first",
                success: false,
                error: true
            })
        }

        if (
            !deliveryInfo?.fullName ||
            !deliveryInfo?.phone ||
            !deliveryInfo?.city ||
            !deliveryInfo?.address
        ) {
            return res.status(400).json({
                message: "Delivery information is required",
                success: false,
                error: true
            })
        }

        const cartItems = await addToCartModel.find({ userId }).populate("productId")

        if (!cartItems.length) {
            return res.status(400).json({
                message: "Cart is empty",
                success: false,
                error: true
            })
        }

        const totalAmount = cartItems.reduce((total, item) => {
            return total + (
                Number(item?.quantity || 0) *
                Number(item?.productId?.sellingPrice || 0)
            )
        }, 0)

        const order = await orderModel.create({
            userId,
            cartItems: cartItems.map((item) => ({
                productId: item.productId._id,
                quantity: item.quantity
            })),
            deliveryInfo,
            totalAmount,
            paymentStatus: "pending"
        })

        return res.json({
            message: "Delivery information saved",
            success: true,
            error: false,
            data: order
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message || "Something went wrong",
            success: false,
            error: true
        })
    }
}

module.exports = saveDeliveryInfoController