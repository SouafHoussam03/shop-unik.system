import React from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"

import {
    FaCheckCircle,
    FaDraftingCompass,
    FaTools,
    FaLayerGroup,
    FaVolumeMute,
    FaShieldAlt,
    FaMapMarkerAlt,
    FaArrowRight
} from "react-icons/fa"

import Logo from "../components/Logo2"

const strengths = [
    "Solutions sur mesure pour chaque projet",
    "Finitions modernes et professionnelles",
    "Accompagnement de la conception à l'installation",
    "Matériaux sélectionnés pour la durabilité"
]

const services = [
    {
        title: "Plafonds & Murs Tendus",
        text: "Solutions décoratives modernes pour transformer les espaces intérieurs.",
        icon: FaLayerGroup
    },
    {
        title: "Solutions Acoustiques",
        text: "Confort sonore pour bureaux, restaurants, hôtels et espaces professionnels.",
        icon: FaVolumeMute
    },
    {
        title: "Films & Stores",
        text: "Films solaires, films décoratifs, stores bannes et protections solaires.",
        icon: FaShieldAlt
    },
    {
        title: "Installation Pro",
        text: "Une équipe technique pour assurer une pose propre, précise et durable.",
        icon: FaTools
    }
]

const About = () => {
    return (
        <>
            <Helmet>
                <title>Qui sommes-nous | UNIK SYSTEM</title>
                <meta
                    name='description'
                    content='UNIK SYSTEM est une entreprise marocaine spécialisée dans les solutions de revêtement, décoration, acoustique, films solaires, stores et aménagements modernes.'
                />
            </Helmet>

            <main className='bg-slate-100 min-h-screen pt-24'>

                <section className='container mx-auto px-4 py-10'>

                    <div className='bg-white rounded-3xl shadow-xl border overflow-hidden'>

                        <div className='grid lg:grid-cols-2'>

                            <div className='p-8 md:p-12 flex flex-col justify-center'>

                                <div className='mb-8'>
                                    <Logo w={300} h={120} />
                                </div>

                                <p className='text-sm font-bold uppercase tracking-[0.25em] text-red-600'>
                                    Qui sommes-nous
                                </p>

                                <h1 className='mt-4 text-4xl md:text-5xl font-black text-gray-800 leading-tight'>
                                    Smart solution for smart covering
                                </h1>

                                <p className='mt-6 text-gray-600 text-lg leading-8'>
                                    UNIK SYSTEM accompagne les particuliers, architectes,
                                    designers et professionnels dans la création d'espaces
                                    modernes, élégants et fonctionnels grâce à des solutions
                                    de revêtement, décoration, acoustique et protection solaire.
                                </p>

                                <div className='mt-8 flex flex-col sm:flex-row gap-4'>

                                    <Link
                                        to='/devis'
                                        className='flex items-center justify-center gap-2 bg-red-600 hover:bg-black text-white px-7 py-4 rounded-full font-bold transition-all'
                                    >
                                        Demander un devis
                                        <FaArrowRight />
                                    </Link>

                                    <Link
                                        to='/contact'
                                        className='flex items-center justify-center gap-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-7 py-4 rounded-full font-bold transition-all'
                                    >
                                        Nous contacter
                                    </Link>

                                </div>

                            </div>

                            <div className='bg-gradient-to-br from-red-600 via-red-700 to-gray-500 p-8 md:p-12 text-white flex flex-col justify-center'>

                                <div className='max-w-md'>

                                    <h2 className='text-3xl font-black'>
                                        Notre mission
                                    </h2>

                                    <p className='mt-5 text-red-50 leading-8'>
                                        Apporter des solutions innovantes, esthétiques et
                                        fiables pour améliorer le confort, l'identité visuelle
                                        et la qualité des espaces intérieurs et extérieurs.
                                    </p>

                                    <div className='mt-8 grid grid-cols-2 gap-4'>

                                        <div className='bg-white/10 rounded-2xl p-5'>
                                            <p className='text-3xl font-black'>
                                                Pro
                                            </p>
                                            <p className='text-sm text-red-100 mt-1'>
                                                Installation
                                            </p>
                                        </div>

                                        <div className='bg-white/10 rounded-2xl p-5'>
                                            <p className='text-3xl font-black'>
                                                HD
                                            </p>
                                            <p className='text-sm text-red-100 mt-1'>
                                                Impression
                                            </p>
                                        </div>

                                        <div className='bg-white/10 rounded-2xl p-5'>
                                            <p className='text-3xl font-black'>
                                                360
                                            </p>
                                            <p className='text-sm text-red-100 mt-1'>
                                                Accompagnement
                                            </p>
                                        </div>

                                        <div className='bg-white/10 rounded-2xl p-5'>
                                            <p className='text-3xl font-black'>
                                                MA
                                            </p>
                                            <p className='text-sm text-red-100 mt-1'>
                                                Maroc
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                <section className='container mx-auto px-4 py-8'>

                    <div className='grid lg:grid-cols-2 gap-8 items-start'>

                        <div className='bg-white rounded-3xl shadow-sm border p-8'>

                            <div className='flex items-center gap-4 mb-6'>
                                <div className='w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl'>
                                    <FaDraftingCompass />
                                </div>

                                <div>
                                    <h2 className='text-3xl font-black text-gray-800'>
                                        Notre savoir-faire
                                    </h2>

                                    <p className='text-gray-500 mt-1'>
                                        Des solutions pensées pour chaque espace.
                                    </p>
                                </div>
                            </div>

                            <p className='text-gray-600 leading-8'>
                                Nous travaillons sur des projets de décoration intérieure,
                                revêtements muraux, plafonds tendus, lightbox, acoustique,
                                films solaires, films décoratifs, stores et voiles d'ombrage.
                                Chaque solution est adaptée aux besoins du client, au style
                                de l'espace et aux contraintes techniques.
                            </p>

                        </div>

                        <div className='bg-white rounded-3xl shadow-sm border p-8'>

                            <h2 className='text-3xl font-black text-gray-800 mb-6'>
                                Pourquoi UNIK SYSTEM ?
                            </h2>

                            <div className='space-y-4'>
                                {
                                    strengths.map((item) => (
                                        <div
                                            key={item}
                                            className='flex items-start gap-3'
                                        >
                                            <FaCheckCircle className='text-red-600 mt-1 shrink-0' />

                                            <p className='text-gray-600'>
                                                {item}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>

                    </div>

                </section>

                <section className='container mx-auto px-4 py-8'>

                    <div className='text-center mb-8'>
                        <h2 className='text-3xl md:text-4xl font-black text-gray-800'>
                            Nos domaines d'expertise
                        </h2>

                        <p className='text-gray-500 mt-3'>
                            Des solutions complémentaires pour des espaces plus beaux, plus confortables et plus efficaces.
                        </p>
                    </div>

                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {
                            services.map((service) => {
                                const Icon = service.icon

                                return (
                                    <div
                                        key={service.title}
                                        className='bg-white rounded-3xl shadow-sm border p-6 hover:shadow-xl hover:-translate-y-1 transition-all'
                                    >
                                        <div className='w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-5'>
                                            <Icon />
                                        </div>

                                        <h3 className='text-xl font-black text-gray-800'>
                                            {service.title}
                                        </h3>

                                        <p className='text-gray-500 mt-3 leading-7'>
                                            {service.text}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>

                </section>

                <section className='container mx-auto px-4 py-10 pb-16'>

                    <div className='bg-white rounded-3xl shadow-xl border p-8 md:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>

                        <div>
                            <div className='flex items-center gap-3 text-red-600 font-bold mb-3'>
                                <FaMapMarkerAlt />
                                Casablanca, Maroc
                            </div>

                            <h2 className='text-3xl font-black text-gray-800'>
                                Vous avez un projet ?
                            </h2>

                            <p className='text-gray-500 mt-2'>
                                Parlons de votre espace et trouvons la solution la plus adaptée.
                            </p>
                        </div>

                        <Link
                            to='/devis'
                            className='flex items-center justify-center gap-2 bg-red-600 hover:bg-black text-white px-8 py-4 rounded-full font-bold transition-all'
                        >
                            Demander un devis
                            <FaArrowRight />
                        </Link>

                    </div>

                </section>

            </main>
        </>
    )
}

export default About
