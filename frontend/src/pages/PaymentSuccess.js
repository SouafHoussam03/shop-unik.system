import React from "react"
import { Link } from "react-router-dom"
import { FaCheckCircle, FaHome, FaShoppingBag } from "react-icons/fa"
import { Helmet } from "react-helmet-async"

const PaymentSuccess = () => {
    return (
        <>
            <Helmet>
                <title>Paiement réussi | UNIK SYSTEM</title>
            </Helmet>

            <main className='min-h-screen bg-slate-100 pt-24 pb-14 px-4 flex items-center justify-center'>

                <div className='bg-white w-full max-w-2xl rounded-3xl shadow-2xl border p-8 md:p-12 text-center'>

                    <div className='mx-auto w-24 h-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-5xl mb-6'>
                        <FaCheckCircle />
                    </div>

                    <h1 className='text-4xl md:text-5xl font-black text-gray-800'>
                        Paiement réussi
                    </h1>

                    <p className='text-gray-500 text-lg mt-4'>
                        Merci pour votre commande. Votre paiement a été confirmé avec succès.
                    </p>

                    <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center'>

                        <Link
                            to='/'
                            className='flex items-center justify-center gap-2 bg-red-600 hover:bg-black text-white px-7 py-4 rounded-full font-bold transition-all'
                        >
                            <FaHome />
                            Accueil
                        </Link>

                        <Link
                            to='/profile'
                            className='flex items-center justify-center gap-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-7 py-4 rounded-full font-bold transition-all'
                        >
                            <FaShoppingBag />
                            Mon compte
                        </Link>

                    </div>

                </div>

            </main>
        </>
    )
}

export default PaymentSuccess