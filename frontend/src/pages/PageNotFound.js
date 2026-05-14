import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaArrowLeft, FaHome, FaSearch } from "react-icons/fa"

const PageNotFound = () => {
    const navigate = useNavigate()

    return (
        <div className='min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10'>

            <div className='w-full max-w-3xl bg-white rounded-3xl shadow-2xl border p-8 md:p-12 text-center'>

                <div className='mx-auto w-20 h-20 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-4xl mb-6'>
                    <FaSearch />
                </div>

                <h1 className='text-7xl md:text-5xl font-black text-red-600'>
                    404
                </h1>

                <h2 className='mt-4 text-3xl md:text-3xl font-bold text-gray-800'>
                    Page introuvable
                </h2>

                <p className='mt-4 text-gray-500 text-lg max-w-xl mx-auto'>
                    La page que vous recherchez n'existe pas ou a été déplacée.
                </p>

                <div className='mt-8 flex flex-col sm:flex-row items-center justify-center gap-4'>

                    <button
                        type='button'
                        onClick={() => navigate(-1)}
                        className='w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-7 py-3 rounded-full font-semibold transition-all'
                    >
                        <FaArrowLeft />
                        Retour
                    </button>

                    <Link
                        to='/'
                        className='w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-black text-white px-7 py-3 rounded-full font-semibold transition-all'
                    >
                        <FaHome />
                        Accueil
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default PageNotFound
