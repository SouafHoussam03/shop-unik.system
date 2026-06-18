const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const TAX_RATE = 0.20

function toStripeAmount(amount) {
    return Math.round(Number(amount || 0) * 100)
}

function getPriceTTC(price) {
    return Number(price || 0) * (1 + TAX_RATE)
}

async function createCheckoutSession(req, res) {
    try {
        const { cartItems, deliveryInfo } = req.body

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            })
        }

        const line_items = cartItems.map((item) => {
            const productName = item?.productId?.productName || item?.productName
            const productImage =
                item?.productId?.productImage?.[0] ||
                item?.productImage?.[0] ||
                ""
            const sellingPrice = item?.productId?.sellingPrice || item?.sellingPrice
            const priceTTC = getPriceTTC(sellingPrice)

            return {
                price_data: {
                    currency: "mad",
                    product_data: {
                        name: `${productName} - TTC 20%`,
                        images: productImage ? [productImage] : []
                    },
                    unit_amount: toStripeAmount(priceTTC)
                },
                quantity: Number(item?.quantity || 1)
            }
        })

        const deliveryPrice = Number(deliveryInfo?.deliveryPrice || 0)

        if (deliveryPrice > 0) {
            line_items.push({
                price_data: {
                    currency: "mad",
                    product_data: {
                        name: deliveryInfo?.deliveryMethod || "Frais de livraison"
                    },
                    unit_amount: toStripeAmount(deliveryPrice)
                },
                quantity: 1
            })
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items,
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            metadata: {
                deliveryMethod: deliveryInfo?.deliveryMethod || "",
                deliveryPrice: String(deliveryPrice),
                taxRate: "20%"
            }
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
