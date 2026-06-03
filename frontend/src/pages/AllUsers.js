/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import SummaryApi from "../common"
import { toast } from "react-toastify"
import moment from "moment"
import { MdModeEdit, MdDelete } from "react-icons/md"
import { FaDownload, FaUsers, FaSyncAlt } from "react-icons/fa"
import ChangeUserRole from "../components/ChangeUserRole"

const brand = {
  red: "#EE2D2B",
  gray: "#5F5D56",
  light: "#F7F7F5",
  white: "#FFFFFF",
}

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([])
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(false)

  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  })

  const fetchAllUsers = async () => {
    try {
      setFetchLoading(true)

      const fetchData = await fetch(SummaryApi.allUser.url, {
        method: SummaryApi.allUser.method,
        credentials: "include",
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
    } finally {
      setFetchLoading(false)
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
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId }),
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

  const cleanExcelValue = (value) => {
    const text = value === null || value === undefined ? "" : String(value)

    if (/^[=+\-@]/.test(text)) {
      return `'${text}`
    }

    return text.replace(/"/g, '""')
  }

  const handleDownloadExcel = () => {
    if (!allUser.length) {
      toast.error("No users to export")
      return
    }

    const headers = ["Sr", "Name", "Email", "Role", "Created Date", "User ID"]

    const rows = allUser.map((user, index) => [
      index + 1,
      cleanExcelValue(user?.name),
      cleanExcelValue(user?.email),
      cleanExcelValue(user?.role),
      user?.createdAt ? moment(user.createdAt).format("YYYY-MM-DD HH:mm") : "",
      cleanExcelValue(user?._id),
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n")

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.href = url
    link.download = `unik-system-users-${moment().format("YYYY-MM-DD")}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast.success("Users exported successfully")
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <div className="rounded-3xl border border-[#5F5D56]/10 bg-white shadow-xl overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-[#5F5D56]/10 bg-[#F7F7F5] px-5 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[4px] text-[#EE2D2B]">
            UNIK SYSTEM
          </p>

          <h2 className="mt-2 flex items-center gap-3 text-2xl font-black text-[#5F5D56]">
            <FaUsers className="text-[#EE2D2B]" />
            All Users
          </h2>

          <p className="mt-1 text-sm text-[#5F5D56]/70">
            Total users: {allUser.length}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={fetchAllUsers}
            disabled={fetchLoading}
            className="flex items-center justify-center gap-2 rounded-full border border-[#5F5D56]/20 bg-white px-5 py-3 font-bold text-[#5F5D56] transition-all duration-300 hover:border-[#EE2D2B] hover:text-[#EE2D2B] disabled:opacity-60"
          >
            <FaSyncAlt className={fetchLoading ? "animate-spin" : ""} />
            Refresh
          </button>

          <button
            type="button"
            onClick={handleDownloadExcel}
            className="flex items-center justify-center gap-2 rounded-full bg-[#EE2D2B] px-5 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#5F5D56]"
          >
            <FaDownload />
            Télécharger Excel
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead>
            <tr className="bg-[#5F5D56] text-white">
              <th className="px-5 py-4 text-sm font-black">Sr.</th>
              <th className="px-5 py-4 text-sm font-black">Name</th>
              <th className="px-5 py-4 text-sm font-black">Email</th>
              <th className="px-5 py-4 text-sm font-black">Role</th>
              <th className="px-5 py-4 text-sm font-black">Created Date</th>
              <th className="px-5 py-4 text-center text-sm font-black">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {allUser?.map((el, index) => (
              <tr
                key={el?._id}
                className="border-b border-[#5F5D56]/10 transition-all hover:bg-[#F7F7F5]"
              >
                <td className="px-5 py-4 font-semibold text-[#5F5D56]">
                  {index + 1}
                </td>

                <td className="px-5 py-4 font-bold text-[#5F5D56]">
                  {el?.name || "N/A"}
                </td>

                <td className="px-5 py-4 text-[#5F5D56]/80">
                  {el?.email || "N/A"}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-[#EE2D2B]/10 px-4 py-1.5 text-sm font-bold uppercase text-[#EE2D2B]">
                    {el?.role || "USER"}
                  </span>
                </td>

                <td className="px-5 py-4 text-[#5F5D56]/80">
                  {el?.createdAt ? moment(el.createdAt).format("LL") : "N/A"}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      title="Edit user"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5F5D56]/10 text-[#5F5D56] transition-all duration-300 hover:scale-110 hover:bg-[#EE2D2B] hover:text-white"
                      onClick={() => {
                        setUpdateUserDetails(el)
                        setOpenUpdateRole(true)
                      }}
                    >
                      <MdModeEdit />
                    </button>

                    <button
                      type="button"
                      title="Delete user"
                      disabled={deleteLoading}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EE2D2B]/10 text-[#EE2D2B] transition-all duration-300 hover:scale-110 hover:bg-[#EE2D2B] hover:text-white disabled:opacity-50"
                      onClick={() => handleDeleteUser(el?._id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {!fetchLoading && allUser.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-5 py-12 text-center font-semibold text-[#5F5D56]/70"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails?.name}
          email={updateUserDetails?.email}
          role={updateUserDetails?.role}
          userId={updateUserDetails?._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  )
}

export default AllUsers