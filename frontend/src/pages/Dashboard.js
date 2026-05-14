import React, {
    useEffect,
    useState
} from 'react'

import {
    FaUsers,
    FaBoxOpen,
    FaDollarSign
} from "react-icons/fa"

import SummaryApi from '../common'

const Dashboard = () => {

    const [loading, setLoading] = useState(true)

    const [users, setUsers] = useState([])

    const [products, setProducts] = useState([])

    // ================= FETCH USERS =================
    const fetchUsers = async () => {

        try {

            const response = await fetch(
                SummaryApi.allUser.url,
                {
                    method: SummaryApi.allUser.method,
                    credentials: "include"
                }
            )

            const dataResponse =
                await response.json()

            if (dataResponse.success) {

                setUsers(dataResponse.data || [])
            }

        } catch (error) {

            console.log(error)
        }
    }

    // ================= FETCH PRODUCTS =================
    const fetchProducts = async () => {

        try {

            const response = await fetch(
                SummaryApi.allProduct.url
            )

            const dataResponse =
                await response.json()

            if (dataResponse.success) {

                setProducts(dataResponse.data || [])
            }

        } catch (error) {

            console.log(error)
        }
    }

    // ================= LOAD =================
    useEffect(() => {

        const loadData = async () => {

            setLoading(true)

            await fetchUsers()

            await fetchProducts()

            setLoading(false)
        }

        loadData()

    }, [])

    // ================= CALCULATIONS =================
    const totalUsers = users.length

    const totalProducts = products.length

    const totalStockValue = products.reduce(
        (acc, product) =>
            acc + (
                Number(product.sellingPrice || 0)
            ),
        0
    )

    return (

        <div className='w-full'>

            {/* ================= HEADER ================= */}
            <div className='mb-8'>

                <h2 className='text-4xl font-bold text-gray-800'>
                    Dashboard Overview 🚀
                </h2>

                <p className='text-gray-500 mt-2'>
                    Real-time analytics from your backend
                </p>

            </div>

            {/* ================= STATS ================= */}
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>

                {/* USERS */}
                <div className='bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl shadow-xl p-6 text-white'>

                    <div className='flex justify-between items-center'>

                        <div>

                            <p className='text-blue-100'>
                                Total Users
                            </p>

                            <h2 className='text-5xl font-bold mt-2'>

                                {
                                    loading
                                        ? "..."
                                        : totalUsers
                                }

                            </h2>

                        </div>

                        <div className='text-6xl opacity-80'>

                            <FaUsers />

                        </div>

                    </div>

                </div>

                {/* PRODUCTS */}
                <div className='bg-gradient-to-r from-red-500 to-red-600 rounded-3xl shadow-xl p-6 text-white'>

                    <div className='flex justify-between items-center'>

                        <div>

                            <p className='text-red-100'>
                                Total Products
                            </p>

                            <h2 className='text-5xl font-bold mt-2'>

                                {
                                    loading
                                        ? "..."
                                        : totalProducts
                                }

                            </h2>

                        </div>

                        <div className='text-6xl opacity-80'>

                            <FaBoxOpen />

                        </div>

                    </div>

                </div>

                {/* REVENUE */}
                <div className='bg-gradient-to-r from-green-500 to-green-600 rounded-3xl shadow-xl p-6 text-white'>

                    <div className='flex justify-between items-center'>

                        <div>

                            <p className='text-green-100'>
                                Products Value
                            </p>

                            <h2 className='text-4xl font-bold mt-2'>

                                {
                                    loading
                                        ? "..."
                                        : `${totalStockValue} MAD`
                                }

                            </h2>

                        </div>

                        <div className='text-6xl opacity-80'>

                            <FaDollarSign />

                        </div>

                    </div>

                </div>

            </div>

            {/* ================= RECENT PRODUCTS ================= */}
            <div className='bg-white rounded-3xl shadow-xl mt-10 p-6'>

                <div className='flex justify-between items-center mb-6'>

                    <div>

                        <h2 className='text-2xl font-bold text-gray-800'>
                            Recent Products
                        </h2>

                        <p className='text-gray-500 mt-1'>
                            Latest uploaded products
                        </p>

                    </div>

                </div>

                <div className='overflow-x-auto'>

                    <table className='w-full border-collapse'>

                        <thead>

                            <tr className='bg-slate-100 text-gray-700'>

                                <th className='p-4 text-left rounded-l-2xl'>
                                    Image
                                </th>

                                <th className='p-4 text-left'>
                                    Product
                                </th>

                                <th className='p-4 text-left'>
                                    Category
                                </th>

                                <th className='p-4 text-left rounded-r-2xl'>
                                    Price
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                products.slice(0, 5).map((product) => {

                                    return (

                                        <tr
                                            key={product._id}
                                            className='border-b hover:bg-slate-50 transition-all'
                                        >

                                            {/* IMAGE */}
                                            <td className='p-4'>

                                                <img
                                                    src={product?.productImage[0]}
                                                    className='w-16 h-16 object-cover rounded-xl border'
                                                    alt=''
                                                />

                                            </td>

                                            {/* NAME */}
                                            <td className='p-4 font-semibold text-gray-800'>
                                                {product?.productName}
                                            </td>

                                            {/* CATEGORY */}
                                            <td className='p-4 capitalize text-gray-600'>
                                                {product?.category}
                                            </td>

                                            {/* PRICE */}
                                            <td className='p-4 font-bold text-red-600'>
                                                {product?.sellingPrice} MAD
                                            </td>

                                        </tr>
                                    )
                                })
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
}

export default Dashboard