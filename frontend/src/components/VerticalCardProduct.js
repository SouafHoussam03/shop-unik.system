import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const VerticalCardProduct = ({ category, heading }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(10).fill(null)

    const scrollElement = useRef()
    const { fetchUserAddToCart } = useContext(Context)

    // ✅ add to cart
    const handleAddToCart = async (e, id) => {
        e.preventDefault() // مهم باش Link ما يتحركش
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    // ✅ fetch data safe
    const fetchData = async () => {
        try {
            setLoading(true)

            const categoryProduct = await fetchCategoryWiseProduct(category)

            console.log("horizontal data", categoryProduct?.data)

            setData(categoryProduct?.data || []) // ✔️ safe

        } catch (error) {
            console.error("Fetch error:", error)
            setData([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]) // ✔️ مهم

    // ✅ scroll
    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }

    return (
        <div className='container mx-auto px-4 my-6 relative'>

            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div
                className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all'
                ref={scrollElement}
            >

                {/* buttons */}
                <button
                    className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block'
                    onClick={scrollLeft}
                >
                    <FaAngleLeft />
                </button>

                <button
                    className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block'
                    onClick={scrollRight}
                >
                    <FaAngleRight />
                </button>

                {/* loading skeleton */}
                {
                    loading ? (
                        loadingList.map((_, index) => (
                            <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                                <div className='bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse'></div>
                                <div className='p-4 grid gap-3'>
                                    <div className='h-4 bg-slate-200 rounded-full animate-pulse'></div>
                                    <div className='h-4 bg-slate-200 rounded-full animate-pulse'></div>
                                    <div className='h-4 bg-slate-200 rounded-full animate-pulse'></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map((product) => (
                            <Link
                                key={product?._id}
                                to={`/product/${product?._id}`} // ✔️ fix route
                                className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'
                            >
                                <div className='bg-slate-200 h-48 p-4 flex justify-center items-center'>
                                    <img
                                        src={product?.productImage?.[0] || "/no-image.png"} // ✔️ safe image
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
        </div>
    )
}

export default VerticalCardProduct