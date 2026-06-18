import React, {
    useContext,
    useEffect,
    useRef,
    useState
} from 'react'

import fetchCategoryWiseProduct
from '../helpers/fetchCategoryWiseProduct'

import displayINRCurrency
from '../helpers/displayCurrency'

import {
    FaAngleLeft,
    FaAngleRight,
    FaStar
} from 'react-icons/fa6'

import {
    FaShoppingCart
} from 'react-icons/fa'

import { Link }from 'react-router-dom'

import addToCart from '../helpers/addToCart'

import Context from '../context'

const VerticalCardProduct = ({
    category,
    heading
}) => {

    const [data, setData] =
        useState([])

    const [loading, setLoading] =
        useState(true)

    const loadingList =
        new Array(10).fill(null)

    const scrollElement =
        useRef()

    const { fetchUserAddToCart } =
        useContext(Context)

    // ADD TO CART

    const handleAddToCart =
        async (e, id) => {

            e.preventDefault()

            e.stopPropagation()

            await addToCart(e, id)

            fetchUserAddToCart()
        }

    // FETCH DATA

    const fetchData = async () => {

        try {

            setLoading(true)

            const categoryProduct =
                await fetchCategoryWiseProduct(category)

            setData(
                categoryProduct?.data || []
            )

        } catch (error) {

            console.error(
                "Fetch error:",
                error
            )

            setData([])

        } finally {

            setLoading(false)
        }
    }

    useEffect(() => {

        fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])

    // SCROLL

    const scrollRight = () => {

        scrollElement.current.scrollLeft += 400
    }

    const scrollLeft = () => {

        scrollElement.current.scrollLeft -= 400
    }

    return (

        <section className='container mx-auto px-4 my-10 relative'>

            {/* HEADER */}

            <div className='flex items-center justify-between mb-8'>

                <div>

                    <h2 className='text-2xl md:text-4xl font-black text-gray-800'>

                        {heading}

                    </h2>

                    <div className='w-20 h-1 bg-red-600 rounded-full mt-3'></div>

                </div>


                {/* BUTTONS */}

                <div className='hidden md:flex items-center gap-4'>

                    <button
                        onClick={scrollLeft}
                        className='w-12 h-12 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-red-600 hover:text-white transition-all flex items-center justify-center text-lg'
                    >

                        <FaAngleLeft />

                    </button>

                    <button
                        onClick={scrollRight}
                        className='w-12 h-12 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-red-600 hover:text-white transition-all flex items-center justify-center text-lg'
                    >

                        <FaAngleRight />

                    </button>

                </div>

            </div>


            {/* PRODUCTS */}

            <div
                ref={scrollElement}
                className='flex gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-2'
            >

                {
                    loading ? (

                        loadingList.map((_, index) => (

                            <div
                                key={index}
                                className='min-w-[260px] md:min-w-[320px] bg-white rounded-[30px] overflow-hidden border border-gray-100 shadow-lg animate-pulse'
                            >

                                <div className='bg-slate-200 h-56'></div>

                                <div className='p-5 space-y-4'>

                                    <div className='h-4 bg-slate-200 rounded-full'></div>

                                    <div className='h-4 w-24 bg-slate-200 rounded-full'></div>

                                    <div className='h-5 w-28 bg-slate-200 rounded-full'></div>

                                    <div className='h-12 bg-slate-200 rounded-2xl'></div>

                                </div>

                            </div>

                        ))

                    ) : (

                        data.map((product) => (

                            <Link
                                key={product?._id}
                                to={`/product/${product?._id}`}
                                className='group relative min-w-[260px] md:min-w-[320px] bg-white rounded-[30px] overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500'
                            >

                                {/* BADGE */}

                                <div className='absolute top-4 left-4 z-20 flex flex-col gap-2'>

                                    <span className='bg-red-600 text-white text-[10px] md:text-xs px-3 py-1 rounded-full font-black uppercase shadow-lg'>

                                        New

                                    </span>

                                    <span className='bg-black text-white text-[10px] md:text-xs px-3 py-1 rounded-full font-bold shadow-lg'>

                                        Premium

                                    </span>

                                </div>


                                {/* IMAGE */}

                                <div className='relative h-52 md:h-72 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center'>

                                    {/* GLOW */}

                                    <div className='absolute w-52 h-52 bg-red-100 rounded-full blur-3xl opacity-40 group-hover:scale-125 transition-all duration-700'></div>

                                    <img
                                        src={
                                            product?.productImage?.[0]
                                            || "/no-image.png"
                                        }
                                        alt={product?.productName}
                                        className='relative z-10 w-full h-full object-contain p-5 group-hover:scale-110 transition-all duration-700'
                                    />

                                </div>


                                {/* CONTENT */}

                                <div className='p-5 md:p-6'>

                                    {/* CATEGORY + RATING */}

                                    <div className='flex items-center justify-between mb-3'>

                                        <p className='text-[11px] md:text-xs uppercase tracking-[2px] text-red-600 font-black'>

                                            {product?.category}

                                        </p>
                                        

                                        <div className='flex items-center gap-1 text-yellow-500 text-xs font-bold'>

                                            <FaStar />

                                            4.9

                                        </div>

                                    </div>
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
<br/>


                                    {/* TITLE */}

                                    <h2 className='font-black text-lg md:text-2xl text-gray-800 line-clamp-2 min-h-[58px] group-hover:text-red-600 transition-all duration-300'>

                                        {product?.productName}

                                    </h2>


                                    {/* PRICE */}

                                    <div className='flex items-end gap-3 mt-5 flex-wrap'>

                                        <p className='text-red-600 font-black text-2xl md:text-3xl tracking-tight'>

                                            {displayINRCurrency(
                                                product?.sellingPrice
                                            )}

                                        </p>

                                        <p className='text-gray-400 line-through text-sm md:text-base mb-1'>

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
                                        className='mt-6 w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-black hover:to-gray-900 text-white font-black text-sm md:text-base py-3 md:py-4 rounded-2xl transition-all duration-500 shadow-xl flex items-center justify-center gap-3 uppercase tracking-wide'
                                    >

                                        <FaShoppingCart />

                                        Add To Cart

                                    </button>

                                </div>


                                {/* BOTTOM EFFECT */}

                                <div className='absolute bottom-0 left-0 h-1 w-0 bg-red-600 group-hover:w-full transition-all duration-500'></div>

                            </Link>

                        ))

                    )
                }

            </div>

        </section>

    )
}

export default VerticalCardProduct