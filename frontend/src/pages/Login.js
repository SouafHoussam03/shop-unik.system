import React, {
    useContext,
    useState
} from 'react'

import loginIcons from '../assest/signin.gif'

import {
    FaEye,
    FaEyeSlash,
    FaUserShield
} from "react-icons/fa"

import {
    Link,
    useNavigate
} from 'react-router-dom'

import SummaryApi from '../common'

import { toast } from 'react-toastify'

import Context from '../context'

const Login = () => {

    const [showPassword, setShowPassword] =
        useState(false)

    const [loading, setLoading] =
        useState(false)

    const [data, setData] = useState({

        email: "",

        password: ""
    })

    const navigate = useNavigate()

    const {
        fetchUserDetails,
        fetchUserAddToCart
    } = useContext(Context)

    // ================= HANDLE CHANGE =================
    const handleOnChange = (e) => {

        const { name, value } = e.target

        setData((prev) => {

            return {
                ...prev,
                [name]: value
            }
        })
    }

    // ================= SUBMIT =================
    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            setLoading(true)

            const dataResponse = await fetch(
                SummaryApi.signIn.url,
                {
                    method:
                        SummaryApi.signIn.method,

                    credentials: 'include',

                    headers: {
                        "content-type": "application/json"
                    },

                    body: JSON.stringify(data)
                }
            )

            const dataApi =
                await dataResponse.json()

            if (dataApi.success) {

                toast.success(dataApi.message)

                fetchUserDetails()

                fetchUserAddToCart()

                navigate("/")
            }

            if (dataApi.error) {

                toast.error(dataApi.message)
            }

        } catch (error) {

            toast.error("Something went wrong")
        }
        finally {

            setLoading(false)
        }
    }

    return (

        <section className='min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10'>

            <div className='bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden'>

                {/* HEADER */}
                <div className='bg-gradient-to-r from-red-600 to-red-700 px-8 py-10 text-white text-center'>

                    <div className='w-24 h-24 mx-auto bg-white rounded-full flex justify-center items-center shadow-lg overflow-hidden'>

                        <img
                            src={loginIcons}
                            alt='login'
                            className='w-full h-full object-cover'
                        />

                    </div>

                    <h2 className='text-3xl font-bold mt-5'>
                        Welcome Back 👋
                    </h2>

                    <p className='text-red-100 mt-2'>
                        Login to your UNIK SYSTEM account
                    </p>

                </div>

                {/* FORM */}
                <div className='p-8'>

                    <form
                        className='flex flex-col gap-5'
                        onSubmit={handleSubmit}
                    >

                        {/* EMAIL */}
                        <div>

                            <label className='font-semibold text-gray-700'>
                                Email Address
                            </label>

                            <div className='bg-slate-100 mt-2 rounded-2xl px-4 py-3 border focus-within:border-red-500'>

                                <input
                                    type='email'
                                    placeholder='Enter your email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full bg-transparent outline-none'
                                    required
                                />

                            </div>

                        </div>

                        {/* PASSWORD */}
                        <div>

                            <label className='font-semibold text-gray-700'>
                                Password
                            </label>

                            <div className='bg-slate-100 mt-2 rounded-2xl px-4 py-3 border flex items-center focus-within:border-red-500'>

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder='Enter your password'
                                    value={data.password}
                                    name='password'
                                    onChange={handleOnChange}
                                    className='w-full bg-transparent outline-none'
                                    required
                                />

                                <button
                                    type='button'
                                    className='text-xl text-gray-600 hover:text-red-600 transition-all'
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                >

                                    {
                                        showPassword
                                            ? <FaEyeSlash />
                                            : <FaEye />
                                    }

                                </button>

                            </div>

                            {/* FORGOT */}
                            <Link
                                to={'/forgot-password'}
                                className='block w-fit ml-auto mt-3 text-sm text-red-600 hover:underline font-medium'
                            >

                                Forgot Password?

                            </Link>

                        </div>

                        {/* BUTTON */}
                        <button
                            disabled={loading}
                            className='bg-red-600 hover:bg-red-700 text-white py-4 rounded-full text-lg font-bold transition-all hover:scale-[1.02] mt-3'
                        >

                            {
                                loading
                                    ? "Loading..."
                                    : "Login"
                            }

                        </button>

                    </form>

                    {/* SIGNUP */}
                    <p className='text-center mt-8 text-gray-600'>

                        Don’t have an account?{" "}

                        <Link
                            to={"/sign-up"}
                            className='text-red-600 hover:underline font-semibold'
                        >

                            Create Account

                        </Link>

                    </p>

                    {/* SECURITY */}
                    <div className='mt-8 bg-slate-100 rounded-2xl p-4 flex items-center gap-4'>

                        <div className='bg-red-100 text-red-600 p-3 rounded-full text-2xl'>

                            <FaUserShield />

                        </div>

                        <div>

                            <h3 className='font-bold text-gray-800'>
                                Secure Login
                            </h3>

                            <p className='text-sm text-gray-500'>
                                Your account is protected with encrypted authentication.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}

export default Login