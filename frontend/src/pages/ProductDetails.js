import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'

import {
    useNavigate,
    useParams
} from 'react-router-dom'

import { Helmet } from 'react-helmet-async'

import {
    FaBolt,
    FaBoxOpen,
    FaRedoAlt,
    FaShoppingCart,
    FaStar,
    FaStarHalfAlt
} from "react-icons/fa"

import SummaryApi from '../common'
import displayCurrency from '../helpers/displayCurrency'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const initialProductDetails = {
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    slug: ""
}

const stripHtml = (html = "") => {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
}

const ProductDetails = () => {
    const [data, setData] = useState(initialProductDetails)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [activeImage, setActiveImage] = useState("")
    const [zoomImageCoordinate, setZoomImageCoordinate] =
        useState({ x: 50, y: 50 })
    const [zoomImage, setZoomImage] = useState(false)
    const [cartLoading, setCartLoading] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    const { fetchUserAddToCart } =
        useContext(Context)

    const productImages = useMemo(() => {
        return data?.productImage || []
    }, [data?.productImage])

    const seoDescription = useMemo(() => {
        return (
            data?.seoDescription ||
            stripHtml(data?.description).slice(0, 160) ||
            `${data?.productName || "Product"} by UNIK SYSTEM`
        )
    }, [data?.seoDescription, data?.description, data?.productName])

    const seoTitle = useMemo(() => {
        return (
            data?.seoTitle ||
            `${data?.productName || "Product"} | UNIK SYSTEM`
        )
    }, [data?.seoTitle, data?.productName])

    const canonicalUrl = useMemo(() => {
        if (typeof window === "undefined") return ""

        return window.location.href
    }, [])

    const productJsonLd = useMemo(() => {
        return {
            "@context": "https://schema.org",
            "@type": "Product",
            name: data?.productName,
            brand: {
                "@type": "Brand",
                name: data?.brandName || "UNIK SYSTEM"
            },
            category: data?.category,
            image: productImages,
            description: seoDescription,
            offers: {
                "@type": "Offer",
                price: data?.sellingPrice,
                priceCurrency: "MAD",
                availability: "https://schema.org/InStock"
            }
        }
    }, [
        data?.productName,
        data?.brandName,
        data?.category,
        data?.sellingPrice,
        productImages,
        seoDescription
    ])

    const discountPercent = useMemo(() => {
        const price = Number(data?.price)
        const sellingPrice = Number(data?.sellingPrice)

        if (!price || !sellingPrice || sellingPrice >= price) return 0

        return Math.round(((price - sellingPrice) / price) * 100)
    }, [data?.price, data?.sellingPrice])

    const fetchProductDetails = useCallback(async (signal) => {
        try {
            setLoading(true)
            setError("")

            const response = await fetch(
                SummaryApi.productDetails.url,
                {
                    method: SummaryApi.productDetails.method,
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        productId: params?.id
                    }),
                    signal
                }
            )

            const dataResponse = await response.json()

            if (!response.ok || dataResponse?.error) {
                throw new Error(
                    dataResponse?.message || "Failed to fetch product details"
                )
            }

            const product = dataResponse?.data || initialProductDetails

            setData(product)
            setActiveImage(product?.productImage?.[0] || "")

        } catch (error) {
            if (error.name === "AbortError") return

            console.error("Product details error:", error)
            setData(initialProductDetails)
            setActiveImage("")
            setError("Something went wrong while loading this product.")
        } finally {
            if (!signal?.aborted) {
                setLoading(false)
            }
        }
    }, [params?.id])

    useEffect(() => {
        const controller = new AbortController()

        fetchProductDetails(controller.signal)

        return () => controller.abort()
    }, [fetchProductDetails])

    const handleSelectImage = useCallback((imageURL) => {
        setActiveImage(imageURL)
        setZoomImage(false)
    }, [])

    const handleZoomImage = useCallback((e) => {
        if (!activeImage) return

        const { left, top, width, height } =
            e.currentTarget.getBoundingClientRect()

        const x = ((e.clientX - left) / width) * 100
        const y = ((e.clientY - top) / height) * 100

        setZoomImage(true)
        setZoomImageCoordinate({ x, y })
    }, [activeImage])

    const handleLeaveImageZoom = useCallback(() => {
        setZoomImage(false)
    }, [])

    const handleAddToCart = useCallback(async (e, id) => {
        if (!id || cartLoading) return

        setCartLoading(true)

        try {
            await addToCart(e, id)
            fetchUserAddToCart()
        } finally {
            setCartLoading(false)
        }
    }, [cartLoading, fetchUserAddToCart])

    const handleBuyProduct = useCallback(async (e, id) => {
        if (!id || cartLoading) return

        setCartLoading(true)

        try {
            await addToCart(e, id)
            fetchUserAddToCart()
            navigate("/cart")
        } finally {
            setCartLoading(false)
        }
    }, [cartLoading, fetchUserAddToCart, navigate])

    if (loading) {
        return (
            <div className='bg-slate-100 min-h-screen py-10 px-4'>
                <div className='container mx-auto'>
                    <div className='bg-white rounded-3xl shadow-xl p-6 lg:p-10 animate-pulse'>
                        <div className='flex flex-col lg:flex-row gap-10'>
                            <div className='w-full lg:w-[620px] h-[420px] lg:h-[560px] bg-slate-200 rounded-3xl'></div>

                            <div className='flex-1 space-y-5'>
                                <div className='h-10 bg-slate-200 rounded-full w-36'></div>
                                <div className='h-12 bg-slate-200 rounded-xl w-4/5'></div>
                                <div className='h-6 bg-slate-200 rounded-xl w-2/5'></div>
                                <div className='h-10 bg-slate-200 rounded-xl w-1/2'></div>
                                <div className='flex gap-4'>
                                    <div className='h-14 bg-slate-200 rounded-full w-40'></div>
                                    <div className='h-14 bg-slate-200 rounded-full w-44'></div>
                                </div>
                                <div className='h-40 bg-slate-200 rounded-2xl w-full'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='bg-slate-100 min-h-screen py-10 px-4'>
                <div className='container mx-auto'>
                    <div className='bg-white rounded-3xl shadow-xl p-10 text-center'>
                        <div className='mx-auto w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-3xl mb-4'>
                            <FaRedoAlt />
                        </div>

                        <h2 className='text-2xl font-bold text-gray-800 mb-2'>
                            Product Not Loaded
                        </h2>

                        <p className='text-gray-500 mb-6'>
                            {error}
                        </p>

                        <button
                            type='button'
                            onClick={() => fetchProductDetails()}
                            className='bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-full font-semibold transition-all'
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <title>{seoTitle}</title>

                <meta name='description' content={seoDescription} />
                <meta name='keywords' content={data?.seoKeywords || data?.category || ""} />

                <meta property='og:type' content='product' />
                <meta property='og:title' content={seoTitle} />
                <meta property='og:description' content={seoDescription} />
                <meta property='og:image' content={data?.productImage?.[0] || ""} />
                <meta property='og:url' content={canonicalUrl} />

                <meta name='twitter:card' content='summary_large_image' />
                <meta name='twitter:title' content={seoTitle} />
                <meta name='twitter:description' content={seoDescription} />
                <meta name='twitter:image' content={data?.productImage?.[0] || ""} />

                <link rel='canonical' href={canonicalUrl} />

                <script type='application/ld+json'>
                    {JSON.stringify(productJsonLd)}
                </script>
            </Helmet>

            <div className='bg-slate-100 min-h-screen py-10 px-4'>
                <div className='container mx-auto'>

                    <div className='bg-white rounded-3xl shadow-xl p-6 lg:p-10'>

                        <div className='flex flex-col lg:flex-row gap-10'>

                            <div className='flex flex-col lg:flex-row-reverse gap-5'>

                                <div className='relative bg-slate-100 rounded-3xl p-4 overflow-visible'>

                                    <div className='w-full max-w-[520px] h-[340px] lg:w-[500px] lg:h-[500px] flex items-center justify-center'>

                                        {
                                            activeImage ? (
                                                <img
                                                    src={activeImage}
                                                    alt={data?.productName || "product"}
                                                    className='w-full h-full object-contain transition-all duration-300'
                                                    onMouseMove={handleZoomImage}
                                                    onMouseLeave={handleLeaveImageZoom}
                                                />
                                            ) : (
                                                <div className='w-full h-full flex flex-col items-center justify-center text-slate-400'>
                                                    <FaBoxOpen className='text-6xl mb-3' />
                                                    <p className='font-semibold'>
                                                        No image available
                                                    </p>
                                                </div>
                                            )
                                        }

                                    </div>

                                    {
                                        zoomImage && activeImage && (
                                            <div className='hidden xl:block absolute top-0 left-[calc(100%+24px)] bg-white rounded-3xl shadow-2xl overflow-hidden z-50 border'>
                                                <div
                                                    className='w-[500px] h-[500px]'
                                                    style={{
                                                        backgroundImage: `url(${activeImage})`,
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundSize: '200%',
                                                        backgroundPosition:
                                                            `${zoomImageCoordinate.x}% ${zoomImageCoordinate.y}%`
                                                    }}
                                                />
                                            </div>
                                        )
                                    }

                                </div>

                                <div className='flex lg:flex-col gap-3 overflow-auto scrollbar-none pb-1'>
                                    {
                                        productImages.map((imgURL, index) => {
                                            const isActive = activeImage === imgURL

                                            return (
                                                <button
                                                    type='button'
                                                    key={`${imgURL}-${index}`}
                                                    onMouseEnter={() =>
                                                        handleSelectImage(imgURL)
                                                    }
                                                    onClick={() =>
                                                        handleSelectImage(imgURL)
                                                    }
                                                    className={`shrink-0 w-24 h-24 bg-slate-100 rounded-2xl p-2 cursor-pointer border-2 transition-all ${
                                                        isActive
                                                            ? "border-red-600 shadow-md"
                                                            : "border-transparent hover:border-red-400"
                                                    }`}
                                                >
                                                    <img
                                                        src={imgURL}
                                                        alt={`${data?.productName || "product"} ${index + 1}`}
                                                        className='w-full h-full object-contain'
                                                    />
                                                </button>
                                            )
                                        })
                                    }
                                </div>

                            </div>

                            <div className='flex-1'>

                                <div className='flex flex-wrap items-center gap-3'>
                                    {
                                        data?.brandName && (
                                            <span className='bg-red-100 text-red-600 px-4 py-2 rounded-full inline-block font-semibold text-sm'>
                                                {data.brandName}
                                            </span>
                                        )
                                    }

                                    {
                                        discountPercent > 0 && (
                                            <span className='bg-green-100 text-green-700 px-4 py-2 rounded-full inline-block font-semibold text-sm'>
                                                {discountPercent}% OFF
                                            </span>
                                        )
                                    }
                                </div>

                                <h1 className='text-3xl lg:text-5xl font-bold text-gray-800 mt-4 leading-tight'>
                                    {data?.productName}
                                </h1>

                                <p className='text-gray-500 capitalize mt-3 text-lg'>
                                    {data?.category}
                                </p>

                                <div className='flex items-center gap-1 text-yellow-500 text-xl mt-5'>
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStarHalfAlt />

                                    <span className='text-gray-500 text-sm ml-2'>
                                        4.5
                                    </span>
                                </div>

                                <div className='flex flex-wrap items-end gap-5 mt-6'>
                                    <p className='text-red-600 text-4xl font-bold'>
                                        {displayCurrency(data?.sellingPrice)}
                                    </p>

                                    {
                                        Number(data?.price) > Number(data?.sellingPrice) && (
                                            <p className='text-gray-400 line-through text-2xl'>
                                                {displayCurrency(data?.price)}
                                            </p>
                                        )
                                    }
                                </div>

                                <div className='flex flex-wrap gap-4 mt-8'>
                                    <button
                                        type='button'
                                        disabled={cartLoading}
                                        onClick={(e) =>
                                            handleBuyProduct(e, data?._id)
                                        }
                                        className='flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-[1.03]'
                                    >
                                        <FaBolt />
                                        {cartLoading ? "Please wait..." : "Buy Now"}
                                    </button>

                                    <button
                                        type='button'
                                        disabled={cartLoading}
                                        onClick={(e) =>
                                            handleAddToCart(e, data?._id)
                                        }
                                        className='flex items-center justify-center gap-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white disabled:border-red-300 disabled:text-red-300 disabled:cursor-not-allowed px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-[1.03]'
                                    >
                                        <FaShoppingCart />
                                        Add To Cart
                                    </button>
                                </div>

                                <div className='mt-10 border-t pt-8'>
                                    <h2 className='text-2xl font-bold text-gray-800 mb-4'>
                                        Product Description
                                    </h2>

                                    <div
                                        className='prose max-w-none text-gray-600 leading-8 text-lg'
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                data?.description ||
                                                "<p>No description available.</p>"
                                        }}
                                    />
                                </div>

                            </div>

                        </div>

                    </div>

                    {
                        data?.category && (
                            <div className='mt-12'>
                                <CategoryWiseProductDisplay
                                    category={data?.category}
                                    heading="Recommended Products"
                                />
                            </div>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default ProductDetails
