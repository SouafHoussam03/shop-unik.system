import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'

import { Link } from 'react-router-dom'
import { FaBoxOpen, FaRedoAlt, FaShoppingCart } from 'react-icons/fa'

import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayCurrency from '../helpers/displayCurrency'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'

const CategroyWiseProductDisplay = ({
    category,
    heading
}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const loadingList = useMemo(() => {
        return new Array(8).fill(null)
    }, [])

    const { fetchUserAddToCart } =
        useContext(Context)

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            setError("")

            const categoryProduct =
                await fetchCategoryWiseProduct(category)

            setData(categoryProduct?.data || [])

        } catch (error) {
            console.error("Category products error:", error)
            setData([])
            setError("Failed to load products.")
        } finally {
            setLoading(false)
        }
    }, [category])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleAddToCart = useCallback(async (e, id) => {
        e.preventDefault()
        e.stopPropagation()

        if (!id) return

        await addToCart(e, id)
        fetchUserAddToCart()
    }, [fetchUserAddToCart])

    return (
        <section className='container mx-auto px-4 my-8'>

            <div className='flex items-center justify-between gap-4 mb-5'>

                <h2 className='text-2xl font-bold text-gray-800'>
                    {heading || "Products"}
                </h2>

                {
                    !loading && data?.length > 0 && (
                        <span className='text-sm font-semibold text-red-600 bg-red-50 px-4 py-2 rounded-full'>
                            {data.length} items
                        </span>
                    )
                }

            </div>

            {
                loading && (
                    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5'>
                        {
                            loadingList.map((_, index) => (
                                <div
                                    key={index}
                                    className='bg-white rounded-2xl shadow-sm border overflow-hidden animate-pulse'
                                >
                                    <div className='h-52 bg-slate-200'></div>

                                    <div className='p-4 space-y-3'>
                                        <div className='h-5 bg-slate-200 rounded-full w-4/5'></div>
                                        <div className='h-4 bg-slate-200 rounded-full w-1/2'></div>

                                        <div className='flex gap-3'>
                                            <div className='h-5 bg-slate-200 rounded-full w-24'></div>
                                            <div className='h-5 bg-slate-200 rounded-full w-24'></div>
                                        </div>

                                        <div className='h-9 bg-slate-200 rounded-full w-32'></div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }

            {
                !loading && error && (
                    <div className='bg-white border rounded-2xl p-10 text-center shadow-sm'>
                        <div className='mx-auto w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-4'>
                            <FaRedoAlt />
                        </div>

                        <h3 className='text-xl font-bold text-gray-800 mb-2'>
                            Products Not Loaded
                        </h3>

                        <p className='text-gray-500 mb-5'>
                            {error}
                        </p>

                        <button
                            type='button'
                            onClick={fetchData}
                            className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all'
                        >
                            Try Again
                        </button>
                    </div>
                )
            }

            {
                !loading && !error && data?.length === 0 && (
                    <div className='bg-white border rounded-2xl p-10 text-center shadow-sm'>
                        <div className='mx-auto w-14 h-14 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-2xl mb-4'>
                            <FaBoxOpen />
                        </div>

                        <h3 className='text-xl font-bold text-gray-800 mb-2'>
                            No Products Found
                        </h3>

                        <p className='text-gray-500'>
                            No products available in this category.
                        </p>
                    </div>
                )
            }

            {
                !loading && !error && data?.length > 0 && (
                    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5'>

                        {
                            data.map((product) => (
                                <div
                                    key={product?._id}
                                    className='bg-white rounded-2xl shadow-sm border overflow-hidden group hover:shadow-lg transition-all'
                                >

                                    <Link
                                        to={`/product/${product?._id}`}
                                        onClick={scrollTop}
                                        className='block'
                                    >
                                        <div className='bg-slate-100 h-52 p-4 flex justify-center items-center overflow-hidden'>

                                            {
                                                product?.productImage?.[0] ? (
                                                    <img
                                                        src={product.productImage[0]}
                                                        alt={product?.productName || "product"}
                                                        className='h-full w-full object-contain mix-blend-multiply group-hover:scale-110 transition-all duration-300'
                                                    />
                                                ) : (
                                                    <div className='text-slate-400 flex flex-col items-center gap-2'>
                                                        <FaBoxOpen className='text-4xl' />
                                                        <span className='text-sm font-semibold'>
                                                            No image
                                                        </span>
                                                    </div>
                                                )
                                            }

                                        </div>

                                        <div className='p-4 pb-2'>
                                            <h3 className='font-semibold text-base md:text-lg text-black line-clamp-1'>
                                                {product?.productName}
                                            </h3>

                                            <p className='capitalize text-slate-500 text-sm mt-1 line-clamp-1'>
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

                                            <div className='flex flex-wrap items-center gap-3 mt-3'>
                                                <p className='text-red-600 font-bold'>
                                                    {displayCurrency(product?.sellingPrice)}
                                                </p>

                                                {
                                                    Number(product?.price) > Number(product?.sellingPrice) && (
                                                        <p className='text-slate-400 line-through text-sm'>
                                                            {displayCurrency(product?.price)}
                                                        </p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </Link>

                                    <div className='p-4 pt-2'>
                                        <button
                                            type='button'
                                            onClick={(e) =>
                                                handleAddToCart(e, product?._id)
                                            }
                                            className='w-full flex items-center justify-center gap-2 text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-full font-semibold transition-all'
                                        >
                                            <FaShoppingCart />
                                            Add to Cart
                                        </button>
                                    </div>

                                </div>
                            ))
                        }

                    </div>
                )
            }

        </section>
    )
}

export default CategroyWiseProductDisplay
