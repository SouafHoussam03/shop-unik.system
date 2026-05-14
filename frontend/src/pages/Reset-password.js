import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { toast } from 'react-toastify'

const ResetPassword = () => {

    const navigate = useNavigate()

    // ✅ token from URL
    const { token } = useParams()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [data, setData] = useState({
        password: "",
        confirmPassword: ""
    })

    const [loading, setLoading] = useState(false)

    // ✅ input change
    const handleOnChange = (e) => {

        const { name, value } = e.target

        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // ✅ submit
    const handleSubmit = async (e) => {

        e.preventDefault()

        // validation
        if (!data.password || !data.confirmPassword) {
            return toast.error("Please fill all fields")
        }

        if (data.password !== data.confirmPassword) {
            return toast.error("Passwords do not match")
        }

        try {

            setLoading(true)

            const response = await fetch(
                "http://localhost:8080/api/reset-password",
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        token,
                        password: data.password
                    })
                }
            )

            const dataResponse = await response.json()

            if (dataResponse.success) {

                toast.success(dataResponse.message)

                navigate("/login")
            }

            if (dataResponse.error) {
                toast.error(dataResponse.message)
            }

        } catch (error) {

            console.error(error)

            toast.error("Something went wrong")

        } finally {

            setLoading(false)
        }
    }

    return (

        <section className='min-h-screen flex items-center justify-center bg-slate-100 px-4'>

            <div className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md'>

                <h2 className='text-3xl font-bold text-center text-gray-800'>
                    Reset Password
                </h2>

                <p className='text-center text-gray-500 mt-2'>
                    Enter your new password
                </p>

                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-5 mt-6'
                >

                    {/* PASSWORD */}
                    <div>

                        <label className='font-medium'>
                            New Password
                        </label>

                        <div className='border mt-2 rounded-xl flex items-center p-3'>

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='Enter new password'
                                name='password'
                                value={data.password}
                                onChange={handleOnChange}
                                className='w-full outline-none'
                            />

                            <div
                                className='cursor-pointer text-xl'
                                onClick={() => setShowPassword(prev => !prev)}
                            >

                                {
                                    showPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                }

                            </div>

                        </div>

                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div>

                        <label className='font-medium'>
                            Confirm Password
                        </label>

                        <div className='border mt-2 rounded-xl flex items-center p-3'>

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder='Confirm password'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleOnChange}
                                className='w-full outline-none'
                            />

                            <div
                                className='cursor-pointer text-xl'
                                onClick={() => setShowConfirmPassword(prev => !prev)}
                            >

                                {
                                    showConfirmPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                }

                            </div>

                        </div>

                    </div>

                    {/* BUTTON */}
                    <button
                        disabled={loading}
                        className='bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-semibold transition-all'
                    >

                        {
                            loading
                                ? "Updating..."
                                : "Reset Password"
                        }

                    </button>

                </form>

                <p className='text-center mt-5'>

                    Back to{" "}

                    <Link
                        to="/login"
                        className='text-red-600 hover:underline'
                    >
                        Login
                    </Link>

                </p>

            </div>

        </section>
    )
}

export default ResetPassword