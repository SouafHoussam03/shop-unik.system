import React, {
    useEffect,
    useState
} from 'react'

import {
    useLocation
} from 'react-router-dom'

import {
    FaSearch,
    FaBoxOpen
} from "react-icons/fa"

import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'


const SearchProduct = () => {

    const query = useLocation()

    const [data, setData] = useState([])

    const [loading, setLoading] =
        useState(false)

    // COLORS

    const primaryRed = "#F82222"

    // FETCH PRODUCT

    const fetchProduct = async () => {

        try {

            setLoading(true)

            const response = await fetch(
                SummaryApi.searchProduct.url
                + query.search
            )

            const dataResponse =
                await response.json()

            setData(
                dataResponse?.data || []
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

    // FETCH ON SEARCH

    useEffect(() => {

        fetchProduct()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.search])

    return (

        <section className='min-h-screen bg-[#f8f8f8]'>

            <div className='container mx-auto px-4 py-6'>


                {/* HEADER */}

                <div className='bg-white rounded-3xl shadow-lg border border-gray-100 p-5 md:p-8 mb-6'>

                    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-5'>

                        {/* LEFT */}

                        <div className='flex items-center gap-4'>

                            <div className='w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center text-2xl shadow-lg'>

                                <FaSearch />

                            </div>

                            <div>

                                <h1 className='text-2xl md:text-4xl font-black text-gray-800'>

                                    Search Results

                                </h1>

                                <p className='text-gray-500 mt-1 text-sm md:text-base'>

                                    Discover premium products from UNIK SYSTEM

                                </p>

                            </div>

                        </div>


                        {/* RIGHT */}

                        <div className='flex items-center gap-3 bg-gray-50 px-5 py-4 rounded-2xl border border-gray-200 shadow-sm'>

                            <FaBoxOpen
                                className='text-2xl'
                                style={{
                                    color: primaryRed
                                }}
                            />

                            <div>

                                <p className='text-xs uppercase text-gray-500 font-bold tracking-wider'>

                                    Products

                                </p>

                                <h2
                                    className='text-3xl font-black'
                                    style={{
                                        color: primaryRed
                                    }}
                                >

                                    {data?.length || 0}

                                </h2>

                            </div>

                        </div>

                    </div>

                </div>


                {/* LOADING */}

                {
                    loading && (

                        <div className='flex flex-col items-center justify-center py-20'>

                            <div className='w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin'></div>

                            <p className='mt-5 text-lg font-semibold text-gray-600'>

                                Loading Products...

                            </p>

                        </div>

                    )
                }


                {/* NO DATA */}

                {
                    data?.length === 0
                    && !loading && (

                        <div className='bg-white rounded-3xl shadow-lg border border-gray-100 p-10 md:p-16 text-center'>

                            <div className='w-24 h-24 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-6'>

                                <FaSearch
                                    className='text-4xl'
                                    style={{
                                        color: primaryRed
                                    }}
                                />

                            </div>

                            <h2 className='text-2xl md:text-4xl font-black text-gray-800 mb-4'>

                                No Products Found

                            </h2>

                            <p className='text-gray-500 text-sm md:text-lg max-w-xl mx-auto leading-relaxed'>

                                Sorry, we couldn’t find any products matching your search.
                                Try another keyword or explore our premium collections.

                            </p>

                        </div>

                    )
                }


                {/* PRODUCTS */}

                {
                    data?.length > 0
                    && !loading && (

                        <div>

                            {/* TOP BAR */}

                            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>

                                <div>

                                    <h2 className='text-2xl md:text-3xl font-black text-gray-800'>

                                        Premium Collection

                                    </h2>

                                    <p className='text-gray-500 mt-1'>

                                        Explore our latest premium products

                                    </p>

                                </div>

                                <div className='bg-white border border-gray-200 shadow-sm rounded-2xl px-5 py-3'>

                                    <span className='text-gray-500 text-sm'>

                                        Total Results :

                                    </span>

                                    <span
                                        className='ml-2 text-2xl font-black'
                                        style={{
                                            color: primaryRed
                                        }}
                                    >

                                        {data.length}

                                    </span>

                                </div>

                            </div>


                            {/* PRODUCT GRID */}

                            <VerticalCard
                                loading={loading}
                                data={data}
                            />

                        </div>

                    )
                }

            </div>

        </section>

    )
}

export default SearchProduct