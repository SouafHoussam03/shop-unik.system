import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {

    const [userRole, setUserRole] = useState(role)
    const [loading, setLoading] = useState(false)

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)
    }

    const updateUserRole = async () => {

        try {

            setLoading(true)

            const fetchResponse = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    role: userRole
                })
            })

            const responseData = await fetchResponse.json()

            if (responseData.success) {
                toast.success(responseData.message)
                onClose()
                callFunc()
            }

            if (responseData.error) {
                toast.error(responseData.message)
            }

        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>

            <div className='w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200'>

                {/* Header */}
                <div className='flex items-center justify-between px-6 py-4 bg-[#0f172a] text-white'>
                    <div>
                        <h1 className='text-xl font-bold tracking-wide'>
                            UNIK SYSTEM
                        </h1>
                        <p className='text-sm text-gray-300'>
                            Change User Role
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className='text-white hover:text-red-400 transition-all duration-200 text-xl'
                    >
                        <IoMdClose />
                    </button>
                </div>

                {/* Body */}
                <div className='p-6 space-y-5'>

                    <div className='bg-slate-100 rounded-xl p-4'>
                        <p className='text-sm text-gray-500 mb-1'>User Name</p>
                        <p className='font-semibold text-gray-800'>
                            {name}
                        </p>
                    </div>

                    <div className='bg-slate-100 rounded-xl p-4'>
                        <p className='text-sm text-gray-500 mb-1'>Email</p>
                        <p className='font-semibold text-gray-800 break-all'>
                            {email}
                        </p>
                    </div>

                    <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                            Select Role
                        </label>

                        <select
                            className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition-all'
                            value={userRole}
                            onChange={handleOnChangeSelect}
                        >
                            {
                                Object.values(ROLE).map((el) => {
                                    return (
                                        <option value={el} key={el}>
                                            {el}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <button
                        onClick={updateUserRole}
                        disabled={loading}
                        className='w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 transition-all duration-300 text-white font-semibold shadow-md hover:shadow-lg disabled:bg-gray-400'
                    >
                        {
                            loading ? "Updating..." : "Change Role"
                        }
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ChangeUserRole