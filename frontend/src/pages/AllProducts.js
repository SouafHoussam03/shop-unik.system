import React, { useEffect, useState } from 'react'
import { FaBoxOpen, FaPlus, FaRedoAlt } from 'react-icons/fa'

import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false)
    const [allProduct, setAllProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchAllProduct = async () => {
        try {
            setLoading(true)
            setError("")

            const response = await fetch(SummaryApi.allProduct.url)
            const dataResponse = await response.json()

            if (!response.ok || dataResponse?.error) {
                throw new Error(dataResponse?.message || "Failed to fetch products")
            }

            setAllProduct(dataResponse?.data || [])

        } catch (error) {
            setAllProduct([])
            setError("Failed to load products.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllProduct()
    }, [])

    return (
        <div className='bg-slate-100 min-h-[calc(100vh-120px)]'>

            <div className='bg-white py-4 px-5 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between rounded-2xl shadow-sm border'>

                <div>
                    <h2 className='font-bold text-2xl text-gray-800'>
                        All Products
                    </h2>

                    <p className='text-sm text-gray-500 mt-1'>
                        Manage products, edit details and remove old items.
                    </p>
                </div>

                <button
                    type='button'
                    className='flex items-center justify-center gap-2 bg-red-600 hover:bg-black text-white transition-all py-3 px-5 rounded-full font-semibold shadow-md'
                    onClick={() => setOpenUploadProduct(true)}
                >
                    <FaPlus />
                    Upload Product
                </button>

            </div>

            <div className='mt-5 h-[calc(100vh-230px)] overflow-y-auto pr-1'>

                {loading && (
                    <div className='grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5'>
                        {
                            Array.from({ length: 8 }).map((_, index) => (
                                <div
                                    key={index}
                                    className='bg-white rounded-2xl border shadow-sm overflow-hidden animate-pulse'
                                >
                                    <div className='h-44 bg-slate-200'></div>
                                    <div className='p-4 space-y-3'>
                                        <div className='h-5 bg-slate-200 rounded-full w-4/5'></div>
                                        <div className='h-4 bg-slate-200 rounded-full w-1/2'></div>
                                        <div className='h-9 bg-slate-200 rounded-full'></div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )}

                {!loading && error && (
                    <div className='bg-white rounded-2xl border p-10 text-center shadow-sm'>
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
                            onClick={fetchAllProduct}
                            className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all'
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && allProduct.length === 0 && (
                    <div className='bg-white rounded-2xl border p-10 text-center shadow-sm'>
                        <div className='mx-auto w-14 h-14 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-2xl mb-4'>
                            <FaBoxOpen />
                        </div>

                        <h3 className='text-xl font-bold text-gray-800 mb-2'>
                            No Products Found
                        </h3>

                        <p className='text-gray-500'>
                            Upload your first product to start selling.
                        </p>
                    </div>
                )}

                {!loading && !error && allProduct.length > 0 && (
                    <div className='grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5 pb-6'>
                        {
                            allProduct.map((product) => (
                                <AdminProductCard
                                    data={product}
                                    key={product?._id}
                                    fetchdata={fetchAllProduct}
                                />
                            ))
                        }
                    </div>
                )}

            </div>

            {
                openUploadProduct && (
                    <UploadProduct
                        onClose={() => setOpenUploadProduct(false)}
                        fetchData={fetchAllProduct}
                    />
                )
            }

        </div>
    )
}

export default AllProducts
