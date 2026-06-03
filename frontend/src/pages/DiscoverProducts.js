import React from 'react'

import {
    FaArrowRight,
    FaLayerGroup,
    FaPaintRoller,
    FaLightbulb,
    FaVolumeUp,
    FaSun,
    FaBorderStyle
} from "react-icons/fa"

import { Link } from 'react-router-dom'

const categories = [

    {
        title: "Plafond Tendu",
        description:
            "Des plafonds modernes et élégants pour tous vos espaces.",
        icon: <FaLayerGroup />,
        image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop",
        category: "plafond-tendu"
    },

    {
        title: "Mur Tendu Imprimée",
        description:
            "Habillage mural premium avec impression personnalisée.",
        icon: <FaPaintRoller />,
        image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070&auto=format&fit=crop",
        category: "mur-tendu-imprimee"
    },

    {
        title: "Lightbox",
        description:
            "Solutions lumineuses design pour intérieur moderne.",
        icon: <FaLightbulb />,
        image:
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1974&auto=format&fit=crop",
        category: "lightbox"
    },

    {
        title: "Acoustiques",
        description:
            "Améliorez le confort sonore de vos espaces.",
        icon: <FaVolumeUp />,
        image:
            "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1974&auto=format&fit=crop",
        category: "acoustiques"
    },

    {
        title: "Film Solaire",
        description:
            "Protection solaire et confort thermique premium.",
        icon: <FaSun />,
        image:
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1974&auto=format&fit=crop",
        category: "film-solaire"
    },

    {
        title: "Papier Peint",
        description:
            "Décoration murale élégante et moderne.",
        icon: <FaBorderStyle />,
        image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop",
        category: "papier-peint"
    }

]

const DiscoverProducts = () => {
    return (
        <div className='min-h-screen bg-[#f5f5f5]'>

            {/* HERO */}
<section className="relative overflow-hidden bg-[#F7F7F5]">
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `
        linear-gradient(
          rgba(247,247,245,0.88),
          rgba(247,247,245,0.78)
        ),
        url("https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070&auto=format&fit=crop")
      `,
      backgroundSize: "cover",
      backgroundPosition: "center",
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
            <section className='container mx-auto px-4 py-16 lg:py-24'>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>

                    {
                        categories.map((item, index) => (

                            <Link
                                key={index}
                                to={`/product-category?category=${item.category}`}
                                className='group relative overflow-hidden rounded-[35px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-2'
                            >

                                {/* image */}
                                <div className='relative h-[320px] overflow-hidden'>

                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className='w-full h-full object-cover group-hover:scale-110 transition-all duration-700'
                                    />

                                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent'></div>

                                    {/* icon */}
                                    <div className='absolute top-6 left-6 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-3xl shadow-lg'>
                                        {item.icon}
                                    </div>

                                </div>

                                {/* content */}
                                <div className='p-8'>

                                    <h2 className='text-3xl font-black text-gray-900 group-hover:text-red-600 transition-all'>
                                        {item.title}
                                    </h2>

                                    <p className='text-gray-500 mt-4 leading-7'>
                                        {item.description}
                                    </p>

                                    <div className='mt-8 flex items-center gap-3 text-red-600 font-bold text-lg group-hover:translate-x-2 transition-all'>

                                        Découvrir

                                        <FaArrowRight />

                                    </div>

                                </div>

                            </Link>

                        ))
                    }

                </div>

            </section>

        </div>
    )
}

export default DiscoverProducts