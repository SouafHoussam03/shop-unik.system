import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'

const VerticalCard = ({ loading, data = [] }) => {

    const loadingList = new Array(10).fill(null)
    const { fetchUserAddToCart } = useContext(Context)

    // ✅ add to cart safe
    const handleAddToCart = async (e, id) => {
        e.preventDefault() // مهم باش Link ما يتحركش
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>

            {
                loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow'>
                            <div className='bg-slate-200 h-48 flex justify-center items-center animate-pulse'></div>
                            <div className='p-4 grid gap-3'>
                                <div className='h-4 bg-slate-200 rounded-full animate-pulse'></div>
                                <div className='h-4 bg-slate-200 rounded-full animate-pulse'></div>
                                <div className='h-4 bg-slate-200 rounded-full animate-pulse'></div>
                            </div>
                        </div>
                    ))
                ) : (
                    data?.map((product) => (
                        <Link
                            key={product?._id}
                            to={`/product/${product?._id}`} // ✔️ fix
                            className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow'
                            onClick={scrollTop}
                        >
                            <div className='bg-slate-200 h-48 flex justify-center items-center'>
                                <img
                                    src={product?.productImage?.[0] || "/no-image.png"} // ✔️ safe
                                    alt={product?.productName}
                                    className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'
                                />
                            </div>

                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium text-base md:text-lg line-clamp-1 text-black'>
                                    {product?.productName}
                                </h2>

                                <p className='capitalize text-slate-500'>
                                    {product?.category}
                                </p>

                                <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium'>
                                        {displayINRCurrency(product?.sellingPrice)}
                                    </p>
                                    <p className='text-slate-500 line-through'>
                                        {displayINRCurrency(product?.price)}
                                    </p>
                                </div>

                                <button
                                    className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full'
                                    onClick={(e) => handleAddToCart(e, product?._id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    ))
                )
            }

        </div>
    )
}

export default VerticalCard