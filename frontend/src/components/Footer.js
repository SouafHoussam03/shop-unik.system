import React from "react"
import { Link } from "react-router-dom"

import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaInstagram,
    FaYoutube,
    FaLinkedinIn,
    FaTwitter,
    FaClock
} from "react-icons/fa"

const socialLinks = [
    {
        label: "Twitter",
        href: "https://x.com/uniksystem?lang=ar",
        icon: FaTwitter
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/uniksystem/",
        icon: FaInstagram
    },
    {
        label: "YouTube",
        href: "https://www.youtube.com/@UnikSystemMaroc",
        icon: FaYoutube
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/unik-system/posts/?feedView=all",
        icon: FaLinkedinIn
    }
]

const quickLinks = [
    {
        label: "ACCUEIL",
        path: "/"
    },
    {
        label: "QUI SOMMES-NOUS",
        path: "/about"
    },
    {
        label: "DEVIS",
        path: "/devis"
    },
    {
      label: "CONTACT",
        path: "/contact"
    }
]

const Footer = () => {
    return (
        <footer className='bg-[#111827] text-white mt-12'>

            <div className='container mx-auto px-4 py-12'>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10'>

                    <div className='lg:col-span-5'>

                        <h4 className='text-2xl font-bold mb-6'>
                            Notre bureau
                        </h4>

                        <div className='space-y-4 text-slate-300'>

                            <p className='flex items-start gap-3'>
                                <FaMapMarkerAlt className='text-red-600 mt-1 shrink-0' />
                                <span>
                                    Route 110, Boulevard Chefchaouni - Km 12.5
                                    <br />
                                    Casablanca - 20100, Maroc
                                </span>
                            </p>

                            <p className='flex items-start gap-3'>
                                <FaPhoneAlt className='text-red-600 mt-1 shrink-0' />
                                <span>
                                    +212 (0) 522 202 712 / +212 (0) 6 71 01 88 19
                                    <br />
                                    +212 (0) 6 79 31 68 71
                                </span>
                            </p>

                            <p className='flex items-center gap-3'>
                                <FaEnvelope className='text-red-600 shrink-0' />
                                <a
                                    href='mailto:contact@unik-system.com'
                                    className='hover:text-red-500 transition-all'
                                >
                                    contact@unik-system.com
                                </a>
                            </p>

                        </div>

                        <div className='flex items-center gap-3 mt-7'>
                            {
                                socialLinks.map((item) => {
                                    const Icon = item.icon

                                    return (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            aria-label={item.label}
                                            className='w-11 h-11 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all'
                                        >
                                            <Icon />
                                        </a>
                                    )
                                })
                            }
                        </div>

                    </div>

                    <div className='lg:col-span-3'>

                        <h4 className='text-2xl font-bold mb-6'>
                            Liens rapides
                        </h4>

                        <div className='flex flex-col gap-3'>
                            {
                                quickLinks.map((item) => (
                                    <Link
                                        key={item.label}
                                        to={item.path}
                                        className='text-slate-300 hover:text-red-500 transition-all w-fit'
                                    >
                                        {item.label}
                                    </Link>
                                ))
                            }
                        </div>

                    </div>

                    <div className='lg:col-span-4'>

                        <h4 className='text-2xl font-bold mb-6'>
                            Heures d'ouverture
                        </h4>

                        <div className='space-y-4 text-slate-300'>

                            <div className='flex items-start gap-3'>
                                <FaClock className='text-red-600 mt-1 shrink-0' />

                                <div>
                                    <p className='mb-1'>
                                        Du lundi au vendredi
                                    </p>

                                    <h6 className='text-white font-semibold'>
                                        08h30 - 12h30 et 14h30 - 18h30
                                    </h6>
                                </div>
                            </div>

                            <div>
                                <p className='mb-1'>
                                    Samedi
                                </p>

                                <h6 className='text-white font-semibold'>
                                    08h30 - 12h30
                                </h6>
                            </div>

                            <div>
                                <p className='mb-1'>
                                    Dimanche
                                </p>

                                <h6 className='text-white font-semibold'>
                                    Fermée
                                </h6>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className='border-t border-white/10 bg-black py-5'>

                <div className='container mx-auto px-4 text-center text-slate-300'>

                    &copy;{" "}
                    <Link
                        to='/'
                        className='font-semibold text-red-600 hover:text-red-500 transition-all'
                    >
                        UNIK SYSTEM
                    </Link>
                    , Tous droits réservés.

                </div>

            </div>

        </footer>
    )
}

export default Footer
