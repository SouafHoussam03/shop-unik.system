import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit, MdDelete } from "react-icons/md"
import ChangeUserRole from '../components/ChangeUserRole'

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""
    })

    const fetchAllUsers = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            })

            const dataResponse = await fetchData.json()

            if (dataResponse.success) {
                setAllUsers(dataResponse?.data || [])
            }

            if (dataResponse.error) {
                toast.error(dataResponse.message)
            }

        } catch (error) {
            toast.error("Failed to fetch users")
        }
    }

    const handleDeleteUser = async (userId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        )

        if (!confirmDelete) return

        try {
            setDeleteLoading(true)

            const response = await fetch(SummaryApi.deleteUser.url, {
                method: SummaryApi.deleteUser.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    userId
                })
            })

            const dataResponse = await response.json()

            if (dataResponse.success) {
                toast.success(dataResponse.message)
                fetchAllUsers()
            }

            if (dataResponse.error) {
                toast.error(dataResponse.message)
            }

        } catch (error) {
            toast.error("Failed to delete user")
        } finally {
            setDeleteLoading(false)
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    return (
        <div className='bg-white pb-4 rounded shadow overflow-x-auto'>

            <table className='w-full userTable'>

                <thead>
                    <tr className='bg-black text-white'>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        allUser?.map((el, index) => (
                            <tr key={el?._id}>

                                <td>{index + 1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>

                                <td>
                                    {moment(el?.createdAt).format('LL')}
                                </td>

                                <td>
                                    <div className='flex items-center justify-center gap-3'>

                                        <button
                                            type='button'
                                            title='Edit user'
                                            className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white transition-all'
                                            onClick={() => {
                                                setUpdateUserDetails(el)
                                                setOpenUpdateRole(true)
                                            }}
                                        >
                                            <MdModeEdit />
                                        </button>

                                        <button
                                            type='button'
                                            title='Delete user'
                                            disabled={deleteLoading}
                                            className='bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-600 hover:text-white transition-all disabled:opacity-50'
                                            onClick={() =>
                                                handleDeleteUser(el?._id)
                                            }
                                        >
                                            <MdDelete />
                                        </button>

                                    </div>
                                </td>

                            </tr>
                        ))
                    }
                </tbody>

            </table>

            {
                openUpdateRole && (
                    <ChangeUserRole
                        onClose={() => setOpenUpdateRole(false)}
                        name={updateUserDetails?.name}
                        email={updateUserDetails?.email}
                        role={updateUserDetails?.role}
                        userId={updateUserDetails?._id}
                        callFunc={fetchAllUsers}
                    />
                )
            }

        </div>
    )
}

export default AllUsers
