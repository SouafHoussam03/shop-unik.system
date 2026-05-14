import React, { useEffect, useRef, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import emailjs from "@emailjs/browser"
import ReCAPTCHA from "react-google-recaptcha"
import { Helmet } from "react-helmet-async"


import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaGlobe,
    FaClock,
    FaPaperPlane
} from "react-icons/fa"

const SERVICE_ID = "service_5pnerir"
const TEMPLATE_ID = "template_9tvt75j"
const PUBLIC_KEY = "U5WsPa3AzTs-YMmCq"

// Test key localhost فقط. ف production خاصك key ديالك من Google reCAPTCHA.
const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"

const ContactSection = () => {
    const [formData, setFormData] = useState({
        sujet: "",
        nom: "",
        email: "",
        message: ""
    })

    const [sending, setSending] = useState(false)
    const [captchaValue, setCaptchaValue] = useState(null)
    const recaptchaRef = useRef(null)

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (
            !formData.sujet.trim() ||
            !formData.nom.trim() ||
            !formData.email.trim() ||
            !formData.message.trim()
        ) {
            alert("Veuillez remplir tous les champs.")
            return
        }

        if (!captchaValue) {
            alert("Veuillez confirmer que vous n'êtes pas un robot.")
            return
        }

        setSending(true)

        const templateParams = {
            sujet: formData.sujet,
            nom: formData.nom,
            email: formData.email,
            message: formData.message,
            "g-recaptcha-response": captchaValue
        }

        try {
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams,
                PUBLIC_KEY
            )

            alert("Message envoyé avec succès.")
            setFormData({
                sujet: "",
                nom: "",
                email: "",
                message: ""
            })
            setCaptchaValue(null)
            recaptchaRef.current?.reset()
        } catch (error) {
            console.error("Erreur EmailJS :", error)
            alert("Erreur lors de l'envoi du message.")
        } finally {
            setSending(false)
        }
    }

    return (
        <>
        <Helmet>
    <title>Contact | UNIK SYSTEM</title>

    <meta
        name='description'
        content='Contactez UNIK SYSTEM au Maroc pour vos projets de revêtement, décoration, acoustique, plafonds tendus, murs tendus, films solaires, stores et solutions sur mesure.'
    />

    <meta
        name='keywords'
        content='contact UNIK SYSTEM, UNIK SYSTEM Casablanca, revêtement Maroc, décoration Maroc, plafond tendu Maroc, solutions acoustiques Maroc'
    />
        </Helmet>

        <section className='bg-slate-100 min-h-screen pt-24 pb-14'>

            <div className='container mx-auto px-4'>

                <div className='text-center mb-10' data-aos='fade-up'>
                    <p className='text-sm font-bold uppercase tracking-[0.25em] text-red-600'>
                        Contact
                    </p>

                    <h1 className='mt-3 text-4xl md:text-5xl font-black text-gray-800'>
                        Contactez UNIK SYSTEM
                    </h1>

                    <p className='mt-4 text-gray-500 max-w-2xl mx-auto'>
                        Une question, un projet ou une demande de devis ? Notre équipe vous répond rapidement.
                    </p>
                </div>

                <div className='grid lg:grid-cols-2 gap-8 items-start'>

                    <div
                        className='bg-white rounded-3xl shadow-xl border overflow-hidden'
                        data-aos='zoom-out-up'
                    >
                        <iframe
                            title='Unik System'
                            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2668.8671237084964!2d-7.499121625389491!3d33.63056913988009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2621b5904af%3A0xbb18fdcc324a572e!2sUnik%20System!5e1!3m2!1sen!2sma!4v1764590623143!5m2!1sen!2sma'
                            className='w-full h-[560px] border-0'
                            loading='lazy'
                            referrerPolicy='no-referrer-when-downgrade'
                        />
                    </div>

                    <div className='space-y-6'>

                        <div
                            className='bg-white rounded-3xl shadow-xl border p-6 md:p-8'
                            data-aos='zoom-in-right'
                        >
                            <h2 className='text-2xl font-black text-gray-800 mb-6'>
                                Envoyer un message
                            </h2>

                            <form onSubmit={handleSubmit} className='space-y-4'>

                                <input
                                    type='text'
                                    name='sujet'
                                    placeholder='Sujet'
                                    value={formData.sujet}
                                    onChange={handleChange}
                                    required
                                    className='w-full px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                />

                                <input
                                    type='text'
                                    name='nom'
                                    placeholder='Nom'
                                    value={formData.nom}
                                    onChange={handleChange}
                                    required
                                    className='w-full px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                />

                                <input
                                    type='email'
                                    name='email'
                                    placeholder='Email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className='w-full px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                />

                                <textarea
                                    name='message'
                                    placeholder='Message'
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className='w-full px-5 py-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500 resize-none'
                                />

                                <div className='overflow-hidden'>
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey={RECAPTCHA_SITE_KEY}
                                        onChange={setCaptchaValue}
                                    />
                                </div>

                                <button
                                    type='submit'
                                    disabled={sending}
                                    className='w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-black disabled:bg-red-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-full font-black transition-all'
                                >
                                    <FaPaperPlane />
                                    {sending ? "Envoi..." : "Envoyer"}
                                </button>

                            </form>
                        </div>

                        <div
                            className='bg-white rounded-3xl shadow-xl border p-6 md:p-8'
                            data-aos='zoom-in-left'
                        >
                            <h3 className='text-2xl font-black text-gray-800 mb-6'>
                                Nos coordonnées
                            </h3>

                            <div className='space-y-5 text-gray-600'>

                                <p className='flex gap-3'>
                                    <FaMapMarkerAlt className='text-red-600 mt-1 shrink-0' />
                                    <span>
                                        <strong>Adresse :</strong>
                                        <br />
                                        Route 110, Boulevard Chefchaouni - Km 12.5
                                        <br />
                                        Casablanca - 20100, Maroc
                                    </span>
                                </p>

                                <p className='flex gap-3'>
                                    <FaPhoneAlt className='text-red-600 mt-1 shrink-0' />
                                    <span>
                                        <strong>Téléphone :</strong>
                                        <br />
                                        +212 5 22 20 27 12
                                        <br />
                                        +212 6 71 01 88 19
                                        <br />
                                        +212 6 79 31 68 71
                                    </span>
                                </p>

                                <p className='flex gap-3'>
                                    <FaEnvelope className='text-red-600 mt-1 shrink-0' />
                                    <span>
                                        <strong>Email :</strong>
                                        <br />
                                        contact@unik-system.com
                                    </span>
                                </p>

                                <p className='flex gap-3'>
                                    <FaGlobe className='text-red-600 mt-1 shrink-0' />
                                    <span>
                                        <strong>Site Web :</strong>
                                        <br />
                                        <a
                                            href='https://www.unik-system.com'
                                            target='_blank'
                                            rel='noreferrer'
                                            className='text-red-600 font-semibold hover:text-black'
                                        >
                                            www.unik-system.com
                                        </a>
                                    </span>
                                </p>

                                <p className='flex gap-3'>
                                    <FaClock className='text-red-600 mt-1 shrink-0' />
                                    <span>
                                        <strong>Horaires d'ouverture :</strong>
                                        <br />
                                        Lundi - Vendredi : 08h30 à 12h30 / 14h00 à 18h30
                                        <br />
                                        Samedi matin : 09h00 à 13h00
                                    </span>
                                </p>

                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </section></>
    )
}

export default ContactSection
