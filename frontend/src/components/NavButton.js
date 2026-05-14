import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

import {
    FaBars,
    FaTimes,
    FaHome,
    FaEnvelope,
    FaInfoCircle,
    FaFileSignature
} from "react-icons/fa"

const brand = {
    red: "#EE2D2B",
    darkRed: "#8B0000",
    black: "#8d8d8d",
    white: "#FFFFFF"
}

const topLinks = [
    { label: "ACCUEIL", path: "/", icon: FaHome },
    { label: "QUI SOMMES-NOUS", path: "/about", icon: FaInfoCircle },
    { label: "CONTACT", path: "/contact", icon: FaEnvelope },
    { label: "DEMANDER UN DEVIS", path: "/devis", icon: FaFileSignature }
]

const productCategories = [
    { label: "Plafond Tendu", value: "plafond-tendu", image: "https://picsum.photos/300/300?random=1" },
    { label: "Mur Tendu Imprimée", value: "mur-tendu-imprimee", image: "https://picsum.photos/300/300?random=2" },
    { label: "Lightbox", value: "lightbox", image: "https://picsum.photos/300/300?random=3" },
    { label: "Acoustiques", value: "acoustiques", image: "https://picsum.photos/300/300?random=4" },
    { label: "Toiles Acoustiques AW", value: "toiles-acoustiques-aw", image: "https://picsum.photos/300/300?random=5" },
    { label: "Abat Jour Acoustique", value: "abat-jour-acoustique", image: "https://picsum.photos/300/300?random=6" },
    { label: "Cabine Acoustique", value: "cabine-acoustique", image: "https://picsum.photos/300/300?random=7" },
    { label: "Tableaux Acoustique", value: "tableaux-acoustique", image: "https://picsum.photos/300/300?random=8" },
    { label: "Papier Peint", value: "papier-peint", image: "https://picsum.photos/300/300?random=9" },
    { label: "Film Solaire", value: "film-solaire", image: "https://picsum.photos/300/300?random=10" },
    { label: "Film Décoratif", value: "film-decoratif", image: "https://picsum.photos/300/300?random=11" },
    { label: "Solar Store", value: "solar-store", image: "https://picsum.photos/300/300?random=12" },
    { label: "Store Banne", value: "store-banne", image: "https://picsum.photos/300/300?random=13" },
    { label: "Voile d'Ombrage", value: "voile-dombrage", image: "https://picsum.photos/300/300?random=14" }
]

const NavButton = () => {
    const [open, setOpen] = useState(false)

    const categoryPath = (value) => {
        return `/product-category?category=${value}`
    }

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setOpen(false)
            }
        }

        document.addEventListener("keydown", handleEscape)

        return () => {
            document.removeEventListener("keydown", handleEscape)
        }
    }, [])

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : ""

        return () => {
            document.body.style.overflow = ""
        }
    }, [open])

    return (
        <>
            <style>
                {`
                    @keyframes menuFade {
                        from { opacity: 0; transform: scale(1.03); }
                        to { opacity: 1; transform: scale(1); }
                    }

                    @keyframes slideDown {
                        from { opacity: 0; transform: translateY(-18px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    @keyframes categoryPop {
                        from { opacity: 0; transform: translateY(24px) scale(.88); }
                        to { opacity: 1; transform: translateY(0) scale(1); }
                    }

                    .unik-menu {
                        animation: menuFade .35s ease forwards;
                    }

                    .unik-link {
                        animation: slideDown .45s ease forwards;
                        opacity: 0;
                    }

                    .unik-category {
                        animation: categoryPop .45s ease forwards;
                        opacity: 0;
                    }
                `}
            </style>

            {
                open && (
                    <div
                        className='fixed inset-0 z-[999] text-white overflow-y-auto unik-menu'
                        style={{
                            background: `radial-gradient(circle at top left, ${brand.red} 0%, ${brand.darkRed} 34%, ${brand.black} 100%)`
                        }}
                    >
                        <button
                            type='button'
                            onClick={() => setOpen(false)}
                            aria-label='Close menu'
                            className='fixed top-5 left-5 z-20 h-12 w-12 flex items-center justify-center rounded-full bg-white/10 text-3xl hover:bg-white hover:text-red-600 transition-all'
                        >
                            <FaTimes />
                        </button>

                        <div className='absolute inset-0 pointer-events-none opacity-20'>
                            <div className='absolute top-20 right-20 h-40 w-40 rounded-full border border-white/40'></div>
                            <div className='absolute bottom-20 left-16 h-64 w-64 rounded-full border border-red-200/30'></div>
                        </div>

                        <div className='relative container mx-auto px-4 py-14 min-h-screen flex flex-col'>

                            <nav className='flex flex-col items-center gap-5 text-center'>
                                {
                                    topLinks.map((item, index) => {
                                        const Icon = item.icon

                                        return (
                                            <NavLink
                                                key={item.path}
                                                to={item.path}
                                                onClick={() => setOpen(false)}
                                                style={{
                                                    animationDelay: `${index * 90}ms`
                                                }}
                                                className={({ isActive }) => `
                                                    unik-link group flex items-center gap-3 uppercase tracking-wide
                                                    transition-all duration-300
                                                    ${
                                                        isActive
                                                            ? "font-black text-white scale-105"
                                                            : "font-light text-white/85 hover:text-white hover:scale-105"
                                                    }
                                                `}
                                            >
                                                <Icon className='text-sm opacity-80 group-hover:opacity-100' />

                                                <span className='text-xl md:text-2xl'>
                                                    {item.label}
                                                </span>
                                            </NavLink>
                                        )
                                    })
                                }
                            </nav>

                            <div className='mt-14 flex-1'>
                                <h2 className='text-center text-2xl md:text-3xl font-black uppercase mb-10'>
                                    Catégories Produits
                                </h2>

                                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-x-6 gap-y-10'>
                                    {
                                        productCategories.map((category, index) => (
                                            <NavLink
                                                key={category.value}
                                                to={categoryPath(category.value)}
                                                onClick={() => setOpen(false)}
                                                style={{
                                                    animationDelay: `${260 + index * 45}ms`
                                                }}
                                                className='unik-category group flex flex-col items-center text-center'
                                            >
                                                <div className='relative'>
                                                    <div className='absolute inset-0 rounded-full bg-white/30 blur-md scale-90 group-hover:scale-110 transition-all'></div>

                                                    <div className='relative w-24 h-24 md:w-28 md:h-28 rounded-full border-[4px] border-white bg-white overflow-hidden shadow-2xl group-hover:scale-110 group-hover:border-red-200 transition-all duration-300'>
                                                        <img
                                                            src={category.image}
                                                            alt={category.label}
                                                            className='w-full h-full object-cover group-hover:scale-110 transition-all duration-500'
                                                        />
                                                    </div>
                                                </div>

                                                <span className='mt-4 text-sm md:text-base font-medium text-white/90 group-hover:text-white transition-all'>
                                                    {category.label}
                                                </span>
                                            </NavLink>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            <button
                type='button'
                onClick={() => setOpen(true)}
                aria-label='Open menu'
                className='fixed top-1/2 left-3 sm:bottom-7 sm:left-3 z-50 flex h-12 w-12 items-center justify-center rounded-full text-xl text-white shadow-2xl transition-all duration-300 hover:scale-110'
                style={{
                    background: `linear-gradient(135deg, ${brand.red}, ${brand.black})`
                }}
            >
                <span
                    className='absolute inset-0 rounded-full opacity-30 animate-ping'
                    style={{ backgroundColor: brand.red }}
                />
                <FaBars className='relative z-10' />
            </button>
        </>
    )
}

export default NavButton
