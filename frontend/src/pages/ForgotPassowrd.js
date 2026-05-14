import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    // ✅ submit
    const handleSubmit = async (e) => {

        e.preventDefault()

        // ✅ validation
        if (!email) {
            return toast.error("Please enter your email")
        }

        try {

            setLoading(true)

            // ✅ request
            const response = await fetch(
                "http://localhost:8080/api/forgot-password",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({ email })
                }
            )

            const dataResponse = await response.json()

            // ✅ success
            if (dataResponse.success) {

                toast.success(dataResponse.message)

                setTimeout(() => {

                    toast.info(
                        "Check your email inbox 📩"
                    )

                }, 1000)

            } else {

                toast.error(dataResponse.message)
            }

        } catch (error) {

            console.log(error)

            toast.error("Server Error")

        } finally {

            setLoading(false)
        }
    }

    return (

        <section className='min-h-screen bg-slate-100 flex justify-center items-center px-4'>

            <div className='bg-white w-full max-w-md rounded-3xl shadow-xl p-8'>

                {/* HEADER */}
                <div className='text-center'>

                    <h2 className='text-3xl font-bold text-gray-800'>
                        Forgot Password
                    </h2>

                    <p className='text-gray-500 mt-2'>
                        Enter your email to receive reset link
                    </p>

                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className='mt-8 flex flex-col gap-5'
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
                            className='w-full mt-2 border border-gray-300 p-3 rounded-xl outline-none focus:border-red-500 transition-all'
                        />

                    </div>

                    {/* BUTTON */}
                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-[1.02]'
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

        </section>
    )
}

export default ForgotPassword