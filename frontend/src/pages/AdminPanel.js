import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'

import {
    FaUserCircle,
    FaUsers,
    FaBoxOpen,
} from "react-icons/fa"

import { MdDashboard } from "react-icons/md"
import { FaTruck } from "react-icons/fa"

import {
    Link,
    Outlet,
    useLocation,
    useNavigate
} from 'react-router-dom'

import ROLE from '../common/role'

const AdminPanel = () => {

    const user =
        useSelector(state => state?.user?.user)

    const navigate = useNavigate()

    const location = useLocation()

    // ✅ protect admin
    useEffect(() => {

        if (user?.role !== ROLE.ADMIN) {

            navigate("/")
        }

    }, [navigate, user])

    return (

        <div className='min-h-screen bg-slate-100 flex'>

            {/* ================= SIDEBAR ================= */}
            <aside className=' bg-white w-[280px] shadow-2xl hidden lg:flex flex-col'>

                {/* HEADER */}
                <div className='bg-gradient-to-r from-red-600 to-red-700 p-6 text-white'>

                    

                    <h3 className='font-bold text-xl mt-2'>
                        Admin Dashboard
                    </h3>

                </div>

                {/* PROFILE */}
                <div className='flex flex-col items-center py-8 border-b'>

                    <div className='relative'>

                        {
                            user?.profilePic ? (

                                <img
                                    src={user?.profilePic}
                                    className='w-24 h-24 rounded-full object-cover border-4 border-red-500 shadow-lg'
                                    alt={user?.name}
                                />

                            ) : (

                                <div className='w-24 h-24 rounded-full bg-slate-100 flex justify-center items-center text-6xl text-slate-500'>

                                    <FaUserCircle />

                                </div>
                            )
                        }

                    </div>

                    <h2 className='mt-4 text-2xl font-bold text-gray-800 capitalize'>
                        {user?.name}
                    </h2>

                    <p className='mt-2 bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-semibold uppercase'>
                        {user?.role}
                    </p>

                </div>

                {/* NAVIGATION */}
                <nav className='flex flex-col gap-3 p-5'>

                    {/* DASHBOARD */}
                    <Link
                        to={"dashboard"}
                        className={`
                            flex items-center gap-3 px-5 py-4 rounded-2xl font-semibold transition-all
                            ${location.pathname.includes("dashboard")
                                ? "bg-red-600 text-white shadow-lg"
                                : "hover:bg-slate-100 text-gray-700"}
                        `}
                    >

                        <MdDashboard />

                        Dashboard

                    </Link>

                    {/* USERS */}
                    <Link
                        to={"all-users"}
                        className={`
                            flex items-center gap-3 px-5 py-4 rounded-2xl font-semibold transition-all
                            ${location.pathname.includes("all-users")
                                ? "bg-red-600 text-white shadow-lg"
                                : "hover:bg-slate-100 text-gray-700"}
                        `}
                    >

                        <FaUsers />

                        All Users

                    </Link>

                    {/* PRODUCTS */}
                    <Link
                        to={"all-products"}
                        className={`
                            flex items-center gap-3 px-5 py-4 rounded-2xl font-semibold transition-all
                            ${location.pathname.includes("all-products")
                                ? "bg-red-600 text-white shadow-lg"
                                : "hover:bg-slate-100 text-gray-700"}
                        `}
                    >

                        <FaBoxOpen />

                        All Products

                    </Link>
                    {/* USERS CART LIVRAISON */}
                    <Link
                    to={"users-cart-delivery"}
                            className={`
                            flex items-center gap-3 px-5 py-4 rounded-2xl font-semibold transition-all
                            ${location.pathname.includes("users-cart-delivery")
                            ? "bg-red-600 text-white shadow-lg"
                        : "hover:bg-slate-100 text-gray-700"}
                    `}
                        >
                    <FaTruck />

                    Users Cart Livraison
                    </Link>

                </nav>

                

            </aside>

            {/* ================= MAIN ================= */}
            <main className='flex-1 p-6 overflow-y-auto'>

                {/* TOP BAR */}
                <div className='bg-white rounded-3xl shadow-md px-6 py-5 mb-6 flex items-center justify-between'>

                    <div>

                        <h2 className='text-3xl font-bold text-gray-800'>
                            Welcome Back 👋
                        </h2>

                        <p className='text-gray-500 mt-1'>
                            Manage your ecommerce store easily
                        </p>

                    </div>

                    {/* MINI PROFILE */}
                    <div>

                        {
                            user?.profilePic ? (

                                <img
                                    src={user?.profilePic}
                                    className='w-14 h-14 rounded-full object-cover border-2 border-red-500'
                                    alt=''
                                />

                            ) : (

                                <div className='text-4xl text-slate-500'>

                                    <FaUserCircle />

                                </div>
                            )
                        }

                    </div>

                </div>

                {/* PAGE CONTENT */}
                <div className='bg-white rounded-3xl shadow-lg p-6 min-h-[80vh]'>

                    <Outlet />

                </div>

            </main>

        </div>
    )
}

export default AdminPanel