import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from "react"

import { Link } from "react-router-dom"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import { FaBoxOpen, FaShoppingCart } from "react-icons/fa"

import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct"
import displayCurrency from "../helpers/displayCurrency"
import addToCart from "../helpers/addToCart"
import Context from "../context"

const HorizontalCardProduct = ({
    category,
    heading
}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)

    const scrollElement = useRef(null)
    const { fetchUserAddToCart } = useContext(Context)

    const updateScrollState = useCallback(() => {
        const element = scrollElement.current

        if (!element) return

        setCanScrollLeft(element.scrollLeft > 0)
        setCanScrollRight(
            element.scrollLeft + element.clientWidth < element.scrollWidth - 5
        )
    }, [])

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)

            const response =
                await fetchCategoryWiseProduct(category)

            setData(response?.data || [])
        } catch (error) {
            setData([])
        } finally {
            setLoading(false)

            setTimeout(() => {
                updateScrollState()
            }, 100)
        }
    }, [category, updateScrollState])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    useEffect(() => {
        const element = scrollElement.current

        if (!element) return

        updateScrollState()

        element.addEventListener("scroll", updateScrollState)
        window.addEventListener("resize", updateScrollState)

        return () => {
            element.removeEventListener("scroll", updateScrollState)
            window.removeEventListener("resize", updateScrollState)
        }
    }, [updateScrollState, data])

    const handleAddToCart = useCallback(async (e, id) => {
        e.preventDefault()
        e.stopPropagation()

        if (!id) return

        await addToCart(e, id)
        fetchUserAddToCart()
    }, [fetchUserAddToCart])

    const scrollLeft = () => {
        scrollElement.current?.scrollBy({
            left: -360,
            behavior: "smooth"
        })
    }

    const scrollRight = () => {
        scrollElement.current?.scrollBy({
            left: 360,
            behavior: "smooth"
        })
    }

    return (
        <section className='container mx-auto px-4 my-10 relative'>

            <div className='flex items-center justify-between gap-4 mb-6'>

                <div>
                    <h2 className='text-3xl font-black text-gray-800'>
                        {heading || "Products"}
                    </h2>

                    <p className='text-gray-500 mt-1'>
                        Découvrez notre sélection UNIK SYSTEM
                    </p>
                </div>

                <div className='hidden md:flex gap-3'>

                    <button
                        type='button'
                        onClick={scrollLeft}
                        disabled={!canScrollLeft}
                        aria-label='Scroll left'
                        className='bg-white border shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-600 hover:text-white transition-all duration-300 rounded-full p-3'
                    >
                        <FaAngleLeft />
                    </button>

                    <button
                        type='button'
                        onClick={scrollRight}
                        disabled={!canScrollRight}
                        aria-label='Scroll right'
                        className='bg-white border shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-600 hover:text-white transition-all duration-300 rounded-full p-3'
                    >
                        <FaAngleRight />
                    </button>

                </div>

            </div>

            <div
                ref={scrollElement}
                className='flex gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-2'
            >

                {
                    loading && (
                        Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className='min-w-[280px] md:min-w-[320px] bg-white rounded-2xl overflow-hidden shadow-md animate-pulse'
                            >
                                <div className='h-52 bg-slate-200'></div>

                                <div className='p-4 space-y-3'>
                                    <div className='h-5 bg-slate-200 rounded'></div>
                                    <div className='h-4 bg-slate-200 rounded w-1/2'></div>

                                    <div className='flex gap-3'>
                                        <div className='h-5 w-20 bg-slate-200 rounded'></div>
                                        <div className='h-5 w-16 bg-slate-200 rounded'></div>
                                    </div>

                                    <div className='h-10 bg-slate-200 rounded-xl'></div>
                                </div>
                            </div>
                        ))
                    )
                }

                {
                    !loading && data.length === 0 && (
                        <div className='w-full bg-white rounded-3xl border p-10 text-center'>
                            <div className='mx-auto w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-3xl mb-4'>
                                <FaBoxOpen />
                            </div>

                            <h3 className='text-xl font-black text-gray-800'>
                                No Products Found
                            </h3>

                            <p className='text-gray-500 mt-2'>
                                Aucun produit disponible dans cette catégorie.
                            </p>
                        </div>
                    )
                }

                {
                    !loading && data.length > 0 && (
                        data.map((product) => (
                            <Link
                                to={`/product/${product?._id}`}
                                key={product?._id}
                                className='min-w-[280px] md:min-w-[320px] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group'
                            >

                                <div className='bg-gray-100 h-56 flex items-center justify-center overflow-hidden'>
                                    <img
                                        src={product?.productImage?.[0] || "/no-image.png"}
                                        alt={product?.productName || "product"}
                                        className='h-full w-full object-contain group-hover:scale-110 transition-all duration-500'
                                    />
                                </div>

                                <div className='p-5'>

                                    <h3 className='text-lg font-bold text-gray-800 line-clamp-1'>
                                        {product?.productName}
                                    </h3>

                                    <p className='text-sm text-gray-500 mt-1 capitalize'>
                                        {product?.category}
                                    </p>

                                    <div className='flex items-center gap-3 mt-4'>
                                        <span className='text-2xl font-black text-red-600'>
                                            {displayCurrency(product?.sellingPrice)}
                                        </span>

                                        {
                                            Number(product?.price) > Number(product?.sellingPrice) && (
                                                <span className='text-gray-400 line-through text-sm'>
                                                    {displayCurrency(product?.price)}
                                                </span>
                                            )
                                        }
                                    </div>

                                    <button
                                        type='button'
                                        onClick={(e) =>
                                            handleAddToCart(e, product?._id)
                                        }
                                        className='mt-5 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-black transition-all duration-300 text-white py-3 rounded-xl font-bold'
                                    >
                                        <FaShoppingCart />
                                        Add To Cart
                                    </button>

                                </div>

                            </Link>
                        ))
                    )
                }

            </div>

        </section>
    )
}

export default HorizontalCardProduct