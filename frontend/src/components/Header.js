/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react"
import Logo from "./Logo2"
import { GrSearch } from "react-icons/gr"
import { FaRegCircleUser } from "react-icons/fa6"
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaTools,
} from "react-icons/fa"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import loginIcons from "../assest/signin.gif"
import SummaryApi from "../common"
import { toast } from "react-toastify"
import { setUserDetails } from "../store/userSlice"
import ROLE from "../common/role"
import Context from "../context"

const brand = {
  red: "#EE2D2B",
  redDark: "#C91F1E",
  gray: "#5F5D56",
  light: "#F7F7F5",
  white: "#FFFFFF",
}

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
  const [searchFocus, setSearchFocus] = useState(false)

  useEffect(() => {
    setSearch(searchQuery)
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setMenuDisplay(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuDisplay(false)
        setMobileMenu(false)
        setSearchFocus(false)
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
        credentials: "include",
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
    <header className="fixed top-0 z-50 w-full border-b border-[#5F5D56]/10 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4">
        <Link
          to="/"
          className="flex shrink-0 items-center"
          onClick={() => setMobileMenu(false)}
        >
          <Logo w={320} h={150} />
        </Link>

        {/* Desktop search */}
        <div
          className={`search-shell hidden w-full max-w-xl items-center overflow-hidden rounded-full border bg-[#F7F7F5] transition-all duration-500 lg:flex ${
            searchFocus
              ? "search-active border-[#EE2D2B] shadow-[0_18px_45px_rgba(238,45,43,0.18)]"
              : "border-[#5F5D56]/15 shadow-sm"
          }`}
        >
          <div className="pointer-events-none flex h-[52px] w-14 items-center justify-center text-[#5F5D56]/60">
            <GrSearch className={searchFocus ? "search-icon-active" : ""} />
          </div>

          <input
            type="text"
            placeholder="Search products..."
            className="h-[52px] w-full bg-transparent px-1 text-[#5F5D56] outline-none placeholder:text-[#5F5D56]/55"
            onChange={handleSearch}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            value={search}
          />

          <button
            type="button"
            aria-label="Search"
            className="m-1 flex h-11 min-w-14 items-center justify-center rounded-full bg-[#EE2D2B] text-lg text-white shadow-lg transition-all duration-300 hover:bg-[#5F5D56] hover:scale-105"
          >
            <GrSearch />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label={mobileMenu ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenu((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F7F7F5] text-xl text-[#5F5D56] transition-all hover:bg-[#EE2D2B] hover:text-white lg:hidden"
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button>

          <div ref={userMenuRef} className="relative hidden lg:flex">
            {user?._id && (
              <button
                type="button"
                aria-label="User menu"
                onClick={() => setMenuDisplay((prev) => !prev)}
                className="flex items-center justify-center"
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic || loginIcons}
                    alt={user?.name || "user"}
                    className="h-11 w-11 rounded-full border-2 border-[#EE2D2B] object-cover shadow-md transition-all duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F7F7F5] text-2xl text-[#5F5D56] transition-all hover:bg-[#EE2D2B] hover:text-white">
                    <FaRegCircleUser />
                  </div>
                )}
              </button>
            )}

            {menuDisplay && (
              <div className="animate-menuIn absolute right-0 top-14 min-w-[250px] rounded-3xl border border-[#5F5D56]/10 bg-white p-3 shadow-2xl">
                <div className="mb-2 border-b border-[#5F5D56]/10 px-4 py-3">
                  <p className="line-clamp-1 font-black text-[#5F5D56]">
                    {user?.name || "User"}
                  </p>
                  <p className="line-clamp-1 text-sm text-[#5F5D56]/65">
                    {user?.email}
                  </p>
                </div>

                <nav className="flex flex-col gap-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold text-[#5F5D56] transition-all hover:bg-[#F7F7F5] hover:text-[#EE2D2B]"
                    onClick={() => setMenuDisplay(false)}
                  >
                    <FaUser className="text-[#EE2D2B]" />
                    My Profile
                  </Link>

                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to="/admin-panel/all-products"
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold text-[#5F5D56] transition-all hover:bg-[#F7F7F5] hover:text-[#EE2D2B]"
                      onClick={() => setMenuDisplay(false)}
                    >
                      <FaTools className="text-[#EE2D2B]" />
                      Admin Panel
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-[#EE2D2B] py-3 font-semibold text-white transition-all duration-300 hover:bg-[#5F5D56]"
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
              to="/cart"
              className="relative hidden text-2xl text-[#5F5D56] transition-all duration-300 hover:text-[#EE2D2B] lg:flex"
            >
              <FaShoppingCart />

              <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#EE2D2B] text-xs text-white shadow">
                {context?.cartProductCount || 0}
              </span>
            </Link>
          )}

          {!user?._id && (
            <Link
              to="/login"
              className="hidden rounded-full bg-[#EE2D2B] px-5 py-2.5 font-bold text-white shadow-md transition-all duration-300 hover:bg-[#5F5D56] lg:flex"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="animate-menuIn border-t border-[#5F5D56]/10 bg-white px-4 py-5 shadow-2xl lg:hidden">
          <div className="mb-5 flex items-center overflow-hidden rounded-full border border-[#5F5D56]/15 bg-[#F7F7F5]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent px-4 py-3 text-[#5F5D56] outline-none"
              onChange={handleSearch}
              value={search}
            />

            <button
              type="button"
              aria-label="Search"
              className="bg-[#EE2D2B] px-5 py-4 text-white"
            >
              <GrSearch />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {user?._id ? (
              <>
                <Link
                  to="/profile"
                  className="rounded-2xl bg-[#F7F7F5] px-4 py-3 font-semibold text-[#5F5D56] hover:text-[#EE2D2B]"
                  onClick={() => setMobileMenu(false)}
                >
                  My Profile
                </Link>

                {user?.role === ROLE.ADMIN && (
                  <Link
                    to="/admin-panel/all-products"
                    className="rounded-2xl bg-[#F7F7F5] px-4 py-3 font-semibold text-[#5F5D56] hover:text-[#EE2D2B]"
                    onClick={() => setMobileMenu(false)}
                  >
                    Admin Panel
                  </Link>
                )}

                <Link
                  to="/cart"
                  className="rounded-2xl bg-[#F7F7F5] px-4 py-3 font-semibold text-[#5F5D56] hover:text-[#EE2D2B]"
                  onClick={() => setMobileMenu(false)}
                >
                  Cart ({context?.cartProductCount || 0})
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 rounded-2xl bg-[#EE2D2B] py-3 font-semibold text-white hover:bg-[#5F5D56]"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded-2xl bg-[#EE2D2B] py-3 text-center font-semibold text-white hover:bg-[#5F5D56]"
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