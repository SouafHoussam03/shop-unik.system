import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
    FaCamera,
    FaEnvelope,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaUser
} from "react-icons/fa"

import loginIcons from '../assest/signin.gif'
import uploadImage from '../helpers/uploadImage'
import SummaryApi from '../common'
import Context from '../context'

const Profile = () => {
    const user = useSelector(state => state?.user?.user)
    const { fetchUserDetails } = useContext(Context)

    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        profilePic: ""
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user) {
            setData({
                name: user?.name || "",
                email: user?.email || "",
                phone: user?.phone || "",
                address: user?.address || "",
                profilePic: user?.profilePic || ""
            })
        }
    }, [user])

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleUploadPic = async (e) => {
        const file = e.target.files?.[0]

        if (!file) return

        if (!file.type.startsWith("image/")) {
            toast.error("Please upload a valid image")
            return
        }

        try {
            setLoading(true)

            const uploadImageCloudinary = await uploadImage(file)

            setData((prev) => ({
                ...prev,
                profilePic:
                    uploadImageCloudinary.secure_url ||
                    uploadImageCloudinary.url
            }))

            toast.success("Image uploaded")
        } catch (error) {
            toast.error("Image upload failed")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!data.name.trim() || !data.email.trim()) {
            toast.error("Name and email are required")
            return
        }

        try {
            setLoading(true)

            const response = await fetch(
                SummaryApi.updateUser.url,
                {
                    method: SummaryApi.updateUser.method,
                    credentials: "include",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: user?._id,
                        name: data.name.trim(),
                        email: data.email.trim().toLowerCase(),
                        phone: data.phone.trim(),
                        address: data.address.trim(),
                        profilePic: data.profilePic
                    })
                }
            )

            const dataResponse = await response.json()

            if (dataResponse.success) {
                toast.success("Profile updated successfully")
                fetchUserDetails()
            }

            if (dataResponse.error) {
                toast.error(dataResponse.message)
            }

        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className='min-h-[calc(100vh-120px)] bg-slate-100 py-8'>

            <div className='mx-auto container px-4'>

                <div className='bg-white w-full max-w-2xl mx-auto rounded-3xl shadow-xl overflow-hidden border'>

                    <div className='bg-gradient-to-r from-red-600 to-black text-white p-8 text-center'>

                        <div className='w-32 h-32 mx-auto relative overflow-hidden rounded-full border-4 border-white shadow-xl bg-white'>

                            <img
                                src={data.profilePic || loginIcons}
                                alt='profile'
                                className='w-full h-full object-cover'
                            />

                            <label>
                                <div className='absolute bottom-0 left-0 right-0 bg-black/70 text-white py-2 cursor-pointer text-center flex items-center justify-center gap-2 text-sm'>
                                    <FaCamera />
                                    Photo
                                </div>

                                <input
                                    type='file'
                                    className='hidden'
                                    accept='image/*'
                                    onChange={handleUploadPic}
                                />
                            </label>

                        </div>

                        <h2 className='text-3xl font-bold mt-5'>
                            My Profile
                        </h2>

                        <p className='text-red-100 mt-1'>
                            Update your account information
                        </p>

                    </div>

                    <form
                        className='p-6 md:p-8 grid md:grid-cols-2 gap-5'
                        onSubmit={handleSubmit}
                    >

                        <div>
                            <label className='font-semibold text-gray-700 flex items-center gap-2'>
                                <FaUser className='text-red-600' />
                                Full Name
                            </label>

                            <div className='bg-slate-100 mt-2 p-4 rounded-2xl border focus-within:border-red-500'>
                                <input
                                    type='text'
                                    placeholder='Enter your name'
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    className='w-full outline-none bg-transparent'
                                />
                            </div>
                        </div>

                        <div>
                            <label className='font-semibold text-gray-700 flex items-center gap-2'>
                                <FaEnvelope className='text-red-600' />
                                Email Address
                            </label>

                            <div className='bg-slate-100 mt-2 p-4 rounded-2xl border focus-within:border-red-500'>
                                <input
                                    type='email'
                                    placeholder='Enter your email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full outline-none bg-transparent'
                                />
                            </div>
                        </div>

                        <div>
                            <label className='font-semibold text-gray-700 flex items-center gap-2'>
                                <FaPhoneAlt className='text-red-600' />
                                Phone Number
                            </label>

                            <div className='bg-slate-100 mt-2 p-4 rounded-2xl border focus-within:border-red-500'>
                                <input
                                    type='tel'
                                    placeholder='Enter your phone number'
                                    name='phone'
                                    value={data.phone}
                                    onChange={handleOnChange}
                                    className='w-full outline-none bg-transparent'
                                />
                            </div>
                        </div>

                        <div>
                            <label className='font-semibold text-gray-700 flex items-center gap-2'>
                                <FaMapMarkerAlt className='text-red-600' />
                                Address
                            </label>

                            <div className='bg-slate-100 mt-2 p-4 rounded-2xl border focus-within:border-red-500'>
                                <input
                                    type='text'
                                    placeholder='Enter your address'
                                    name='address'
                                    value={data.address}
                                    onChange={handleOnChange}
                                    className='w-full outline-none bg-transparent'
                                />
                            </div>
                        </div>

                        <div className='md:col-span-2'>
                            <button
                                type='submit'
                                disabled={loading}
                                className='w-full bg-red-600 hover:bg-black disabled:bg-red-300 disabled:cursor-not-allowed text-white py-4 rounded-full font-bold text-lg transition-all hover:scale-[1.02]'
                            >
                                {
                                    loading
                                        ? "Updating..."
                                        : "Update Profile"
                                }
                            </button>
                        </div>

                    </form>

                </div>

            </div>

        </section>
    )
}

export default Profile