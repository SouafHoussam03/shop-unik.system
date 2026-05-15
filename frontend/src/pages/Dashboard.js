/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'

import {
    FaUsers,
    FaUserCheck,
    FaBoxOpen,
    FaShoppingBag,
    FaDownload,
    FaRedoAlt
} from "react-icons/fa"

import SummaryApi from '../common'

const Dashboard = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])

    const fetchUsers = async () => {
        const response = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: "include"
        })

        const dataResponse = await response.json()

        if (dataResponse.success) {
            setUsers(dataResponse.data || [])
        }
    }

    const fetchProducts = async () => {
        const response = await fetch(SummaryApi.allProduct.url)
        const dataResponse = await response.json()

        if (dataResponse.success) {
            setProducts(dataResponse.data || [])
        }
    }

    const fetchOrders = async () => {
        const orderApi =
            SummaryApi.allOrder ||
            SummaryApi.allOrders ||
            SummaryApi.getAllOrders

        if (!orderApi?.url) {
            setOrders([])
            return
        }

        const response = await fetch(orderApi.url, {
            method: orderApi.method || "get",
            credentials: "include"
        })

        const dataResponse = await response.json()

        if (dataResponse.success) {
            setOrders(dataResponse.data || [])
        }
    }

    const loadData = async () => {
        try {
            setLoading(true)
            setError("")

            await Promise.all([
                fetchUsers(),
                fetchProducts(),
                fetchOrders()
            ])

        } catch (error) {
            setError("Failed to load dashboard data")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const onlineUsers = useMemo(() => {
        return users.filter((user) => {
            if (user?.isOnline) return true
            if (user?.status === "online") return true

            if (user?.lastActiveAt) {
                const lastActive = new Date(user.lastActiveAt).getTime()
                const now = Date.now()

                return now - lastActive < 15 * 60 * 1000
            }

            return false
        })
    }, [users])

    const totalUsers = users.length
    const totalProducts = products.length
    const totalOrders = orders.length

    const recentProducts = products.slice(0, 5)
    const recentOrders = orders.slice(0, 5)

    const escapeCsv = (value) => {
        const text = String(value ?? "")

        if (text.includes(",") || text.includes('"') || text.includes("\n")) {
            return `"${text.replace(/"/g, '""')}"`
        }

        return text
    }

    const downloadOrdersCsv = () => {
        const headers = [
            "Order ID",
            "Customer",
            "Email",
            "Phone",
            "Total",
            "Status",
            "Date"
        ]

        const rows = orders.map((order) => [
            order?._id,
            order?.userId?.name || order?.customerName || order?.name || "",
            order?.userId?.email || order?.email || "",
            order?.phone || order?.mobile || "",
            order?.totalAmount || order?.amount || order?.total || "",
            order?.status || "Pending",
            order?.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : ""
        ])

        const csv = [
            headers,
            ...rows
        ]
            .map((row) => row.map(escapeCsv).join(","))
            .join("\n")

        const blob = new Blob(["\ufeff" + csv], {
            type: "text/csv;charset=utf-8;"
        })

        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")

        link.href = url
        link.download = `fiche-commandes-${new Date().toISOString().slice(0, 10)}.csv`
        link.click()

        URL.revokeObjectURL(url)
    }

    const stats = [
        {
            title: "Users Online",
            value: onlineUsers.length,
            icon: FaUserCheck,
            color: "from-emerald-500 to-emerald-600"
        },
        {
            title: "Total Users",
            value: totalUsers,
            icon: FaUsers,
            color: "from-blue-500 to-blue-600"
        },
        {
            title: "Total Products",
            value: totalProducts,
            icon: FaBoxOpen,
            color: "from-red-500 to-red-600"
        },
        {
            title: "Total Commandes",
            value: totalOrders,
            icon: FaShoppingBag,
            color: "from-black to-gray-700"
        }
    ]

    return (
        <div className='w-full'>

            <div className='mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>

                <div>
                    <h2 className='text-4xl font-bold text-gray-800'>
                        Dashboard Overview
                    </h2>

                    <p className='text-gray-500 mt-2'>
                        Analytics from your UNIK SYSTEM admin panel
                    </p>
                </div>

                <button
                    type='button'
                    onClick={downloadOrdersCsv}
                    disabled={orders.length === 0}
                    className='flex items-center justify-center gap-2 bg-red-600 hover:bg-black disabled:bg-red-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full font-bold transition-all'
                >
                    <FaDownload />
                    Télécharger fiche commandes
                </button>

            </div>

            {error && (
                <div className='bg-white border rounded-3xl p-6 mb-6 flex items-center justify-between gap-4'>
                    <p className='text-red-600 font-semibold'>
                        {error}
                    </p>

                    <button
                        type='button'
                        onClick={loadData}
                        className='flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-full'
                    >
                        <FaRedoAlt />
                        Retry
                    </button>
                </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
                {stats.map((item) => {
                    const Icon = item.icon

                    return (
                        <div
                            key={item.title}
                            className={`bg-gradient-to-r ${item.color} rounded-3xl shadow-xl p-6 text-white`}
                        >
                            <div className='flex justify-between items-center'>
                                <div>
                                    <p className='text-white/80'>
                                        {item.title}
                                    </p>

                                    <h2 className='text-5xl font-bold mt-2'>
                                        {loading ? "..." : item.value}
                                    </h2>
                                </div>

                                <div className='text-6xl opacity-80'>
                                    <Icon />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className='grid xl:grid-cols-2 gap-8 mt-10'>

                <div className='bg-white rounded-3xl shadow-xl p-6'>

                    <h2 className='text-2xl font-bold text-gray-800'>
                        Recent Products
                    </h2>

                    <p className='text-gray-500 mt-1 mb-6'>
                        Latest uploaded products
                    </p>

                    <div className='overflow-x-auto'>
                        <table className='w-full border-collapse'>
                            <thead>
                                <tr className='bg-slate-100 text-gray-700'>
                                    <th className='p-4 text-left rounded-l-2xl'>Image</th>
                                    <th className='p-4 text-left'>Product</th>
                                    <th className='p-4 text-left'>Category</th>
                                    <th className='p-4 text-left rounded-r-2xl'>Price</th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentProducts.map((product) => (
                                    <tr
                                        key={product?._id}
                                        className='border-b hover:bg-slate-50 transition-all'
                                    >
                                        <td className='p-4'>
                                            <img
                                                src={product?.productImage?.[0]}
                                                className='w-16 h-16 object-cover rounded-xl border'
                                                alt={product?.productName || "product"}
                                            />
                                        </td>

                                        <td className='p-4 font-semibold text-gray-800'>
                                            {product?.productName}
                                        </td>

                                        <td className='p-4 capitalize text-gray-600'>
                                            {product?.category}
                                        </td>

                                        <td className='p-4 font-bold text-red-600'>
                                            {product?.sellingPrice} MAD
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>

                <div className='bg-white rounded-3xl shadow-xl p-6'>

                    <h2 className='text-2xl font-bold text-gray-800'>
                        Recent Commandes
                    </h2>

                    <p className='text-gray-500 mt-1 mb-6'>
                        Latest customer orders
                    </p>

                    <div className='overflow-x-auto'>
                        <table className='w-full border-collapse'>
                            <thead>
                                <tr className='bg-slate-100 text-gray-700'>
                                    <th className='p-4 text-left rounded-l-2xl'>Client</th>
                                    <th className='p-4 text-left'>Total</th>
                                    <th className='p-4 text-left'>Status</th>
                                    <th className='p-4 text-left rounded-r-2xl'>Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentOrders.length > 0 ? (
                                    recentOrders.map((order) => (
                                        <tr
                                            key={order?._id}
                                            className='border-b hover:bg-slate-50 transition-all'
                                        >
                                            <td className='p-4 font-semibold text-gray-800'>
                                                {order?.userId?.name || order?.customerName || order?.name || "Client"}
                                            </td>

                                            <td className='p-4 font-bold text-red-600'>
                                                {order?.totalAmount || order?.amount || order?.total || 0} MAD
                                            </td>

                                            <td className='p-4'>
                                                <span className='bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-semibold'>
                                                    {order?.status || "Pending"}
                                                </span>
                                            </td>

                                            <td className='p-4 text-gray-600'>
                                                {order?.createdAt
                                                    ? new Date(order.createdAt).toLocaleDateString()
                                                    : "-"}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan='4'
                                            className='p-8 text-center text-gray-500'
                                        >
                                            No commandes found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Dashboard
