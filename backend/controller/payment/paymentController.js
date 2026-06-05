const Stripe = require("stripe")

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

async function createCheckoutSession(req, res) {
    try {
        const {
            cartItems,
            deliveryInfo
        } = req.body

        if (!process.env.STRIPE_SECRET_KEY) {
            return res.status(500).json({
                success: false,
                error: true,
                message: "Stripe secret key is missing"
            })
        }

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Cart is empty"
            })
        }

        const line_items = cartItems.map((item) => {
            const product = item?.productId || item
            const price = Number(product?.sellingPrice || 0)
            const quantity = Number(item?.quantity || 1)

            if (!price || price <= 0) {
                throw new Error(`Invalid price for ${product?.productName || "Product"}`)
            }

            return {
                price_data: {
                    currency: "mad",
                    product_data: {
                        name: product?.productName || "Product",
                        images: product?.productImage?.[0]
                            ? [product.productImage[0]]
                            : []
                    },
                    unit_amount: Math.round(price * 100)
                },
                quantity
            }
        })

        const frontendUrl =
            process.env.FRONTEND_URL || "http://localhost:8081"

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items,

            success_url: `${frontendUrl}/success`,
            cancel_url: `${frontendUrl}/cancel`,

            metadata: {
                userId: req.userId || "",
                fullName: deliveryInfo?.fullName || "",
                phone: deliveryInfo?.phone || "",
                city: deliveryInfo?.city || "",
                address: deliveryInfo?.address || "",
                deliveryMethod: deliveryInfo?.deliveryMethod || "",
                note: deliveryInfo?.note || ""
            }
        })

        return res.json({
            success: true,
            error: false,
            url: session.url
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Stripe checkout failed"
        })
    }
}

module.exports = {
    createCheckoutSession
}