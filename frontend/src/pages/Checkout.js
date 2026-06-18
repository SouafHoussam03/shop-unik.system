import React, { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {
    FaArrowLeft,
    FaCreditCard,
    FaLock,
    FaShoppingBag,
    FaTrash
} from "react-icons/fa"

import SummaryApi from "../common"
import displayCurrency from "../helpers/displayCurrency"

const TAX_RATE = 0.20

const getPriceTTC = (price) => Number(price || 0) * (1 + TAX_RATE)

const Checkout = () => {
    const [cartItems, setCartItems] = useState([])
    const [deliveryInfo, setDeliveryInfo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [payLoading, setPayLoading] = useState(false)

    const navigate = useNavigate()

    const fetchCartProducts = async () => {
        try {
            setLoading(true)

            const response = await fetch(SummaryApi.addToCartProductView.url, {
                method: SummaryApi.addToCartProductView.method,
                credentials: "include"
            })

            const dataResponse = await response.json()

            if (dataResponse.success) {
                setCartItems(dataResponse.data || [])
            }

            if (dataResponse.error) {
                toast.error(dataResponse.message)
            }
        } catch (error) {
            toast.error("Failed to load cart")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCartProducts()

        const savedDeliveryInfo = localStorage.getItem("deliveryInfo")

        if (savedDeliveryInfo) {
            try {
                setDeliveryInfo(JSON.parse(savedDeliveryInfo))
            } catch (error) {
                setDeliveryInfo(null)
            }
        }
    }, [])

    const subTotalHT = useMemo(() => {
        return cartItems.reduce((total, item) => {
            const price = Number(item?.productId?.sellingPrice || 0)
            const quantity = Number(item?.quantity || 1)

            return total + price * quantity
        }, 0)
    }, [cartItems])

    const taxAmount = useMemo(() => subTotalHT * TAX_RATE, [subTotalHT])
    const subTotalTTC = useMemo(() => subTotalHT + taxAmount, [subTotalHT, taxAmount])
    const deliveryFee = Number(deliveryInfo?.deliveryPrice || 0)
    const total = subTotalTTC + deliveryFee

    const handlePayment = async () => {
        try {
            if (cartItems.length === 0) {
                toast.error("Your cart is empty")
                return
            }

            setPayLoading(true)

            const response = await fetch(SummaryApi.checkout.url, {
                method: SummaryApi.checkout.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    cartItems,
                    deliveryInfo
                })
            })

            const data = await response.json()

            if (data.success && data.url) {
                window.location.href = data.url
            } else {
                toast.error(data.message || "Payment failed")
            }
        } catch (error) {
            toast.error("Payment failed")
        } finally {
            setPayLoading(false)
        }
    }

    const handleRemoveItem = async (id) => {
        try {
            const response = await fetch(SummaryApi.deleteCartProduct.url, {
                method: SummaryApi.deleteCartProduct.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    _id: id
                })
            })

            const dataResponse = await response.json()

            if (dataResponse.success) {
                toast.success(dataResponse.message)
                fetchCartProducts()
            }

            if (dataResponse.error) {
                toast.error(dataResponse.message)
            }
        } catch (error) {
            toast.error("Failed to remove product")
        }
    }

    if (loading) {
        return (
            <div className='min-h-screen bg-slate-100 pt-24 px-4'>
                <div className='container mx-auto'>
                    <div className='bg-white rounded-3xl p-8 shadow-xl animate-pulse'>
                        <div className='h-8 bg-slate-200 rounded-full w-60 mb-8'></div>
                        <div className='grid lg:grid-cols-3 gap-8'>
                            <div className='lg:col-span-2 space-y-4'>
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className='h-32 bg-slate-200 rounded-2xl'
                                    ></div>
                                ))}
                            </div>
                            <div className='h-80 bg-slate-200 rounded-2xl'></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <main className='min-h-screen bg-slate-100 pt-24 pb-14 px-4'>

            <div className='container mx-auto'>

                <div className='flex items-center justify-between gap-4 mb-8'>

                    <div>
                        <h1 className='text-4xl font-black text-gray-800'>
                            Checkout
                        </h1>

                        <p className='text-gray-500 mt-2'>
                            Review your order and continue to secure payment.
                        </p>
                    </div>

                    <button
                        type='button'
                        onClick={() => navigate(-1)}
                        className='hidden sm:flex items-center gap-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-5 py-3 rounded-full font-bold transition-all'
                    >
                        <FaArrowLeft />
                        Back
                    </button>

                </div>

                {cartItems.length === 0 ? (
                    <div className='bg-white rounded-3xl shadow-xl border p-10 text-center'>
                        <div className='mx-auto w-20 h-20 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-4xl mb-5'>
                            <FaShoppingBag />
                        </div>

                        <h2 className='text-2xl font-black text-gray-800'>
                            Your cart is empty
                        </h2>

                        <p className='text-gray-500 mt-2'>
                            Add products to your cart before checkout.
                        </p>

                        <Link
                            to='/'
                            className='inline-flex mt-6 bg-red-600 hover:bg-black text-white px-7 py-3 rounded-full font-bold transition-all'
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className='grid lg:grid-cols-3 gap-8'>

                        <div className='lg:col-span-2 bg-white rounded-3xl shadow-xl border p-5 md:p-6'>

                            <h2 className='text-2xl font-black text-gray-800 mb-5'>
                                Order Items
                            </h2>

                            <div className='space-y-4'>
                                {cartItems.map((item) => {
                                    const product = item?.productId
                                    const quantity = item?.quantity || 1
                                    const priceTTC = getPriceTTC(product?.sellingPrice)
                                    const totalItemTTC = priceTTC * Number(quantity)

                                    return (
                                        <div
                                            key={item?._id}
                                            className='flex flex-col sm:flex-row gap-4 border rounded-2xl p-4'
                                        >
                                            <img
                                                src={product?.productImage?.[0]}
                                                alt={product?.productName || "product"}
                                                className='w-full sm:w-28 h-28 object-contain bg-slate-100 rounded-xl'
                                            />

                                            <div className='flex-1'>
                                                <h3 className='font-bold text-gray-800 text-lg'>
                                                    {product?.productName}
                                                </h3>

                                                <p className='text-gray-500 capitalize text-sm mt-1'>
                                                    {product?.category}
                                                </p>
                                                <div className='mt-2 flex flex-wrap gap-2'>
                                                    {product?.subCategory &&
                                                        (Array.isArray(product.subCategory)
                                                            ? product.subCategory
                                                            : [product.subCategory]
                                                        ).map((sub, index) => (
                                                            <span
                                                                key={index}
                                                                className='px-2 py-1 text-xs bg-red-50 text-red-600 rounded-full border border-red-100'
                                                            >
                                                                {typeof sub === "object"
                                                                    ? sub.label || sub.value
                                                                    : sub}
                                                            </span>
                                                        ))
                                                    }
                                                </div>

                                                <p className='font-black text-red-600 mt-3'>
                                                    {displayCurrency(priceTTC)}
                                                    <span className='text-xs text-gray-400 ml-2'>
                                                        TTC 20%
                                                    </span>
                                                </p>

                                                <p className='text-gray-500 text-sm mt-1'>
                                                    Quantity: {quantity}
                                                </p>

                                                <p className='text-gray-700 text-sm font-bold mt-1'>
                                                    Total produit: {displayCurrency(totalItemTTC)}
                                                </p>
                                            </div>

                                            <button
                                                type='button'
                                                onClick={() => handleRemoveItem(item?._id)}
                                                className='self-start sm:self-center w-10 h-10 rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all'
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>

                        <aside className='bg-white rounded-3xl shadow-xl border p-6 h-fit sticky top-28'>

                            <h2 className='text-2xl font-black text-gray-800 mb-6'>
                                Order Summary
                            </h2>

                            <div className='space-y-4 text-gray-600'>

                                <div className='flex justify-between'>
                                    <span>Sous-total HT</span>
                                    <span className='font-bold text-gray-800'>
                                        {displayCurrency(subTotalHT)}
                                    </span>
                                </div>

                                <div className='flex justify-between'>
                                    <span>TVA 20%</span>
                                    <span className='font-bold text-gray-800'>
                                        {displayCurrency(taxAmount)}
                                    </span>
                                </div>

                                <div className='flex justify-between'>
                                    <span>Sous-total TTC</span>
                                    <span className='font-bold text-gray-800'>
                                        {displayCurrency(subTotalTTC)}
                                    </span>
                                </div>

                                <div className='flex justify-between'>
                                    <span>
                                        Livraison
                                        {deliveryInfo?.deliveryMethod ? ` (${deliveryInfo.deliveryMethod})` : ""}
                                    </span>
                                    <span className={`font-bold ${deliveryFee === 0 ? "text-green-600" : "text-gray-800"}`}>
                                        {deliveryFee === 0
                                            ? "Gratuit"
                                            : displayCurrency(deliveryFee)}
                                    </span>
                                </div>

                                {!deliveryInfo && (
                                    <div className='rounded-2xl bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-700'>
                                        Aucune information de livraison trouvee. Retournez a la page livraison pour choisir un mode.
                                    </div>
                                )}

                                <div className='border-t pt-4 flex justify-between text-xl'>
                                    <span className='font-black text-gray-800'>
                                        Total
                                    </span>
                                    <span className='font-black text-red-600'>
                                        {displayCurrency(total)}
                                    </span>
                                </div>

                            </div>

                            <button
                                type='button'
                                onClick={handlePayment}
                                disabled={payLoading}
                                className='mt-7 w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-black disabled:bg-red-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-full font-black transition-all'
                            >
                                <FaCreditCard />
                                {payLoading ? "Redirecting..." : "Pay with Stripe"}
                            </button>

                            <p className='mt-4 text-sm text-gray-500 flex items-center justify-center gap-2'>
                                <FaLock className='text-green-600' />
                                Secure payment powered by Stripe
                            </p>

                        </aside>

                    </div>
                )}

            </div>

        </main>
    )
}

export default Checkout
