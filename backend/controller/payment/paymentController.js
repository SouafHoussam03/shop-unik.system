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
            const priceHT = Number(product?.sellingPrice || 0)
            const priceTTC = getPriceTTC(priceHT)
            const quantity = Number(item?.quantity || 1)

            if (!priceHT || priceHT <= 0) {
                throw new Error(`Invalid price for ${product?.productName || "Product"}`)
            }

            return {
                price_data: {
                    currency: "mad",
                    product_data: {
                        name: `${product?.productName || "Product"} - TTC 20%`,
                        images: product?.productImage?.[0]
                            ? [product.productImage[0]]
                            : []
                    },
                    unit_amount: toStripeAmount(priceTTC)
                },
                quantity
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
                deliveryPrice: String(deliveryPrice),
                taxRate: "20%",
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
