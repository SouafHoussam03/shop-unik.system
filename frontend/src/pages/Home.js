/* eslint-disable no-unused-vars */
import React from 'react'

import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
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
import { Link } from 'react-router-dom'
const brandColors = {
  red: "#F5252A",
  darkGray: "#5F5D56",
  lightBg: "#F7F7F5",
  white: "#FFFFFF",
  black: "#111111",
}
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
        

        <div className='bg-[#f5f5f5] min-h-screen overflow-hidden'>

    {/* HERO SECTION */}
<section className="relative min-h-screen overflow-hidden flex items-center bg-[#F7F7F5]">
  {/* background image clair */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `
        linear-gradient(
          rgba(247,247,245,0.78),
          rgba(247,247,245,0.68)
        ),
        url("https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070&auto=format&fit=crop")
      `,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  />

  {/* accents marque */}
  <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-[#F5252A]/20 blur-3xl animate-pulse" />
  <div className="absolute bottom-16 left-10 h-64 w-64 rounded-full bg-[#5F5D56]/15 blur-3xl animate-pulse" />

  {/* grille discrète */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(95,93,86,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(95,93,86,0.08)_1px,transparent_1px)] bg-[size:64px_64px] opacity-35" />

  <div className="relative container mx-auto px-4 py-20 lg:py-32">
    <div className="max-w-4xl animate-fade-up">
      <p className="text-[#F5252A] font-bold tracking-[5px] uppercase text-sm lg:text-base mb-5">
        UNIK SYSTEM
      </p>

      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-[#5F5D56] leading-tight">
        SMART SOLUTION
        <span className="block text-[#F5252A]">
          FOR SMART COVERING
        </span>
      </h1>

      <p className="text-[#5F5D56] text-base lg:text-xl leading-8 mt-8 max-w-2xl">
        Solutions modernes pour plafonds tendus, murs décoratifs,
        acoustique, films solaires, stores et décoration premium au Maroc.
      </p>

      <div className="flex flex-col sm:flex-row gap-5 mt-10">
        <Link
          to="/Découvrir-Nos-Produits"
          className="bg-[#F5252A] hover:bg-[#d91f24] text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          Découvrir Nos Produits
        </Link>

        <Link
          to="/devis"
          className="border border-[#5F5D56]/30 hover:bg-[#5F5D56] hover:text-white text-[#5F5D56] px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-1"
        >
          Demander Un Devis
        </Link>
      </div>
    </div>
  </div>
</section>

    {/* BRANDS */}
    <section className='container mx-auto px-4 -mt-14 relative z-20'>

        <div className='bg-white rounded-[30px] shadow-[0_20px_80px_rgba(0,0,0,0.10)] p-6 lg:p-10 border border-slate-100'>

            <div className='text-center mb-10'>

                <p className='text-red-600 uppercase tracking-[4px] text-sm font-bold mb-2'>
                    UNIK SYSTEM
                </p>

                <h2 className='text-3xl lg:text-5xl font-black text-gray-900'>

                    Nos

                    <span className='text-red-600'>
                        {" "}Marques
                    </span>

                </h2>

                <div className='w-24 h-1 bg-red-600 rounded-full mx-auto mt-4'></div>

            </div>

            <CategoryList />

        </div>

    </section>

    {/* BANNER */}
    <section className='container mx-auto px-4 mt-14'>
        <BannerProduct />
    </section>

    {/* SERVICES */}
    <section className='container mx-auto px-4 mt-16'>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>

            <div className='bg-white rounded-[30px] p-7 shadow-lg border border-slate-100 hover:shadow-2xl transition-all hover:-translate-y-2 group'>

                <div className='bg-red-100 text-red-600 w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto group-hover:scale-110 transition-all'>
                    <FaTruck />
                </div>

                <h3 className='text-2xl font-black text-gray-800 mt-6 text-center'>
                    Livraison Rapide
                </h3>

                <p className='text-gray-500 text-center mt-3 leading-7'>
                    Livraison et installation partout au Maroc
                </p>

            </div>

            <div className='bg-white rounded-[30px] p-7 shadow-lg border border-slate-100 hover:shadow-2xl transition-all hover:-translate-y-2 group'>

                <div className='bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto group-hover:scale-110 transition-all'>
                    <FaShieldAlt />
                </div>

                <h3 className='text-2xl font-black text-gray-800 mt-6 text-center'>
                    Service Fiable
                </h3>

                <p className='text-gray-500 text-center mt-3 leading-7'>
                    Produits premium avec garantie professionnelle
                </p>

            </div>

            <div className='bg-white rounded-[30px] p-7 shadow-lg border border-slate-100 hover:shadow-2xl transition-all hover:-translate-y-2 group'>

                <div className='bg-blue-100 text-blue-600 w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto group-hover:scale-110 transition-all'>
                    <FaHeadset />
                </div>

                <h3 className='text-2xl font-black text-gray-800 mt-6 text-center'>
                    Support Expert
                </h3>

                <p className='text-gray-500 text-center mt-3 leading-7'>
                    Accompagnement avant et après votre projet
                </p>

            </div>

            <div className='bg-white rounded-[30px] p-7 shadow-lg border border-slate-100 hover:shadow-2xl transition-all hover:-translate-y-2 group'>

                <div className='bg-yellow-100 text-yellow-600 w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto group-hover:scale-110 transition-all'>
                    <FaCheckCircle />
                </div>

                <h3 className='text-2xl font-black text-gray-800 mt-6 text-center'>
                    Qualité Premium
                </h3>

                <p className='text-gray-500 text-center mt-3 leading-7'>
                    Matériaux haut de gamme et finitions modernes
                </p>

            </div>

        </div>

    </section>

    

    {/* VERTICAL PRODUCTS */}
    <section className='container mx-auto px-4 mt-20 space-y-20 pb-20'>

        <VerticalCardProduct
    category="ACOUSTIX"
    heading="ACOUSTIX"
/>

<VerticalCardProduct
    category="ARCHITEX"
    heading="ARCHITEX"
/>

<VerticalCardProduct
    category="ARTFLOW"
    heading="ARTFLOW"
/>

<VerticalCardProduct
    category="CLIPTEX"
    heading="CLIPTEX"
/>

<VerticalCardProduct
    category="LUMINA"
    heading="LUMINA"
/>

<VerticalCardProduct
    category="SOFTEX"
    heading="SOFTEX"
/>

<VerticalCardProduct
    category="SOLARIS"
    heading="SOLARIS"
/>

<VerticalCardProduct
    category="WALLDRES"
    heading="WALLDRES"
/>

    </section>

    <NavButton />
    <WhatsAppButton />

</div>
        </>
        
    )
}

export default Home






























// <div className='bg-slate-100 min-h-screen'>

            
            

//             <div className='container mx-auto px-4 mt-6'>

//     <div className='bg-white rounded-3xl shadow-lg p-6'>

//         {/* TITLE */}

//         <div className='mb-8 text-center'>

//             <p className='text-[#F82222] uppercase tracking-[4px] text-sm font-bold mb-2'>
//                 UNIK SYSTEM
//             </p>

//             <h2 className='text-4xl md:text-5xl font-black text-[#6E6A63]'>

//                 Nos{" "}

//                 <span className='text-[#F82222]'>
//                     Marques
//                 </span>

//             </h2>

//             <div className='w-28 h-1 bg-[#F82222] rounded-full mx-auto mt-4' />

            

//         </div>

//         <CategoryList />

//     </div>

// </div>

//             <div className='container mx-auto px-4 py-6'>
//                 <BannerProduct />
//             </div>

//             <div className='container mx-auto px-4 mt-10'>

//                 <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>

//                     <div className='bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all hover:-translate-y-1'>

//                         <div className='bg-red-100 text-red-600 p-5 rounded-full text-4xl'>
//                             <FaTruck />
//                         </div>

//                         <h3 className='text-xl font-bold text-gray-800 mt-5'>
//                             Fast Delivery
//                         </h3>

//                         <p className='text-gray-500 mt-2'>
//                             Quick delivery and installation across Morocco
//                         </p>

//                     </div>

//                     <div className='bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all hover:-translate-y-1'>

//                         <div className='bg-green-100 text-green-600 p-5 rounded-full text-4xl'>
//                             <FaShieldAlt />
//                         </div>

//                         <h3 className='text-xl font-bold text-gray-800 mt-5'>
//                             Trusted Service
//                         </h3>

//                         <p className='text-gray-500 mt-2'>
//                             Professional service with reliable support
//                         </p>

//                     </div>

//                     <div className='bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all hover:-translate-y-1'>

//                         <div className='bg-blue-100 text-blue-600 p-5 rounded-full text-4xl'>
//                             <FaHeadset />
//                         </div>

//                         <h3 className='text-xl font-bold text-gray-800 mt-5'>
//                             Expert Support
//                         </h3>

//                         <p className='text-gray-500 mt-2'>
//                             Guidance before, during and after your project
//                         </p>

//                     </div>

//                     <div className='bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all hover:-translate-y-1'>

//                         <div className='bg-yellow-100 text-yellow-600 p-5 rounded-full text-4xl'>
//                             <FaCheckCircle />
//                         </div>

//                         <h3 className='text-xl font-bold text-gray-800 mt-5'>
//                             Premium Quality
//                         </h3>

//                         <p className='text-gray-500 mt-2'>
//                             Durable materials and refined finishing
//                         </p>

//                     </div>

//                 </div>

//             </div>

//             <div className='container mx-auto px-4 mt-12 space-y-10'>

//                 <HorizontalCardProduct
//                     category="plafond-tendu"
//                     heading="Plafond Tendu"
//                 />

//                 <HorizontalCardProduct
//                     category="mur-tendu-imprimee"
//                     heading="Mur Tendu Imprimée"
//                 />

//             </div>

//             <div className='container mx-auto px-4 mt-12 space-y-12 pb-16'>

//                 <VerticalCardProduct
//                     category="lightbox"
//                     heading="Lightbox"
//                 />

//                 <VerticalCardProduct
//                     category="acoustiques"
//                     heading="Acoustiques"
//                 />

//                 <VerticalCardProduct
//                     category="toiles-acoustiques-aw"
//                     heading="Toiles Acoustiques AW"
//                 />

//                 <VerticalCardProduct
//                     category="abat-jour-acoustique"
//                     heading="Abat Jour Acoustique"
//                 />

//                 <VerticalCardProduct
//                     category="cabine-acoustique"
//                     heading="Cabine Acoustique"
//                 />

//                 <VerticalCardProduct
//                     category="tableaux-acoustique"
//                     heading="Tableaux Acoustique"
//                 />

//                 <VerticalCardProduct
//                     category="papier-peint"
//                     heading="Papier Peint"
//                 />

//                 <VerticalCardProduct
//                     category="film-solaire"
//                     heading="Film Solaire"
//                 />

//                 <VerticalCardProduct
//                     category="film-decoratif"
//                     heading="Film Décoratif"
//                 />

//                 <VerticalCardProduct
//                     category="solar-store"
//                     heading="Solar Store"
//                 />

//                 <VerticalCardProduct
//                     category="store-banne"
//                     heading="Store Banne"
//                 />

//                 <VerticalCardProduct
//                     category="voile-dombrage"
//                     heading="Voile d'Ombrage"
//                 />

//             </div>
//             <NavButton />
//             <WhatsAppButton />
//         </div>