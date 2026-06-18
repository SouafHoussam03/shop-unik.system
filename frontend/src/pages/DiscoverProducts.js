import React from 'react'

import {
    FaArrowRight,
    FaBorderStyle,
    FaLayerGroup,
    FaLightbulb,
    FaPaintRoller,
    FaShieldAlt,
    FaSun,
    FaVolumeUp,
    FaWindowMaximize
} from "react-icons/fa"

import { Link } from 'react-router-dom'

const products = [
    {
        brand: "ACOUSTIX",
        title: "Solutions Acoustiques",
        description: "Confort sonore premium pour bureaux, maisons, hotels et espaces professionnels.",
        icon: <FaVolumeUp />,
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070&auto=format&fit=crop",
        category: "acoustiques",
        badge: "Audio comfort"
    },
    {
        brand: "ARCHITEX",
        title: "Plafond Tendu",
        description: "Finition moderne, elegante et durable pour transformer vos interieurs.",
        icon: <FaLayerGroup />,
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
        category: "ARCHITEX",
        badge: "Best seller"
    },
    {
        brand: "ARTFLOW",
        title: "Mur Tendu Imprime",
        description: "Decoration murale personnalisee avec rendu haut de gamme et visuel unique.",
        icon: <FaPaintRoller />,
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
        category: "ARTFLOW",
        badge: "Custom print"
    },
    {
        brand: "CLIPTEX",
        title: "Systemes de Fixation",
        description: "Profils et solutions techniques pour une pose propre, solide et precise.",
        icon: <FaShieldAlt />,
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1931&auto=format&fit=crop",
        category: "CLIPTEX",
        badge: "Technique"
    },
    {
        brand: "LUMINA",
        title: "Lightbox",
        description: "Eclairage decoratif et professionnel pour donner de la profondeur a vos espaces.",
        icon: <FaLightbulb />,
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1974&auto=format&fit=crop",
        category: "LUMINA",
        badge: "LED design"
    },
    {
        brand: "SOFTEX",
        title: "Stores et Tissus",
        description: "Solutions souples, elegantes et pratiques pour l'habillage des ouvertures.",
        icon: <FaWindowMaximize />,
        image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=1932&auto=format&fit=crop",
        category: "SOFTEX",
        badge: "Soft finish"
    },
    {
        brand: "SOLARIS",
        title: "Film Solaire",
        description: "Protection solaire, confort thermique et discretion pour vitrages modernes.",
        icon: <FaSun />,
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1974&auto=format&fit=crop",
        category: "SOLARIS",
        badge: "UV control"
    },
    {
        brand: "WALLDRESS",
        title: "Papier Peint",
        description: "Revêtement mural premium pour une finition decorative propre et expressive.",
        icon: <FaBorderStyle />,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop",
        category: "WALLDRESS",
        badge: "Wall design"
    }
]
const DiscoverProducts = () => {
    return (
        <div className='min-h-screen bg-[#f5f5f5]'>

            {/* HERO */}
<section className="relative overflow-hidden bg-[#F7F7F5]">
  <div
                    className='absolute inset-0 opacity-20'
                    style={{
                        backgroundImage: `url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                />

  <div className="absolute top-16 right-10 h-72 w-72 rounded-full bg-[#F5252A]/20 blur-3xl animate-pulse" />
  <div className="absolute bottom-10 left-10 h-64 w-64 rounded-full bg-[#5F5D56]/15 blur-3xl animate-pulse" />

  <div className="relative container mx-auto px-4 py-24 lg:py-36 text-center animate-fade-up">
    <p className="text-[#F5252A] uppercase tracking-[5px] font-bold mb-5">
      UNIK SYSTEM
    </p>

    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-[#5F5D56] leading-tight">
      Découvrez Nos
      <span className="block text-[#F5252A]">
        Produits Premium
      </span>
    </h1>

    <p className="text-[#5F5D56] text-base lg:text-xl leading-8 mt-8 max-w-3xl mx-auto">
      Explorez nos solutions modernes pour plafonds, murs décoratifs,
      acoustique, films solaires, stores et aménagements haut de gamme.
    </p>
  </div>
  
</section>

            {/* CATEGORIES */}
            <section className='container mx-auto px-4 py-12 md:py-18 lg:py-20'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6'>
                                {products.map((item, index) => (
                                    <Link
                                        key={item.brand}
                                        to={`/product-category?category=${item.category}`}
                                        className='group bg-white rounded-[26px] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden'
                                    >
                                        <div className='relative h-56 md:h-64 overflow-hidden bg-slate-100'>
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className='w-full h-full object-cover group-hover:scale-110 transition-all duration-700'
                                            />
            
                                            <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent' />
            
                                            <div className='absolute top-4 left-4 rounded-full bg-white/95 text-red-600 px-3 py-1 text-xs font-black shadow-sm'>
                                                {String(index + 1).padStart(2, "0")}
                                            </div>
            
                                            <div className='absolute top-4 right-4 w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-white flex items-center justify-center text-xl'>
                                                {item.icon}
                                            </div>
            
                                            <div className='absolute left-5 right-5 bottom-5'>
                                                <p className='inline-flex rounded-full bg-red-600 text-white px-3 py-1 text-xs font-black tracking-wide'>
                                                    {item.badge}
                                                </p>
            
                                                <h2 className='mt-3 text-2xl font-black text-white'>
                                                    {item.brand}
                                                </h2>
                                            </div>
                                        </div>
            
                                        <div className='p-5 md:p-6'>
                                            <h3 className='text-xl md:text-2xl font-black text-slate-900 group-hover:text-red-600 transition-all'>
                                                {item.title}
                                            </h3>
            
                                            <p className='text-slate-500 mt-3 leading-7 text-sm md:text-base'>
                                                {item.description}
                                            </p>
            
                                            <div className='mt-6 flex items-center justify-between'>
                                                <span className='text-red-600 font-black'>
                                                    Decouvrir
                                                </span>
            
                                                <span className='w-10 h-10 rounded-full bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center transition-all'>
                                                    <FaArrowRight />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>

        </div>
    )
}

export default DiscoverProducts