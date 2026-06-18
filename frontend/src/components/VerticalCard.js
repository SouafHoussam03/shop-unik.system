import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'

const SmallCard = ({ loading, data = [] }) => {

    const { fetchUserAddToCart } =
        useContext(Context)

    const handleAddToCart = async (e, id) => {

        e.preventDefault()
        e.stopPropagation()

        await addToCart(e, id)

        fetchUserAddToCart()
    }

    return (

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5'>

            {
                data?.map((product) => (

                    <Link
                        key={product?._id}
                        to={`/product/${product?._id}`}
                        onClick={scrollTop}
                        className='bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group'
                    >

                        {/* IMAGE */}

                        <div className='bg-gray-100 h-32 md:h-40 overflow-hidden flex items-center justify-center'>

                            <img
                                src={
                                    product?.productImage?.[0]
                                    || "/no-image.png"
                                }
                                alt={product?.productName}
                                className='w-full h-full object-cover group-hover:scale-105 transition-all duration-500'
                            />

                        </div>


                        {/* CONTENT */}

                        <div className='p-3'>

                            {/* TITLE */}

                            <h2 className='text-sm md:text-base font-black text-gray-800 line-clamp-2 leading-tight min-h-[40px]'>

                                {product?.productName}

                            </h2>


                            {/* CATEGORY */}

                            <p className='text-xs text-gray-500 mt-1 capitalize'>

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
                {sub}
            </span>
        ))
    }
</div>


                            {/* PRICE */}

                            <div className='flex items-center gap-2 mt-3 flex-wrap'>

                                <p className='text-red-600 font-black text-lg'>

                                    {displayINRCurrency(
                                        product?.sellingPrice
                                    )}

                                </p>

                                <p className='text-gray-400 line-through text-xs'>

                                    {displayINRCurrency(
                                        product?.price
                                    )}

                                </p>

                            </div>


                            {/* BUTTON */}

                            <button
                                onClick={(e) =>
                                    handleAddToCart(
                                        e,
                                        product?._id
                                    )
                                }
                                className='mt-3 w-full bg-red-600 hover:bg-black text-white text-sm font-bold py-2 rounded-xl transition-all duration-300'
                            >

                                Add to Cart

                            </button>

                        </div>

                    </Link>

                ))
            }

        </div>

    )
}

export default SmallCard