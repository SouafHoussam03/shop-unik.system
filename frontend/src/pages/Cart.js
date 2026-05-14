import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md"
import { FaShoppingCart } from "react-icons/fa"

const Cart = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const context = useContext(Context)

    const loadingCart = new Array(4).fill(null)

    // ================= FETCH CART =================
    const fetchData = async () => {

        const response = await fetch(
            SummaryApi.addToCartProductView.url,
            {
                method: SummaryApi.addToCartProductView.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
            }
        )

        const responseData = await response.json()

        if (responseData.success) {
            setData(responseData.data)
        }
    }

    useEffect(() => {

        setLoading(true)

        fetchData()

        setLoading(false)

    }, [])

    // ================= INCREASE =================
    const increaseQty = async (id, qty) => {

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
    }

    // ================= DECREASE =================
    const decraseQty = async (id, qty) => {

        if (qty >= 2) {

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
        }
    }

    // ================= DELETE =================
    const deleteCartProduct = async (id) => {

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

            fetchData()

            context.fetchUserAddToCart()
        }
    }

    // ================= TOTAL =================
    const totalQty = data.reduce(
        (previousValue, currentValue) =>
            previousValue + currentValue.quantity,
        0
    )

    const totalPrice = data.reduce(
        (preve, curr) =>
            preve +
            (
                curr.quantity *
                curr?.productId?.sellingPrice
            ),
        0
    )

    return (

        <div className='bg-slate-100 min-h-screen py-10 px-4'>

            <div className='container mx-auto'>

                {/* ================= PAGE HEADER ================= */}
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
                Découvrez vos produits sélectionnés chez UNIK SYSTEM
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

{/* ================= CONTENT ================= */}
<div className='flex flex-col lg:flex-row gap-8'>

    {/* ================= PRODUCTS ================= */}
    <div className='w-full lg:w-[70%]'>

        {
            loading ? (

                loadingCart.map((_, index) => {

                    return (
                        <div
                            key={index}
                            className='bg-white h-40 rounded-3xl animate-pulse mb-5'
                        >
                        </div>
                    )
                })

            ) : (

                data.map((product) => {

                    return (

                        <div
                            key={product?._id}
                            className='group bg-white rounded-[30px] border border-gray-100 shadow-sm p-5 mb-6 flex gap-5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500'
                        >

                            {/* IMAGE */}
                            <div className='w-36 h-36 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden flex items-center justify-center'>

                                <img
                                    src={product?.productId?.productImage[0]}
                                    className='w-full h-full object-contain group-hover:scale-110 transition-all duration-500'
                                    alt=''
                                />

                            </div>

                            {/* INFO */}
                            <div className='flex-1 relative'>

                                {/* DELETE */}
                                <button
                                    onClick={() => deleteCartProduct(product?._id)}
                                    className='absolute right-0 top-0 bg-red-100 hover:bg-red-600 hover:text-white text-red-600 p-3 rounded-full transition-all duration-300 shadow-sm'
                                >

                                    <MdDelete />

                                </button>

                                <h2 className='text-2xl font-bold text-gray-800 line-clamp-1'>
                                    {product?.productId?.productName}
                                </h2>

                                <p className='text-gray-500 capitalize mt-1'>
                                    {product?.productId?.category}
                                </p>

                                {/* PRICE */}
                                <div className='flex items-center justify-between mt-5'>

                                    <p className='text-red-600 text-2xl font-black'>
                                        {displayCurrency(product?.productId?.sellingPrice)}
                                    </p>

                                    <p className='text-gray-700 text-xl font-bold'>
                                        {displayCurrency(
                                            product?.productId?.sellingPrice *
                                            product?.quantity
                                        )}
                                    </p>

                                </div>

                                {/* QTY */}
                                <div className='flex items-center gap-4 mt-6'>

                                    <button
                                        onClick={() => decraseQty(product?._id, product?.quantity)}
                                        className='w-11 h-11 rounded-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 text-xl'
                                    >
                                        -
                                    </button>

                                    <span className='text-xl font-bold text-gray-800'>
                                        {product?.quantity}
                                    </span>

                                    <button
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
            )
        }

    </div>

    {/* ================= SUMMARY ================= */}
    <div className='w-full lg:w-[30%]'>

        <div className='bg-white rounded-[30px] border border-gray-100 shadow-xl p-7 sticky top-24 backdrop-blur-xl'>

            <h2 className='text-3xl font-black text-gray-800 mb-7'>
                Résumé
            </h2>

            <div className='flex justify-between py-4 border-b text-lg'>

                <span className='text-gray-500'>
                    Quantité
                </span>

                <span className='font-bold text-gray-800'>
                    {totalQty}
                </span>

            </div>

            <div className='flex justify-between py-5 text-2xl font-black'>

                <span className='text-gray-800'>
                    Total
                </span>

                <span className='text-red-600'>
                    {displayCurrency(totalPrice)}
                </span>

            </div>

            {/* PAYMENT BUTTON */}
            <button
                className='
                w-full
                relative
                overflow-hidden
                bg-red-600
                hover:bg-black
                text-white
                py-4
                rounded-full
                text-lg
                font-semibold
                transition-all
                duration-500
                hover:scale-[1.03]
                shadow-lg
                group
                '
            >

                <span className='relative z-10 flex items-center justify-center gap-2'>

                    Procéder au paiement

                    <span className='group-hover:translate-x-1 transition-all duration-300'>
                        →
                    </span>

                </span>

            </button>

        </div>

    </div>

</div>

            </div>

        </div>
    )
}

export default Cart