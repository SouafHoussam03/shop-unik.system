const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

async function createCheckoutSession(req, res) {
    try {
        const { cartItems } = req.body

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            })
        }

        const line_items = cartItems.map((item) => ({
            price_data: {
                currency: "mad",
                product_data: {
                    name: item?.productId?.productName || item?.productName,
                    images: [
                        item?.productId?.productImage?.[0] ||
                        item?.productImage?.[0] ||
                        ""
                    ]
                },
                unit_amount: Number(
                    item?.productId?.sellingPrice || item?.sellingPrice
                ) * 100
            },
            quantity: item?.quantity || 1
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items,
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`
        })

        return res.json({
            success: true,
            url: session.url
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    createCheckoutSession
}