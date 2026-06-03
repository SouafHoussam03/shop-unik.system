import React from 'react'
import { Link } from 'react-router-dom'


import ACOUSTIX from './logo/ACOUSTIX.png'
import ARCHITEX from './logo/ARCHITEX.png'
import ARTFLOW from './logo/ARTFLOW.png'
import CLIPTEX from './logo/cliptex.png'
import LUMINA from './logo/lumina.png'
import SOFTEX from './logo/SOFTEX.png'
import SOLARIS from './logo/SOLARIS.png'
import WALLDRES from './logo/WALLDRES.png'

const brands = [

    {
        label: "ACOUSTIX",
        category: "ACOUSTIX",
        logo: ACOUSTIX
    },

    {
        label: "ARCHITEX",
        category: "ARCHITEX",
        logo: ARCHITEX
    },

    {
        label: "ARTFLOW",
        category: "ARTFLOW",
        logo: ARTFLOW
    },

    {
        label: "CLIPTEX",
        category: "CLIPTEX",
        logo: CLIPTEX
    },

    {
        label: "LUMINA",
        category: "LUMINA",
        logo: LUMINA
    },

    {
        label: "SOFTEX",
        category: "SOFTEX",
        logo: SOFTEX
    },

    {
        label: "SOLARIS",
        category: "SOLARIS",
        logo: SOLARIS
    },

    {
        label: "WALLDRES",
        category: "WALLDRES",
        logo: WALLDRES
    }

]

const CategoryList = () => {
    return (
        <div className='container mx-auto'>

            <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 '>

                {
                    brands.map((item) => (
                        <Link
                            key={item.category}
                            to={`/product-category?category=${item.category}`}
                            className='group p-5 flex flex-col items-center justify-center text-center transition-all'
                        >

                            <div className='w-32 h-28 flex items-center justify-center overflow-hidden shadow-sm  bg-white'>

                                <img
                                    src={item.logo}
                                    alt={item.label}
                                    className='max-w-full max-h-full object-contain p-2 group-hover:scale-110 transition-all'
                                />

                            </div>


                        </Link>
                    ))
                }

            </div>

        </div>
    )
}

export default CategoryList