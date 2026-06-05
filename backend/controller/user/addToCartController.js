const addToCartModel = require("../../models/cartProduct")

const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body
        const currentUser = req.userId

        if (!currentUser) {
            return res.status(401).json({
                message: "Please login first",
                success: false,
                error: true
            })
        }

        if (!productId) {
            return res.status(400).json({
                message: "Product id is required",
                success: false,
                error: true
            })
        }

        const isProductAvailable = await addToCartModel.findOne({
            productId,
            userId: currentUser
        })

        if (isProductAvailable) {
            const updatedProduct = await addToCartModel.findByIdAndUpdate(
                isProductAvailable._id,
                {
                    quantity: Number(isProductAvailable.quantity || 1) + 1
                },
                {
                    new: true
                }
            )

            return res.json({
                data: updatedProduct,
                message: "Product quantity updated in cart",
                success: true,
                error: false
            })
        }

        const payload = {
            productId,
            quantity: 1,
            userId: currentUser
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()

        return res.json({
            data: saveProduct,
            message: "Product added in cart",
            success: true,
            error: false
        })

    } catch (err) {
        return res.status(500).json({
            message: err?.message || "Something went wrong",
            error: true,
            success: false
        })
    }
}

module.exports = addToCartController