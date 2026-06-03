import React, { useEffect, useMemo, useState } from "react"
import { toast } from "react-toastify"
import {
    FaBoxOpen,
    FaDownload,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaSearch,
    FaShoppingCart,
    FaTruck,
    FaUser
} from "react-icons/fa"

import SummaryApi from "../common"
import displayCurrency from "../helpers/displayCurrency"

const filters = [
    { label: "Tous", value: "all" },
    { label: "Avec livraison", value: "withDelivery" },
    { label: "Sans livraison", value: "withoutDelivery" },
    { label: "Panier actif", value: "withCart" },
    { label: "Avec commandes", value: "withOrders" }
]

const getOrderCode = (order, index = 0) => {
    if (order?.orderCode) return order.orderCode
    if (order?.commandeCode) return order.commandeCode

    const id = order?._id || ""
    const shortId = id ? id.slice(-6).toUpperCase() : String(index + 1).padStart(6, "0")

    return `CMD-${shortId}`
}

const AdminUsersCartDelivery = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeFilter, setActiveFilter] = useState("all")
    const [searchCode, setSearchCode] = useState("")

    const fetchData = async () => {
        try {
            setLoading(true)

            const response = await fetch(SummaryApi.adminUsersCartDelivery.url, {
                method: SummaryApi.adminUsersCartDelivery.method,
                credentials: "include"
            })

            const result = await response.json()

            if (result.success) {
                setData(result.data || [])
            }

            if (result.error) {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error("Failed to load admin data")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const filteredData = useMemo(() => {
        const cleanSearch = searchCode.trim().toLowerCase()

        return data.filter((item) => {
            const hasDelivery = Boolean(item?.lastDeliveryInfo)
            const hasCart = item?.cartItems?.length > 0
            const hasOrders = item?.orders?.length > 0

            if (activeFilter === "withDelivery" && !hasDelivery) return false
            if (activeFilter === "withoutDelivery" && hasDelivery) return false
            if (activeFilter === "withCart" && !hasCart) return false
            if (activeFilter === "withOrders" && !hasOrders) return false

            if (!cleanSearch) return true

            const user = item?.user || {}
            const orders = item?.orders || []

            const userMatch =
                user?.name?.toLowerCase().includes(cleanSearch) ||
                user?.email?.toLowerCase().includes(cleanSearch)

            const orderMatch = orders.some((order, index) => {
                return getOrderCode(order, index)
                    .toLowerCase()
                    .includes(cleanSearch)
            })

            return userMatch || orderMatch
        })
    }, [data, activeFilter, searchCode])

    const downloadTextFile = (filename, content) => {
        const blob = new Blob([content], {
            type: "text/plain;charset=utf-8"
        })

        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")

        link.href = url
        link.download = filename
        link.click()

        URL.revokeObjectURL(url)
    }

    const getUserDeliveryFileContent = (item) => {
        const user = item?.user || {}
        const delivery = item?.lastDeliveryInfo || {}
        const cartItems = item?.cartItems || []
        const orders = item?.orders || []

        const cartTotal = cartItems.reduce((total, cart) => {
            return total + (
                Number(cart?.quantity || 0) *
                Number(cart?.productId?.sellingPrice || 0)
            )
        }, 0)

        const productsText = cartItems.length
            ? cartItems.map((cart, index) => {
                return `${index + 1}. ${cart?.productId?.productName || "Produit"} | Qty: ${cart?.quantity || 1} | Prix: ${cart?.productId?.sellingPrice || 0} MAD`
            }).join("\n")
            : "Panier vide"

        const ordersText = orders.length
            ? orders.map((order, index) => {
                return `${getOrderCode(order, index)} | Total: ${order?.totalAmount || 0} MAD | Status: ${order?.paymentStatus || "pending"}`
            }).join("\n")
            : "Aucune commande"

        return `
UNIK SYSTEM - FICHE DE LIVRAISON
================================

CLIENT
------
Nom utilisateur: ${user?.name || "-"}
Email: ${user?.email || "-"}
Role: ${user?.role || "-"}

LIVRAISON
---------
Nom complet: ${delivery?.fullName || "-"}
Telephone: ${delivery?.phone || "-"}
Ville: ${delivery?.city || "-"}
Adresse: ${delivery?.address || "-"}
Mode de livraison: ${delivery?.deliveryMethod || "-"}
Note: ${delivery?.note || "-"}

PANIER ACTUEL
-------------
${productsText}

Total panier: ${cartTotal} MAD

COMMANDES
---------
${ordersText}

Date fiche: ${new Date().toLocaleString("fr-FR")}
        `.trim()
    }

    const downloadUserDeliveryFile = (item) => {
        const userName =
            item?.user?.name?.replace(/\s+/g, "-").toLowerCase() ||
            "user"

        const content = getUserDeliveryFileContent(item)

        downloadTextFile(
            `fiche-livraison-${userName}.txt`,
            content
        )
    }

    const downloadAllDeliveryFiles = () => {
        const content = filteredData.map((item, index) => {
            return `
================ FICHE ${index + 1} ================
${getUserDeliveryFileContent(item)}
            `.trim()
        }).join("\n\n")

        downloadTextFile(
            `fiches-livraison-${new Date().toISOString().slice(0, 10)}.txt`,
            content
        )
    }

    return (
        <div className='p-4'>

            <div className='mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>

                <div>
                    <h1 className='text-3xl font-black text-gray-800'>
                        Users Cart Livraison
                    </h1>

                    <p className='text-gray-500 mt-1'>
                        Utilisateurs, paniers, commandes et informations de livraison.
                    </p>
                </div>

                <button
                    type='button'
                    onClick={downloadAllDeliveryFiles}
                    disabled={filteredData.length === 0}
                    className='flex items-center justify-center gap-2 bg-red-600 hover:bg-black disabled:bg-red-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full font-bold transition-all'
                >
                    <FaDownload />
                    Télécharger toutes les fiches
                </button>

            </div>

            <div className='bg-white rounded-3xl shadow-sm border p-4 mb-6 space-y-4'>

                <div className='flex items-center gap-3 bg-slate-100 rounded-2xl px-4 py-3 border focus-within:border-red-500'>
                    <FaSearch className='text-red-600' />

                    <input
                        type='text'
                        value={searchCode}
                        onChange={(e) => setSearchCode(e.target.value)}
                        placeholder='Rechercher par code commande, nom ou email...'
                        className='w-full bg-transparent outline-none'
                    />
                </div>

                <div className='flex flex-wrap gap-3'>
                    {
                        filters.map((filter) => (
                            <button
                                key={filter.value}
                                type='button'
                                onClick={() => setActiveFilter(filter.value)}
                                className={`px-5 py-3 rounded-full font-bold transition-all ${
                                    activeFilter === filter.value
                                        ? "bg-red-600 text-white shadow-lg"
                                        : "bg-slate-100 text-gray-700 hover:bg-red-50 hover:text-red-600"
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))
                    }
                </div>

            </div>

            {loading ? (
                <div className='bg-white rounded-3xl p-8 shadow animate-pulse'>
                    Loading...
                </div>
            ) : filteredData.length === 0 ? (
                <div className='bg-white rounded-3xl p-10 text-center border shadow-sm'>
                    <FaUser className='mx-auto text-5xl text-red-600 mb-4' />
                    <h2 className='text-2xl font-black text-gray-800'>
                        Aucun utilisateur trouvé
                    </h2>
                </div>
            ) : (
                <div className='space-y-6'>
                    {filteredData.map((item) => {
                        const user = item.user
                        const delivery = item.lastDeliveryInfo
                        const cartItems = item.cartItems || []
                        const orders = item.orders || []

                        return (
                            <div
                                key={user?._id}
                                className='bg-white rounded-3xl shadow-xl border overflow-hidden'
                            >
                                <div className='bg-gradient-to-r from-red-600 to-black text-white p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

                                    <div className='flex items-center gap-4'>
                                        <div className='w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-xl'>
                                            <FaUser />
                                        </div>

                                        <div>
                                            <h2 className='text-xl font-black'>
                                                {user?.name || "User"}
                                            </h2>

                                            <p className='text-red-100 text-sm'>
                                                {user?.email}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type='button'
                                        onClick={() => downloadUserDeliveryFile(item)}
                                        className='flex items-center justify-center gap-2 bg-white text-red-600 hover:bg-black hover:text-white px-5 py-3 rounded-full font-bold transition-all'
                                    >
                                        <FaDownload />
                                        Fiche livraison
                                    </button>

                                </div>

                                <div className='grid lg:grid-cols-3 gap-6 p-5'>

                                    <div className='border rounded-2xl p-5'>
                                        <h3 className='font-black text-gray-800 mb-4 flex items-center gap-2'>
                                            <FaShoppingCart className='text-red-600' />
                                            Panier actuel
                                        </h3>

                                        {cartItems.length === 0 ? (
                                            <p className='text-gray-500'>
                                                Panier vide
                                            </p>
                                        ) : (
                                            <div className='space-y-3'>
                                                {cartItems.map((cart) => (
                                                    <div
                                                        key={cart?._id}
                                                        className='flex gap-3 border-b pb-3'
                                                    >
                                                        <img
                                                            src={cart?.productId?.productImage?.[0]}
                                                            alt={cart?.productId?.productName || "product"}
                                                            className='w-14 h-14 rounded-xl object-contain bg-slate-100'
                                                        />

                                                        <div>
                                                            <p className='font-bold text-gray-800 line-clamp-1'>
                                                                {cart?.productId?.productName}
                                                            </p>

                                                            <p className='text-sm text-gray-500'>
                                                                Qty: {cart?.quantity}
                                                            </p>

                                                            <p className='text-sm font-bold text-red-600'>
                                                                {displayCurrency(cart?.productId?.sellingPrice || 0)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className='border rounded-2xl p-5'>
                                        <h3 className='font-black text-gray-800 mb-4 flex items-center gap-2'>
                                            <FaTruck className='text-red-600' />
                                            Livraison
                                        </h3>

                                        {delivery ? (
                                            <div className='space-y-2 text-gray-600'>
                                                <p><strong>Nom:</strong> {delivery.fullName}</p>

                                                <p className='flex items-center gap-2'>
                                                    <FaPhoneAlt className='text-red-600' />
                                                    {delivery.phone}
                                                </p>

                                                <p><strong>Ville:</strong> {delivery.city}</p>

                                                <p className='flex items-start gap-2'>
                                                    <FaMapMarkerAlt className='text-red-600 mt-1' />
                                                    <span>{delivery.address}</span>
                                                </p>

                                                <p><strong>Mode:</strong> {delivery.deliveryMethod}</p>
                                                <p><strong>Note:</strong> {delivery.note || "-"}</p>
                                            </div>
                                        ) : (
                                            <p className='text-gray-500'>
                                                Aucune information de livraison
                                            </p>
                                        )}
                                    </div>

                                    <div className='border rounded-2xl p-5'>
                                        <h3 className='font-black text-gray-800 mb-4 flex items-center gap-2'>
                                            <FaBoxOpen className='text-red-600' />
                                            Commandes
                                        </h3>

                                        {orders.length === 0 ? (
                                            <p className='text-gray-500'>
                                                Aucune commande
                                            </p>
                                        ) : (
                                            <div className='space-y-3'>
                                                {orders.slice(0, 3).map((order, index) => (
                                                    <div
                                                        key={order?._id}
                                                        className='bg-slate-50 rounded-2xl p-4'
                                                    >
                                                        <p className='text-xs font-black text-red-600 mb-1'>
                                                            {getOrderCode(order, index)}
                                                        </p>

                                                        <p className='font-bold text-gray-800'>
                                                            {displayCurrency(order?.totalAmount || 0)}
                                                        </p>

                                                        <p className='text-sm text-gray-500'>
                                                            Status: {order?.paymentStatus}
                                                        </p>

                                                        <p className='text-xs text-gray-400 mt-1'>
                                                            {order?.createdAt
                                                                ? new Date(order.createdAt).toLocaleString("fr-FR")
                                                                : "-"}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

        </div>
    )
}

export default AdminUsersCartDelivery