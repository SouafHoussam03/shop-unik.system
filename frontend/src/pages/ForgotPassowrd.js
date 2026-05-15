import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!email) {
            return toast.error("Please enter your email")
        }

        try {

            setLoading(true)

            const response = await fetch(
                "https://shop-unik-system.onrender.com/api/forgot-password",
                {
                    method: "POST",

                    credentials: "include",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({ email })
                }
            )

            const dataResponse = await response.json()

            console.log(dataResponse)

            if (dataResponse.success) {

                toast.success(
                    dataResponse.message || "Reset link sent successfully"
                )

                setEmail("")

                setTimeout(() => {

                    toast.info("Check your email inbox 📩")

                }, 1200)

            } else {

                toast.error(
                    dataResponse.message || "Something went wrong"
                )
            }

        } catch (error) {

            console.log("FORGOT PASSWORD ERROR => ", error)

            toast.error(
                error.message || "Server Error"
            )

        } finally {

            setLoading(false)
        }
    }

    return (

        <section className='min-h-screen bg-slate-100 flex justify-center items-center px-4'>

            <div className='bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden'>

                {/* HEADER */}
                <div className='bg-red-600 text-white text-center py-10 px-6'>

                    <h2 className='text-3xl font-bold'>
                        Forgot Password
                    </h2>

                    <p className='mt-2 text-red-100'>
                        Enter your email to receive reset link
                    </p>

                </div>

                {/* FORM */}
                <div className='p-8'>

                    <form
                        onSubmit={handleSubmit}
                        className='flex flex-col gap-5'
                    >

                        {/* EMAIL */}
                        <div>

                            <label className='font-semibold text-gray-700'>
                                Email Address
                            </label>

                            <input
                                type='email'
                                placeholder='Enter your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full mt-2 border border-gray-300 p-4 rounded-2xl outline-none focus:border-red-500 transition-all'
                                required
                            />

                        </div>

                        {/* BUTTON */}
                        <button
                            type='submit'
                            disabled={loading}
                            className='bg-red-600 hover:bg-red-700 text-white py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-[1.02]'
                        >

                            {
                                loading
                                    ? "Sending..."
                                    : "Send Reset Link"
                            }

                        </button>

                    </form>

                    {/* FOOTER */}
                    <p className='text-center mt-6 text-gray-600'>

                        Back to{" "}

                        <Link
                            to="/login"
                            className='text-red-600 font-semibold hover:underline'
                        >
                            Login
                        </Link>

                    </p>

                </div>

            </div>

        </section>
    )
}

export default ForgotPassword