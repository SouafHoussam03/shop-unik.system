import React, { useEffect, useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import AOS from "aos"
import "aos/dist/aos.css"
import ReCAPTCHA from "react-google-recaptcha"
import { Helmet } from "react-helmet-async"

import {
    FaBuilding,
    FaEnvelope,
    FaMapMarkerAlt,
    FaPaperPlane,
    FaPhoneAlt,
    FaUser
} from "react-icons/fa"

const SERVICE_ID = "service_5pnerir"
const TEMPLATE_ID = "template_mesv18f"
const PUBLIC_KEY = "U5WsPa3AzTs-YMmCq"
const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"

const countries = [
    "Maroc", "France", "Espagne", "Belgique", "Allemagne",
    "Italie", "Pays-Bas", "Suisse", "Canada", "États-Unis",
    "Algérie", "Tunisie", "Sénégal", "Côte d'Ivoire",
    "Émirats arabes unis", "Arabie Saoudite", "Qatar", "Autre"
]

const DevisFormFull = () => {
    const recaptchaRef = useRef(null)

    const [formData, setFormData] = useState({
        nomEntreprise: "",
        statut: "",
        prenom: "",
        nom: "",
        adresse: "",
        codePostal: "",
        pays: "Maroc",
        ville: "",
        mobile: "",
        tel: "",
        fax: "",
        email: "",
        message: ""
    })

    const [sending, setSending] = useState(false)
    const [captchaValue, setCaptchaValue] = useState(null)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    const phoneRegex = /^(?:\+212|0)[5-7]\d{8}$/

    useEffect(() => {
        AOS.init({
            duration: 900,
            once: true,
            easing: "ease-out-cubic"
        })
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const resetForm = () => {
        setFormData({
            nomEntreprise: "",
            statut: "",
            prenom: "",
            nom: "",
            adresse: "",
            codePostal: "",
            pays: "Maroc",
            ville: "",
            mobile: "",
            tel: "",
            fax: "",
            email: "",
            message: ""
        })

        setCaptchaValue(null)
        recaptchaRef.current?.reset()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!emailRegex.test(formData.email)) {
            alert("Email invalide.")
            return
        }

        if (!phoneRegex.test(formData.mobile.replace(/\s/g, ""))) {
            alert("Numéro mobile invalide. Exemple: +212671018819 ou 0671018819")
            return
        }

        if (!captchaValue) {
            alert("Veuillez confirmer que vous n'êtes pas un robot.")
            return
        }

        setSending(true)

        const templateParams = {
            ...formData,
            time: new Date().toLocaleString(),
            "g-recaptcha-response": captchaValue
        }

        try {
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams,
                PUBLIC_KEY
            )

            alert("Demande de devis envoyée avec succès.")
            resetForm()
        } catch (error) {
            console.error("Erreur EmailJS FULL :", error)
            alert(error?.text || error?.message || "Erreur lors de l'envoi.")
        } finally {
            setSending(false)
        }
    }

    return (
        <>
        <Helmet>
    <title>Demander un devis | UNIK SYSTEM</title>

    <meta
        name='description'
        content='Demandez un devis personnalisé chez UNIK SYSTEM pour vos projets de plafonds tendus, murs tendus, solutions acoustiques, films solaires, stores, lightbox et aménagements modernes au Maroc.'
    />

    <meta
        name='keywords'
        content='devis UNIK SYSTEM, devis plafond tendu Maroc, devis mur tendu, devis acoustique Maroc, devis store Maroc, devis film solaire Maroc'
    />
</Helmet>

        <section className='bg-slate-100 min-h-screen pt-24 pb-16'>

            <div className='container mx-auto px-4'>

                <div
                    className='bg-white rounded-3xl shadow-xl border overflow-hidden'
                    data-aos='zoom-in'
                >

                    <div className='grid lg:grid-cols-12'>

                        <div className='lg:col-span-4 bg-gradient-to-br from-red-600 via-red-700 to-black text-white p-8 md:p-10 flex flex-col justify-between'>

                            <div>
                                <p className='text-sm font-bold uppercase tracking-[0.25em] text-red-100'>
                                    UNIK SYSTEM
                                </p>

                                <h1 className='mt-4 text-4xl font-black leading-tight'>
                                    Demande de devis
                                </h1>

                                <p className='mt-5 text-red-50 leading-8'>
                                    Remplissez le formulaire et notre équipe vous contactera
                                    pour étudier votre projet et préparer une proposition adaptée.
                                </p>
                            </div>

                            <div className='mt-10 space-y-4 text-red-50'>
                                <p className='flex items-center gap-3'>
                                    <FaPhoneAlt />
                                    +212 6 71 01 88 19
                                </p>

                                <p className='flex items-center gap-3'>
                                    <FaEnvelope />
                                    contact@unik-system.com
                                </p>

                                <p className='flex items-center gap-3'>
                                    <FaMapMarkerAlt />
                                    Casablanca, Maroc
                                </p>
                            </div>

                        </div>

                        <div className='lg:col-span-8 p-6 md:p-10'>

                            <form onSubmit={handleSubmit} className='space-y-5'>

                                <div className='grid md:grid-cols-2 gap-5'>

                                    <div>
                                        <label className='font-bold text-gray-700'>
                                            Statut professionnel*
                                        </label>

                                        <select
                                            name='statut'
                                            value={formData.statut}
                                            onChange={handleChange}
                                            required
                                            className='w-full mt-2 px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                        >
                                            <option value=''>
                                                Sélectionnez un statut
                                            </option>
                                            <option value='Particulier'>Particulier</option>
                                            <option value='Revendeur'>Revendeur</option>
                                            <option value='Chef de projet'>Chef de projet</option>
                                            <option value='Autre'>Autre</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className='font-bold text-gray-700 flex items-center gap-2'>
                                            <FaBuilding className='text-red-600' />
                                            Nom de l'entreprise*
                                        </label>

                                        <input
                                            name='nomEntreprise'
                                            value={formData.nomEntreprise}
                                            onChange={handleChange}
                                            required
                                            placeholder="Nom de l'entreprise"
                                            className='w-full mt-2 px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                        />
                                    </div>

                                    <div>
                                        <label className='font-bold text-gray-700 flex items-center gap-2'>
                                            <FaUser className='text-red-600' />
                                            Prénom*
                                        </label>

                                        <input
                                            name='prenom'
                                            value={formData.prenom}
                                            onChange={handleChange}
                                            required
                                            placeholder='Prénom'
                                            className='w-full mt-2 px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                        />
                                    </div>

                                    <div>
                                        <label className='font-bold text-gray-700'>
                                            Nom*
                                        </label>

                                        <input
                                            name='nom'
                                            value={formData.nom}
                                            onChange={handleChange}
                                            required
                                            placeholder='Nom'
                                            className='w-full mt-2 px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                        />
                                    </div>

                                    <div>
                                        <label className='font-bold text-gray-700'>
                                            Adresse
                                        </label>

                                        <input
                                            name='adresse'
                                            value={formData.adresse}
                                            onChange={handleChange}
                                            placeholder='Adresse'
                                            className='w-full mt-2 px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                        />
                                    </div>

                                    <div>
                                        <label className='font-bold text-gray-700'>
                                            Code postal
                                        </label>

                                        <input
                                            name='codePostal'
                                            value={formData.codePostal}
                                            onChange={handleChange}
                                            placeholder='Code postal'
                                            className='w-full mt-2 px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                        />
                                    </div>

                                    <div>
                                        <label className='font-bold text-gray-700'>
                                            Pays
                                        </label>

                                        <select
                                            name='pays'
                                            value={formData.pays}
                                            onChange={handleChange}
                                            className='w-full mt-2 px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                        >
                                            {
                                                countries.map((country) => (
                                                    <option key={country} value={country}>
                                                        {country}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div>
                                        <label className='font-bold text-gray-700'>
                                            Ville
                                        </label>

                                        <input
                                            name='ville'
                                            value={formData.ville}
                                            onChange={handleChange}
                                            placeholder='Ville'
                                            className='w-full mt-2 px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                        />
                                    </div>

                                    <div>
                                        <label className='font-bold text-gray-700 flex items-center gap-2'>
                                            <FaPhoneAlt className='text-red-600' />
                                            Mobile*
                                        </label>

                                        <input
                                            name='mobile'
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            required
                                            placeholder='+212671018819'
                                            className='w-full mt-2 px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                        />
                                    </div>

                                    <div>
                                        <label className='font-bold text-gray-700'>
                                            Téléphone
                                        </label>

                                        <input
                                            name='tel'
                                            value={formData.tel}
                                            onChange={handleChange}
                                            placeholder='Téléphone'
                                            className='w-full mt-2 px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                        />
                                    </div>

                                    <div>
                                        <label className='font-bold text-gray-700'>
                                            Fax
                                        </label>

                                        <input
                                            name='fax'
                                            value={formData.fax}
                                            onChange={handleChange}
                                            placeholder='Fax'
                                            className='w-full mt-2 px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                        />
                                    </div>

                                    <div>
                                        <label className='font-bold text-gray-700 flex items-center gap-2'>
                                            <FaEnvelope className='text-red-600' />
                                            Email*
                                        </label>

                                        <input
                                            type='email'
                                            name='email'
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder='email@example.com'
                                            className='w-full mt-2 px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                        />
                                    </div>

                                    <div className='md:col-span-2'>
                                        <label className='font-bold text-gray-700'>
                                            Message*
                                        </label>

                                        <textarea
                                            name='message'
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            placeholder='Décrivez votre projet, dimensions, délai souhaité...'
                                            className='w-full mt-2 px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500 resize-none'
                                        />
                                    </div>

                                </div>

                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey={RECAPTCHA_SITE_KEY}
                                    onChange={setCaptchaValue}
                                />

                                <button
                                    type='submit'
                                    disabled={sending}
                                    className='w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-black disabled:bg-red-300 disabled:cursor-not-allowed text-white py-4 rounded-full font-black transition-all'
                                >
                                    <FaPaperPlane />
                                    {sending ? "Envoi en cours..." : "Envoyer"}
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </section>
        </>
    )
}

export default DevisFormFull
