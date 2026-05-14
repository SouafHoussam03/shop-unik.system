import React from 'react'

import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import WhatsAppButton from "../components/WhatsAppButton";
import NavButton from "../components/NavButton";
import { Helmet } from "react-helmet-async"



import {
    FaShieldAlt,
    FaTruck,
    FaHeadset,
    FaCheckCircle
} from "react-icons/fa"

const Home = () => {
    return (
        <>
        <Helmet>
            <title>
                UNIK SYSTEM | Revêtements, Décoration & Solutions Acoustiques au Maroc
            </title>

            <meta
                name='description'
                content='UNIK SYSTEM est votre spécialiste au Maroc en plafonds tendus, murs tendus imprimés, lightbox, solutions acoustiques, papier peint, films solaires, stores et voiles d’ombrage.'
            />

            <meta
                name='keywords'
                content='UNIK SYSTEM, plafond tendu Maroc, mur tendu imprimé, lightbox Maroc, solutions acoustiques Maroc, papier peint Maroc, film solaire Maroc, store banne Maroc, voile d’ombrage Maroc'
            />

            <meta
                property='og:title'
                content='UNIK SYSTEM | Smart Solution for Smart Covering'
            />

            <meta
                property='og:description'
                content='Découvrez les solutions UNIK SYSTEM pour revêtements, décoration, acoustique, films solaires, stores et aménagements modernes au Maroc.'
            />

            <meta
                property='og:type'
                content='website'
            />

            <meta
                property='og:url'
                content='https://unik-system.com/'
            />

            <meta
                property='og:image'
                content='https://unik-system.com/banner.jpg'
            />

            <meta
                name='twitter:card'
                content='summary_large_image'
            />

            <meta
                name='twitter:title'
                content='UNIK SYSTEM | Revêtements & Solutions Modernes'
            />

            <meta
                name='twitter:description'
                content='Plafonds tendus, murs tendus, lightbox, acoustique, stores, films solaires et décoration moderne au Maroc.'
            />

            <meta
                name='twitter:image'
                content='https://unik-system.com/banner.jpg'
            />

            <link
                rel='canonical'
                href='https://unik-system.com/'
            />

            <script type='application/ld+json'>
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    name: "UNIK SYSTEM",
                    url: "https://unik-system.com/",
                    logo: "https://unik-system.com/logo.png",
                    description:
                        "UNIK SYSTEM est spécialisée dans les revêtements, la décoration, les solutions acoustiques, les films solaires, les stores et les aménagements modernes au Maroc.",
                    address: {
                        "@type": "PostalAddress",
                        addressLocality: "Casablanca",
                        addressCountry: "MA"
                    },
                    contactPoint: {
                        "@type": "ContactPoint",
                        telephone: "+212671018819",
                        contactType: "customer service",
                        areaServed: "MA",
                        availableLanguage: ["French", "Arabic"]
                    }
                })}
            </script>
        </Helmet>
        <div className='bg-slate-100 min-h-screen'>

            <div className='container mx-auto px-4 py-6'>
                <BannerProduct />
            </div>
            

            <div className='container mx-auto px-4 mt-6'>

                <div className='bg-white rounded-3xl shadow-lg p-6'>

                    <div className='flex justify-between items-center mb-6'>

                        <div>
                            <h2 className='text-3xl font-bold text-gray-800'>
                                Explore Categories
                            </h2>

                            <p className='text-gray-500 mt-1'>
                                Discover premium decoration and acoustic solutions from UNIK SYSTEM
                            </p>
                        </div>

                    </div>

                    <CategoryList />

                </div>

            </div>

            <div className='container mx-auto px-4 mt-10'>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>

                    <div className='bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all hover:-translate-y-1'>

                        <div className='bg-red-100 text-red-600 p-5 rounded-full text-4xl'>
                            <FaTruck />
                        </div>

                        <h3 className='text-xl font-bold text-gray-800 mt-5'>
                            Fast Delivery
                        </h3>

                        <p className='text-gray-500 mt-2'>
                            Quick delivery and installation across Morocco
                        </p>

                    </div>

                    <div className='bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all hover:-translate-y-1'>

                        <div className='bg-green-100 text-green-600 p-5 rounded-full text-4xl'>
                            <FaShieldAlt />
                        </div>

                        <h3 className='text-xl font-bold text-gray-800 mt-5'>
                            Trusted Service
                        </h3>

                        <p className='text-gray-500 mt-2'>
                            Professional service with reliable support
                        </p>

                    </div>

                    <div className='bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all hover:-translate-y-1'>

                        <div className='bg-blue-100 text-blue-600 p-5 rounded-full text-4xl'>
                            <FaHeadset />
                        </div>

                        <h3 className='text-xl font-bold text-gray-800 mt-5'>
                            Expert Support
                        </h3>

                        <p className='text-gray-500 mt-2'>
                            Guidance before, during and after your project
                        </p>

                    </div>

                    <div className='bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all hover:-translate-y-1'>

                        <div className='bg-yellow-100 text-yellow-600 p-5 rounded-full text-4xl'>
                            <FaCheckCircle />
                        </div>

                        <h3 className='text-xl font-bold text-gray-800 mt-5'>
                            Premium Quality
                        </h3>

                        <p className='text-gray-500 mt-2'>
                            Durable materials and refined finishing
                        </p>

                    </div>

                </div>

            </div>

            <div className='container mx-auto px-4 mt-12 space-y-10'>

                <HorizontalCardProduct
                    category="plafond-tendu"
                    heading="Plafond Tendu"
                />

                <HorizontalCardProduct
                    category="mur-tendu-imprimee"
                    heading="Mur Tendu Imprimée"
                />

            </div>

            <div className='container mx-auto px-4 mt-12 space-y-12 pb-16'>

                <VerticalCardProduct
                    category="lightbox"
                    heading="Lightbox"
                />

                <VerticalCardProduct
                    category="acoustiques"
                    heading="Acoustiques"
                />

                <VerticalCardProduct
                    category="toiles-acoustiques-aw"
                    heading="Toiles Acoustiques AW"
                />

                <VerticalCardProduct
                    category="abat-jour-acoustique"
                    heading="Abat Jour Acoustique"
                />

                <VerticalCardProduct
                    category="cabine-acoustique"
                    heading="Cabine Acoustique"
                />

                <VerticalCardProduct
                    category="tableaux-acoustique"
                    heading="Tableaux Acoustique"
                />

                <VerticalCardProduct
                    category="papier-peint"
                    heading="Papier Peint"
                />

                <VerticalCardProduct
                    category="film-solaire"
                    heading="Film Solaire"
                />

                <VerticalCardProduct
                    category="film-decoratif"
                    heading="Film Décoratif"
                />

                <VerticalCardProduct
                    category="solar-store"
                    heading="Solar Store"
                />

                <VerticalCardProduct
                    category="store-banne"
                    heading="Store Banne"
                />

                <VerticalCardProduct
                    category="voile-dombrage"
                    heading="Voile d'Ombrage"
                />

            </div>
            <NavButton />
            <WhatsAppButton />
        </div>
        </>
        
    )
}

export default Home
