import React, { useState } from 'react'

import loginIcons from '../assest/signin.gif'

import {
    FaEye,
    FaEyeSlash,
    FaCamera,
    FaUserPlus
} from "react-icons/fa"

import {
    Link,
    useNavigate
} from 'react-router-dom'

import imageTobase64 from '../helpers/imageTobase64'

import SummaryApi from '../common'

import { toast } from 'react-toastify'

const SignUp = () => {

    const [showPassword, setShowPassword] =
        useState(false)

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false)

    const [loading, setLoading] =
        useState(false)

    const [data, setData] = useState({

        email: "",

        password: "",

        name: "",

        confirmPassword: "",

        profilePic: "",
    })

    const navigate = useNavigate()

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

    // ================= UPLOAD IMAGE =================
    const handleUploadPic = async (e) => {

        const file = e.target.files[0]

        if (!file) return

        const imagePic =
            await imageTobase64(file)

        setData((prev) => {

            return {
                ...prev,
                profilePic: imagePic
            }
        })
    }

    // ================= SUBMIT =================
    const handleSubmit = async (e) => {

        e.preventDefault()

        if (data.password !== data.confirmPassword) {

            return toast.error(
                "Password and confirm password do not match"
            )
        }

        try {

            setLoading(true)

            const dataResponse = await fetch(
                SummaryApi.signUP.url,
                {
                    method:
                        SummaryApi.signUP.method,

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

                navigate("/login")
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

                    <div className='relative w-28 h-28 mx-auto rounded-full overflow-hidden bg-white shadow-xl border-4 border-white'>

                        <img
                            src={
                                data.profilePic || loginIcons
                            }
                            alt='profile'
                            className='w-full h-full object-cover'
                        />

                        {/* UPLOAD */}
                        <label>

                            <div className='absolute bottom-0 left-0 right-0 bg-black/60 text-white py-2 flex justify-center items-center gap-2 cursor-pointer text-sm hover:bg-black/80 transition-all'>

                                <FaCamera />

                                Upload

                            </div>

                            <input
                                type='file'
                                className='hidden'
                                onChange={handleUploadPic}
                            />

                        </label>

                    </div>

                    <h2 className='text-3xl font-bold mt-6'>
                        Create Account 🚀
                    </h2>

                    <p className='text-red-100 mt-2'>
                        Join UNIK SYSTEM today
                    </p>

                </div>

                {/* FORM */}
                <div className='p-8'>

                    <form
                        className='flex flex-col gap-5'
                        onSubmit={handleSubmit}
                    >

                        {/* NAME */}
                        <div>

                            <label className='font-semibold text-gray-700'>
                                Full Name
                            </label>

                            <div className='bg-slate-100 mt-2 rounded-2xl px-4 py-3 border focus-within:border-red-500'>

                                <input
                                    type='text'
                                    placeholder='Enter your name'
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full bg-transparent outline-none'
                                />

                            </div>

                        </div>

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
                                    required
                                    className='w-full bg-transparent outline-none'
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
                                    placeholder='Enter password'
                                    value={data.password}
                                    name='password'
                                    onChange={handleOnChange}
                                    required
                                    className='w-full bg-transparent outline-none'
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

                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div>

                            <label className='font-semibold text-gray-700'>
                                Confirm Password
                            </label>

                            <div className='bg-slate-100 mt-2 rounded-2xl px-4 py-3 border flex items-center focus-within:border-red-500'>

                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder='Confirm password'
                                    value={data.confirmPassword}
                                    name='confirmPassword'
                                    onChange={handleOnChange}
                                    required
                                    className='w-full bg-transparent outline-none'
                                />

                                <button
                                    type='button'
                                    className='text-xl text-gray-600 hover:text-red-600 transition-all'
                                    onClick={() =>
                                        setShowConfirmPassword((prev) => !prev)
                                    }
                                >

                                    {
                                        showConfirmPassword
                                            ? <FaEyeSlash />
                                            : <FaEye />
                                    }

                                </button>

                            </div>

                        </div>

                        {/* BUTTON */}
                        <button
                            disabled={loading}
                            className='bg-red-600 hover:bg-red-700 text-white py-4 rounded-full text-lg font-bold transition-all hover:scale-[1.02] mt-3 flex justify-center items-center gap-3'
                        >

                            <FaUserPlus />

                            {
                                loading
                                    ? "Creating..."
                                    : "Create Account"
                            }

                        </button>

                    </form>

                    {/* LOGIN */}
                    <p className='text-center mt-8 text-gray-600'>

                        Already have an account?{" "}

                        <Link
                            to={"/login"}
                            className='text-red-600 hover:underline font-semibold'
                        >

                            Login

                        </Link>

                    </p>

                </div>

            </div>

        </section>
    )
}

export default SignUp