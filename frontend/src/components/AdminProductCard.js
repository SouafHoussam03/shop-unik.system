import React, { useState } from 'react'
import { MdDelete, MdModeEditOutline } from "react-icons/md"
import { toast } from 'react-toastify'

import AdminEditProduct from './AdminEditProduct'
import displayCurrency from '../helpers/displayCurrency'
import SummaryApi from '../common'

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct, setEditProduct] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

    const handleDeleteProduct = async () => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${data?.productName}"?`
        )

        if (!confirmDelete) return

        try {
            setDeleteLoading(true)

            const response = await fetch(SummaryApi.deleteProduct.url, {
                method: SummaryApi.deleteProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    productId: data?._id
                })
            })

            const dataResponse = await response.json()

            if (dataResponse.success) {
                toast.success(dataResponse.message)
                fetchdata()
            }

            if (dataResponse.error) {
                toast.error(dataResponse.message)
            }

        } catch (error) {
            toast.error("Failed to delete product")
        } finally {
            setDeleteLoading(false)
        }
    }

    return (
        <div className='bg-white p-4 rounded-2xl border shadow-sm hover:shadow-lg transition-all'>

            <div className='w-full'>

                <div className='w-full h-40 bg-slate-100 rounded-2xl flex justify-center items-center overflow-hidden'>
                    <img
                        src={data?.productImage?.[0]}
                        alt={data?.productName || "product"}
                        className='w-full h-full object-contain mix-blend-multiply'
                    />
                </div>

                <h1 className='text-ellipsis line-clamp-2 font-semibold text-gray-800 mt-3 min-h-[48px]'>
                    {data?.productName}
                </h1>

                <p className='text-sm text-gray-500 capitalize mt-1 line-clamp-1'>
                    {data?.category}
                </p>

                <div className='flex items-center justify-between gap-3 mt-4'>

                    <p className='font-bold text-red-600'>
                        {displayCurrency(data?.sellingPrice)}
                    </p>

                    <div className='flex items-center gap-2'>

                        <button
                            type='button'
                            title='Edit product'
                            className='p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer transition-all'
                            onClick={() => setEditProduct(true)}
                        >
                            <MdModeEditOutline />
                        </button>

                        <button
                            type='button'
                            title='Delete product'
                            disabled={deleteLoading}
                            className='p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                            onClick={handleDeleteProduct}
                        >
                            <MdDelete />
                        </button>

                    </div>

                </div>

            </div>

            {
                editProduct && (
                    <AdminEditProduct
                        productData={data}
                        onClose={() => setEditProduct(false)}
                        fetchdata={fetchdata}
                    />
                )
            }

        </div>
    )
}

export default AdminProductCard
