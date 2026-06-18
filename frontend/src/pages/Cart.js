import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import SummaryApi from '../common'
import Context from '../context'
import displayCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md"
import { FaArrowRight, FaShoppingCart, FaTruck } from "react-icons/fa"

const TAX_RATE = 0.20

const getPriceTTC = (price) => Number(price || 0) * (1 + TAX_RATE)

const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const context = useContext(Context)
    const navigate = useNavigate()
    const loadingCart = new Array(4).fill(null)

    const fetchData = async () => {
        try {
            setLoading(true)

            const response = await fetch(
                SummaryApi.addToCartProductView.url,
                {
                    method: SummaryApi.addToCartProductView.method,
                    credentials: 'include',
                    headers: {
                        "content-type": 'application/json'
                    }
                }
            )

            const responseData = await response.json()

            if (responseData.success) {
                setData(responseData.data || [])
            }

            if (responseData.error) {
                toast.error(responseData.message)
            }
        } catch (error) {
            toast.error("Failed to load cart")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const increaseQty = async (id, qty) => {
        try {
            const response = await fetch(
                SummaryApi.updateCartProduct.url,
                {
                    method: SummaryApi.updateCartProduct.method,
                    credentials: 'include',
                    headers: {
                        "content-type": 'application/json'
                    },
                    body: JSON.stringify({
                        _id: id,
                        quantity: qty + 1
                    })
                }
            )

            const responseData = await response.json()

            if (responseData.success) {
                fetchData()
            }

            if (responseData.error) {
                toast.error(responseData.message)
            }
        } catch (error) {
            toast.error("Failed to update quantity")
        }
    }

    const decraseQty = async (id, qty) => {
        if (qty < 2) return

        try {
            const response = await fetch(
                SummaryApi.updateCartProduct.url,
                {
                    method: SummaryApi.updateCartProduct.method,
                    credentials: 'include',
                    headers: {
                        "content-type": 'application/json'
                    },
                    body: JSON.stringify({
                        _id: id,
                        quantity: qty - 1
                    })
                }
            )

            const responseData = await response.json()

            if (responseData.success) {
                fetchData()
            }

            if (responseData.error) {
                toast.error(responseData.message)
            }
        } catch (error) {
            toast.error("Failed to update quantity")
        }
    }

    const deleteCartProduct = async (id) => {
        try {
            const response = await fetch(
                SummaryApi.deleteCartProduct.url,
                {
                    method: SummaryApi.deleteCartProduct.method,
                    credentials: 'include',
                    headers: {
                        "content-type": 'application/json'
                    },
                    body: JSON.stringify({
                        _id: id
                    })
                }
            )

            const responseData = await response.json()

            if (responseData.success) {
                toast.success(responseData.message)
                fetchData()
                context.fetchUserAddToCart()
            }

            if (responseData.error) {
                toast.error(responseData.message)
            }
        } catch (error) {
            toast.error("Failed to delete product")
        }
    }

    const totalQty = useMemo(() => {
        return data.reduce(
            (previousValue, currentValue) =>
                previousValue + Number(currentValue.quantity || 0),
            0
        )
    }, [data])

    const totalPriceHT = useMemo(() => {
        return data.reduce(
            (preve, curr) =>
                preve +
                (
                    Number(curr.quantity || 0) *
                    Number(curr?.productId?.sellingPrice || 0)
                ),
            0
        )
    }, [data])

    const totalTax = useMemo(() => totalPriceHT * TAX_RATE, [totalPriceHT])
    const totalPriceTTC = useMemo(() => totalPriceHT + totalTax, [totalPriceHT, totalTax])

    const handleGoToDelivery = () => {
        if (data.length === 0) {
            toast.error("Votre panier est vide")
            return
        }

        navigate("/livraison")
    }

    return (
        <div className='bg-slate-100 min-h-screen py-10 px-4'>

            <div className='container mx-auto'>

                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10'>

                    <div className='flex items-center gap-4'>

                        <div className='bg-gradient-to-r from-red-600 to-black text-white p-4 rounded-2xl text-2xl shadow-lg'>
                            <FaShoppingCart />
                        </div>

                        <div>
                            <h2 className='text-4xl font-black text-gray-800 tracking-tight'>
                                Votre Panier
                            </h2>

                            <p className='text-gray-500 mt-1'>
                                Decouvrez vos produits selectionnes chez UNIK SYSTEM
                            </p>
                        </div>

                    </div>

                    <div className='bg-white px-5 py-3 rounded-2xl shadow-sm border'>
                        <p className='text-gray-500 text-sm'>
                            Produits
                        </p>

                        <h2 className='text-2xl font-bold text-red-600'>
                            {totalQty}
                        </h2>
                    </div>

                </div>

                <div className='flex flex-col lg:flex-row gap-8'>

                    <div className='w-full lg:w-[70%]'>

                        {loading ? (
                            loadingCart.map((_, index) => (
                                <div
                                    key={index}
                                    className='bg-white h-40 rounded-3xl animate-pulse mb-5'
                                />
                            ))
                        ) : data.length === 0 ? (
                            <div className='bg-white rounded-3xl shadow-sm border p-10 text-center'>
                                <div className='mx-auto w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-3xl mb-4'>
                                    <FaShoppingCart />
                                </div>

                                <h3 className='text-2xl font-black text-gray-800'>
                                    Votre panier est vide
                                </h3>

                                <p className='text-gray-500 mt-2'>
                                    Ajoutez des produits avant de passer au paiement.
                                </p>
                            </div>
                        ) : (
                            data.map((product) => {
                                const productPriceTTC = getPriceTTC(product?.productId?.sellingPrice)
                                const productTotalTTC = productPriceTTC * Number(product?.quantity || 0)

                                return (
                                    <div
                                        key={product?._id}
                                        className='group bg-white rounded-[30px] border border-gray-100 shadow-sm p-5 mb-6 flex flex-col sm:flex-row gap-5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500'
                                    >
                                        <div className='w-full sm:w-36 h-36 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden flex items-center justify-center'>
                                            <img
                                                src={product?.productId?.productImage?.[0]}
                                                className='w-full h-full object-contain group-hover:scale-110 transition-all duration-500'
                                                alt={product?.productId?.productName || "product"}
                                            />
                                        </div>

                                        <div className='flex-1 relative'>

                                            <button
                                                type='button'
                                                onClick={() => deleteCartProduct(product?._id)}
                                                className='absolute right-0 top-0 bg-red-100 hover:bg-red-600 hover:text-white text-red-600 p-3 rounded-full transition-all duration-300 shadow-sm'
                                            >
                                                <MdDelete />
                                            </button>

                                            <h2 className='text-2xl font-bold text-gray-800 line-clamp-1 pr-12'>
                                                {product?.productId?.productName}
                                            </h2>

                                            <div className='mt-2 flex flex-wrap gap-1'>

                                                <span className='px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold'>
                                                    {product?.productId?.category}
                                                </span>

                                                {product?.productId?.subCategory &&
                                                    (Array.isArray(product.productId.subCategory)
                                                        ? product.productId.subCategory
                                                        : [product.productId.subCategory]
                                                    ).map((sub, index) => (
                                                        <span
                                                            key={index}
                                                            className='px-2 py-1 bg-red-50 text-red-600 border border-red-100 rounded-full text-xs font-medium'
                                                        >
                                                            {typeof sub === "object"
                                                                ? sub.label || sub.value
                                                                : sub}
                                                        </span>
                                                    ))
                                                }

                                            </div>

                                            <div className='flex items-center justify-between mt-5'>
                                                <div>
                                                    <p className='text-red-600 text-2xl font-black'>
                                                        {displayCurrency(productPriceTTC)}
                                                    </p>
                                                    <p className='text-xs font-semibold text-gray-400 uppercase tracking-wide'>
                                                        TTC 20%
                                                    </p>
                                                </div>

                                                <div className='text-right'>
                                                    <p className='text-gray-700 text-xl font-bold'>
                                                        {displayCurrency(productTotalTTC)}
                                                    </p>
                                                    <p className='text-xs font-semibold text-gray-400 uppercase tracking-wide'>
                                                        Total TTC
                                                    </p>
                                                </div>
                                            </div>

                                            <div className='flex items-center gap-4 mt-6'>

                                                <button
                                                    type='button'
                                                    onClick={() => decraseQty(product?._id, product?.quantity)}
                                                    className='w-11 h-11 rounded-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 text-xl'
                                                >
                                                    -
                                                </button>

                                                <span className='text-xl font-bold text-gray-800'>
                                                    {product?.quantity}
                                                </span>

                                                <button
                                                    type='button'
                                                    onClick={() => increaseQty(product?._id, product?.quantity)}
                                                    className='w-11 h-11 rounded-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 text-xl'
                                                >
                                                    +
                                                </button>

                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        )}

                    </div>

                    <div className='w-full lg:w-[30%]'>

                        <div className='bg-white rounded-[30px] border border-gray-100 shadow-xl p-7 sticky top-24 backdrop-blur-xl'>

                            <h2 className='text-3xl font-black text-gray-800 mb-7'>
                                Resume
                            </h2>

                            <div className='flex justify-between py-4 border-b text-lg'>
                                <span className='text-gray-500'>
                                    Quantite
                                </span>

                                <span className='font-bold text-gray-800'>
                                    {totalQty}
                                </span>
                            </div>

                            <div className='flex justify-between py-4 border-b text-lg'>
                                <span className='text-gray-500'>
                                    Sous-total HT
                                </span>

                                <span className='font-bold text-gray-800'>
                                    {displayCurrency(totalPriceHT)}
                                </span>
                            </div>

                            <div className='flex justify-between py-4 border-b text-lg'>
                                <span className='text-gray-500'>
                                    TVA 20%
                                </span>

                                <span className='font-bold text-gray-800'>
                                    {displayCurrency(totalTax)}
                                </span>
                            </div>

                            <div className='flex justify-between py-5 text-2xl font-black'>
                                <span className='text-gray-800'>
                                    Total TTC
                                </span>

                                <span className='text-red-600'>
                                    {displayCurrency(totalPriceTTC)}
                                </span>
                            </div>

                            <button
                                type='button'
                                onClick={handleGoToDelivery}
                                disabled={data.length === 0}
                                className='w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-black disabled:bg-red-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-full font-bold transition-all'
                            >
                                <FaTruck />
                                Continuer la livraison
                                <FaArrowRight />
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Cart
