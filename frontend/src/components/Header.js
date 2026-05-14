import React, { useContext, useEffect, useRef, useState } from "react"
import Logo from "./Logo2"
import { GrSearch } from "react-icons/gr"
import { FaRegCircleUser } from "react-icons/fa6"
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaSignOutAlt, FaTools } from "react-icons/fa"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import loginIcons from "../assest/signin.gif"
import SummaryApi from "../common"
import { toast } from "react-toastify"
import { setUserDetails } from "../store/userSlice"
import ROLE from "../common/role"
import Context from "../context"

const Header = () => {
    const user = useSelector((state) => state?.user?.user)
    const dispatch = useDispatch()
    const context = useContext(Context)
    const navigate = useNavigate()
    const location = useLocation()

    const userMenuRef = useRef(null)

    const URLSearch = new URLSearchParams(location?.search)
    const searchQuery = URLSearch.get("q") || ""

    const [search, setSearch] = useState(searchQuery)
    const [menuDisplay, setMenuDisplay] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)

    useEffect(() => {
        setSearch(searchQuery)
    }, [searchQuery])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target)
            ) {
                setMenuDisplay(false)
            }
        }

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setMenuDisplay(false)
                setMobileMenu(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("keydown", handleEscape)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleEscape)
        }
    }, [])

    const handleLogout = async () => {
        try {
            const fetchData = await fetch(SummaryApi.logout_user.url, {
                method: SummaryApi.logout_user.method,
                credentials: "include"
            })

            const data = await fetchData.json()

            if (data.success) {
                toast.success(data.message)
                dispatch(setUserDetails(null))
                setMenuDisplay(false)
                setMobileMenu(false)
                navigate("/")
            }

            if (data.error) {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("Logout failed")
        }
    }

    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(value)

        const cleanValue = value.trim()

        if (cleanValue) {
            navigate(`/search?q=${encodeURIComponent(cleanValue)}`)
        } else {
            navigate("/search")
        }
    }

    return (
        <header className='fixed top-0 w-full z-50 bg-white/100 backdrop-blur-xl shadow-sm border-b'>

            <div className='container mx-auto px-4 h-20 flex items-center justify-between gap-4'>

                <Link
                    to='/'
                    className='flex items-center shrink-0 left-0'
                    onClick={() => setMobileMenu(false)}
                >
                    <Logo w={270} h={150} />
                </Link>

                <div className='hidden lg:flex items-center w-full max-w-xl border border-gray-200 rounded-full overflow-hidden shadow-sm focus-within:shadow-lg focus-within:border-red-500 transition-all duration-300 bg-slate-50'>
                    <input
                        type='text'
                        placeholder='Search products...'
                        className='w-full px-5 py-3 outline-none bg-transparent'
                        onChange={handleSearch}
                        value={search}
                    />

                    <button
                        type='button'
                        aria-label='Search'
                        className='bg-red-600 hover:bg-black transition-all duration-300 text-white min-w-[60px] h-[50px] flex items-center justify-center text-lg'
                    >
                        <GrSearch />
                    </button>
                </div>

                <div className='flex items-center gap-4'>

                    <button
                        type='button'
                        aria-label={mobileMenu ? "Close menu" : "Open menu"}
                        onClick={() => setMobileMenu((prev) => !prev)}
                        className='lg:hidden w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-xl hover:bg-red-600 hover:text-white transition-all'
                    >
                        {mobileMenu ? <FaTimes /> : <FaBars />}
                    </button>

                    <div ref={userMenuRef} className='relative hidden lg:flex'>

                        {user?._id && (
                            <button
                                type='button'
                                aria-label='User menu'
                                onClick={() => setMenuDisplay((prev) => !prev)}
                                className='flex items-center justify-center'
                            >
                                {user?.profilePic ? (
                                    <img
                                        src={user?.profilePic || loginIcons}
                                        alt={user?.name || "user"}
                                        className='w-11 h-11 rounded-full object-cover border-2 border-red-500 shadow-md hover:scale-105 transition-all duration-300'
                                    />
                                ) : (
                                    <div className='w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-2xl text-gray-700 hover:bg-red-600 hover:text-white transition-all'>
                                        <FaRegCircleUser />
                                    </div>
                                )}
                            </button>
                        )}

                        {menuDisplay && (
                            <div className='absolute right-0 top-14 bg-white shadow-2xl rounded-3xl p-3 min-w-[240px] border animate-fadeIn'>

                                <div className='px-4 py-3 border-b mb-2'>
                                    <p className='font-bold text-gray-800 line-clamp-1'>
                                        {user?.name || "User"}
                                    </p>
                                    <p className='text-sm text-gray-500 line-clamp-1'>
                                        {user?.email}
                                    </p>
                                </div>

                                <nav className='flex flex-col gap-2'>

                                    <Link
                                        to='/profile'
                                        className='flex items-center gap-3 hover:bg-slate-100 px-4 py-3 rounded-2xl transition-all font-semibold'
                                        onClick={() => setMenuDisplay(false)}
                                    >
                                        <FaUser className='text-red-600' />
                                        My Profile
                                    </Link>

                                    {user?.role === ROLE.ADMIN && (
                                        <Link
                                            to='/admin-panel/all-products'
                                            className='flex items-center gap-3 hover:bg-slate-100 px-4 py-3 rounded-2xl transition-all font-semibold'
                                            onClick={() => setMenuDisplay(false)}
                                        >
                                            <FaTools className='text-red-600' />
                                            Admin Panel
                                        </Link>
                                    )}

                                    <button
                                        type='button'
                                        onClick={handleLogout}
                                        className='flex items-center justify-center gap-2 bg-red-600 hover:bg-black text-white rounded-2xl py-3 mt-2 transition-all duration-300 font-semibold'
                                    >
                                        <FaSignOutAlt />
                                        Logout
                                    </button>

                                </nav>
                            </div>
                        )}
                    </div>

                    {user?._id && (
                        <Link
                            to='/cart'
                            className='relative text-2xl hover:text-red-600 transition-all duration-300 hidden lg:flex'
                        >
                            <FaShoppingCart />

                            <span className='absolute -top-2 -right-3 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shadow'>
                                {context?.cartProductCount || 0}
                            </span>
                        </Link>
                    )}

                    {!user?._id && (
                        <Link
                            to='/login'
                            className='hidden lg:flex bg-red-600 hover:bg-black transition-all duration-300 text-white px-4 py-2.5 rounded-full font-semibold shadow-md'
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {mobileMenu && (
                <div className='lg:hidden bg-white border-t shadow-2xl px-4 py-5 animate-fadeIn'>

                    <div className='flex items-center border rounded-full overflow-hidden mb-5 bg-slate-50'>
                        <input
                            type='text'
                            placeholder='Search...'
                            className='w-full px-4 py-3 outline-none bg-transparent'
                            onChange={handleSearch}
                            value={search}
                        />

                        <button
                            type='button'
                            aria-label='Search'
                            className='bg-red-600 text-white px-5 py-4'
                        >
                            <GrSearch />
                        </button>
                    </div>

                    <div className='flex flex-col gap-3'>

                        {user?._id ? (
                            <>
                                <Link
                                    to='/profile'
                                    className='bg-slate-50 hover:bg-red-50 hover:text-red-600 px-4 py-3 rounded-2xl font-semibold'
                                    onClick={() => setMobileMenu(false)}
                                >
                                    My Profile
                                </Link>

                                {user?.role === ROLE.ADMIN && (
                                    <Link
                                        to='/admin-panel/all-products'
                                        className='bg-slate-50 hover:bg-red-50 hover:text-red-600 px-4 py-3 rounded-2xl font-semibold'
                                        onClick={() => setMobileMenu(false)}
                                    >
                                        Admin Panel
                                    </Link>
                                )}

                                <Link
                                    to='/cart'
                                    className='bg-slate-50 hover:bg-red-50 hover:text-red-600 px-4 py-3 rounded-2xl font-semibold'
                                    onClick={() => setMobileMenu(false)}
                                >
                                    Cart ({context?.cartProductCount || 0})
                                </Link>

                                <button
                                    type='button'
                                    onClick={handleLogout}
                                    className='bg-red-600 hover:bg-black text-white py-3 rounded-2xl mt-2 font-semibold'
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to='/login'
                                className='bg-red-600 hover:bg-black text-white py-3 rounded-2xl text-center font-semibold'
                                onClick={() => setMobileMenu(false)}
                            >
                                Login
                            </Link>
                        )}

                    </div>
                </div>
            )}
        </header>
    )
}

export default Header
