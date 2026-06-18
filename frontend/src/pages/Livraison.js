import React, { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import emailjs from "@emailjs/browser"
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaUser,
    FaCity,
    FaTruck,
    FaStickyNote,
    FaArrowRight
} from "react-icons/fa"
import { toast } from "react-toastify"
import { Helmet } from "react-helmet-async"
import SummaryApi from "../common"

const SERVICE_ID = "service_3egpn5l"
const TEMPLATE_ID = "template_5z2v077"
const PUBLIC_KEY = "gVix_E1owp2WxeEi6"

const DELIVERY_OPTIONS = [
    {
        label: "Livraison a domicile",
        price: 50
    },
    {
        label: "Retrait au magasin",
        price: 0
    },
    {
        label: "Installation + livraison",
        price: 200
    }
]

const formatDeliveryPrice = (price) => price === 0 ? "Gratuit" : `${price} DH`

const Livraison = () => {
    const navigate = useNavigate()
    const [sending, setSending] = useState(false)

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        city: "",
        address: "",
        deliveryMethod: DELIVERY_OPTIONS[0].label,
        note: ""
    })

    const selectedDeliveryOption = useMemo(() => {
        return DELIVERY_OPTIONS.find((option) => option.label === formData.deliveryMethod) || DELIVERY_OPTIONS[0]
    }, [formData.deliveryMethod])

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const saveDeliveryToBackend = async (deliveryInfo) => {
        if (!SummaryApi.saveDeliveryInfo?.url) return

        await fetch(SummaryApi.saveDeliveryInfo.url, {
            method: SummaryApi.saveDeliveryInfo.method || "post",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                deliveryInfo
            })
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const cleanData = {
            fullName: formData.fullName.trim(),
            phone: formData.phone.trim(),
            city: formData.city.trim(),
            address: formData.address.trim(),
            deliveryMethod: formData.deliveryMethod,
            deliveryPrice: selectedDeliveryOption.price,
            deliveryPriceText: formatDeliveryPrice(selectedDeliveryOption.price),
            note: formData.note.trim()
        }

        if (
            !cleanData.fullName ||
            !cleanData.phone ||
            !cleanData.city ||
            !cleanData.address
        ) {
            toast.error("Veuillez remplir les champs obligatoires")
            return
        }

        try {
            setSending(true)

            const templateParams = {
                fullName: cleanData.fullName,
                phone: cleanData.phone,
                city: cleanData.city,
                address: cleanData.address,
                deliveryMethod: cleanData.deliveryMethod,
                deliveryPrice: cleanData.deliveryPriceText,
                note: cleanData.note || "Aucune note",
                message: `Nouvelle information de livraison pour ${cleanData.fullName}`,
                time: new Date().toLocaleString("fr-FR")
            }

            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams,
                PUBLIC_KEY
            )

            localStorage.setItem(
                "deliveryInfo",
                JSON.stringify(cleanData)
            )

            try {
                await saveDeliveryToBackend(cleanData)
            } catch (error) {
                console.warn("Delivery backend save failed:", error)
            }

            toast.success("Informations de livraison enregistrees")
            navigate("/checkout")

        } catch (error) {
            console.error("EmailJS error full:", error)

            toast.error(
                error?.text ||
                error?.message ||
                "Erreur lors de l'envoi des informations"
            )
        } finally {
            setSending(false)
        }
    }

    return (
        <>
            <Helmet>
                <title>Informations de livraison | UNIK SYSTEM</title>
                <meta
                    name='description'
                    content='Ajoutez vos informations de livraison pour finaliser votre commande UNIK SYSTEM.'
                />
            </Helmet>

            <main className='min-h-screen bg-slate-100 pt-24 pb-14 px-4'>
                <div className='container mx-auto max-w-4xl'>
                    <div className='bg-white rounded-3xl shadow-xl border overflow-hidden'>

                        <div className='bg-gradient-to-r from-red-600 to-black text-white p-8'>
                            <div className='flex items-center gap-4'>
                                <div className='w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center text-3xl'>
                                    <FaTruck />
                                </div>

                                <div>
                                    <h1 className='text-3xl md:text-4xl font-black'>
                                        Informations de livraison
                                    </h1>

                                    <p className='text-red-100 mt-2'>
                                        Remplissez vos informations pour recevoir votre commande.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className='p-6 md:p-8 space-y-6'
                        >
                            <div className='grid md:grid-cols-2 gap-5'>

                                <div>
                                    <label className='font-bold text-gray-700 flex items-center gap-2'>
                                        <FaUser className='text-red-600' />
                                        Nom complet*
                                    </label>

                                    <input
                                        type='text'
                                        name='fullName'
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder='Votre nom complet'
                                        className='w-full mt-2 px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                        required
                                    />
                                </div>

                                <div>
                                    <label className='font-bold text-gray-700 flex items-center gap-2'>
                                        <FaPhoneAlt className='text-red-600' />
                                        Telephone*
                                    </label>

                                    <input
                                        type='tel'
                                        name='phone'
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder='+212 6...'
                                        className='w-full mt-2 px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                        required
                                    />
                                </div>

                                <div>
                                    <label className='font-bold text-gray-700 flex items-center gap-2'>
                                        <FaCity className='text-red-600' />
                                        Ville*
                                    </label>

                                    <input
                                        type='text'
                                        name='city'
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder='Casablanca, Rabat...'
                                        className='w-full mt-2 px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                        required
                                    />
                                </div>

                                <div>
                                    <label className='font-bold text-gray-700 flex items-center gap-2'>
                                        <FaTruck className='text-red-600' />
                                        Mode de livraison
                                    </label>

                                    <select
                                        name='deliveryMethod'
                                        value={formData.deliveryMethod}
                                        onChange={handleChange}
                                        className='w-full mt-2 px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                    >
                                        {DELIVERY_OPTIONS.map((option) => (
                                            <option key={option.label} value={option.label}>
                                                {option.label} - {formatDeliveryPrice(option.price)}
                                            </option>
                                        ))}
                                    </select>

                                    <div className='mt-3 flex items-center justify-between rounded-2xl bg-red-50 border border-red-100 px-5 py-3'>
                                        <span className='font-bold text-gray-700'>
                                            Prix livraison
                                        </span>

                                        <span className='font-black text-red-600'>
                                            {formatDeliveryPrice(selectedDeliveryOption.price)}
                                        </span>
                                    </div>
                                </div>

                                <div className='md:col-span-2'>
                                    <label className='font-bold text-gray-700 flex items-center gap-2'>
                                        <FaMapMarkerAlt className='text-red-600' />
                                        Adresse complete*
                                    </label>

                                    <textarea
                                        name='address'
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder='Adresse, quartier, etage, numero...'
                                        rows={4}
                                        className='w-full mt-2 px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500 resize-none'
                                        required
                                    />
                                </div>

                                <div className='md:col-span-2'>
                                    <label className='font-bold text-gray-700 flex items-center gap-2'>
                                        <FaStickyNote className='text-red-600' />
                                        Note
                                    </label>

                                    <textarea
                                        name='note'
                                        value={formData.note}
                                        onChange={handleChange}
                                        placeholder='Ex: Appelez-moi avant la livraison...'
                                        rows={3}
                                        className='w-full mt-2 px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500 resize-none'
                                    />
                                </div>

                            </div>

                            <button
                                type='submit'
                                disabled={sending}
                                className='w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-black disabled:bg-red-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-full font-black transition-all'
                            >
                                {sending ? "Envoi en cours..." : "Continuer vers le paiement"}
                                <FaArrowRight />
                            </button>
                        </form>

                    </div>
                </div>
            </main>
        </>
    )
}

export default Livraison
