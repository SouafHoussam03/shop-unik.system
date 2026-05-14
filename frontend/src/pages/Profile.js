import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import loginIcons from '../assest/signin.gif'
import uploadImage from '../helpers/uploadImage'
import { toast } from 'react-toastify'
import SummaryApi from '../common'
import Context from '../context'

const Profile = () => {

    const user = useSelector(state => state?.user?.user)

    const { fetchUserDetails } = useContext(Context)

    const [data, setData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        profilePic: user?.profilePic || ""
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

    // ✅ upload image
    const handleUploadPic = async (e) => {

        const file = e.target.files[0]

        if (!file) return

        try {

            setLoading(true)

            // ✅ upload to cloudinary
            const uploadImageCloudinary = await uploadImage(file)

            setData((prev) => ({
                ...prev,
                profilePic: uploadImageCloudinary.secure_url
            }))

            toast.success("Image uploaded")

        } catch (error) {

            console.error(error)

            toast.error("Image upload failed")

        } finally {

            setLoading(false)
        }
    }

    // ✅ submit
    const handleSubmit = async (e) => {

        e.preventDefault()

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
                        name: data.name,
                        email: data.email,
                        profilePic: data.profilePic
                    })
                }
            )

            const dataResponse = await response.json()

            if (dataResponse.success) {

                toast.success("Profile updated successfully")

                // ✅ refresh redux user
                fetchUserDetails()
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

        <section className='min-h-[calc(100vh-120px)] bg-slate-100 py-8'>

            <div className='mx-auto container px-4'>

                <div className='bg-white p-6 w-full max-w-md mx-auto rounded-2xl shadow-lg'>

                    {/* PROFILE IMAGE */}
                    <div className='w-32 h-32 mx-auto relative overflow-hidden rounded-full border-4 border-red-500 shadow'>

                        <img
                            src={data.profilePic || loginIcons}
                            alt='profile'
                            className='w-full h-full object-cover'
                        />

                        <form>
                            <label>

                                <div className='text-xs bg-black bg-opacity-70 text-white pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                                    Change Photo
                                </div>

                                <input
                                    type='file'
                                    className='hidden'
                                    accept='image/*'
                                    onChange={handleUploadPic}
                                />

                            </label>
                        </form>

                    </div>

                    {/* TITLE */}
                    <div className='text-center mt-5'>

                        <h2 className='text-3xl font-bold text-gray-800'>
                            My Profile
                        </h2>

                        <p className='text-gray-500 mt-1'>
                            Update your account information
                        </p>

                    </div>

                    {/* FORM */}
                    <form
                        className='pt-8 flex flex-col gap-5'
                        onSubmit={handleSubmit}
                    >

                        {/* NAME */}
                        <div>

                            <label className='font-medium text-gray-700'>
                                Full Name
                            </label>

                            <div className='bg-slate-100 mt-2 p-3 rounded-lg border focus-within:border-red-500'>

                                <input
                                    type='text'
                                    placeholder='Enter your name'
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                />

                            </div>

                        </div>

                        {/* EMAIL */}
                        <div>

                            <label className='font-medium text-gray-700'>
                                Email Address
                            </label>

                            <div className='bg-slate-100 mt-2 p-3 rounded-lg border focus-within:border-red-500'>

                                <input
                                    type='email'
                                    placeholder='Enter your email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                />

                            </div>

                        </div>

                        {/* BUTTON */}
                        <button
                            disabled={loading}
                            className='bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-semibold text-lg transition-all hover:scale-[1.02]'
                        >

                            {
                                loading
                                    ? "Updating..."
                                    : "Update Profile"
                            }

                        </button>

                    </form>

                </div>

            </div>

        </section>
    )
}

export default Profile