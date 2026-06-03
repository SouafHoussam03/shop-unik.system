import React, { useState } from "react"
import { Link } from "react-router-dom"
import { FaEnvelope } from "react-icons/fa"
import { toast } from "react-toastify"

import SummaryApi from "../common"

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email.trim()) {
            toast.error("Veuillez entrer votre email")
            return
        }

        try {
            setLoading(true)

            const response = await fetch(SummaryApi.forgotPassword.url, {
                method: SummaryApi.forgotPassword.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    email: email.trim()
                })
            })

            const result = await response.json()

            if (result.success) {
                toast.success(result.message || "Lien envoyé avec succès")
            }

            if (result.error) {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error("Erreur serveur")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="min-h-screen bg-[#f3f4f6] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">

                <div className="px-8 pt-8 pb-6 text-center border-b">
                    

                    <h1 className="text-3xl font-black text-[#5f5d58] mt-6">
                        Forgot Password
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Entrez votre email pour recevoir le lien
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5">

                    <div>
                        <label className="font-semibold text-[#5f5d58] flex items-center gap-2">
                            <FaEnvelope className="text-[#ed1c24]" />
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Votre email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:border-[#ed1c24]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#ed1c24] hover:bg-[#5f5d58] disabled:bg-red-300 text-white py-3 rounded-xl font-bold transition-all"
                    >
                        {loading ? "Envoi..." : "Send Reset Link"}
                    </button>

                    <p className="text-center text-gray-600">
                        Retour à{" "}
                        <Link
                            to="/login"
                            className="text-[#ed1c24] font-bold hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </section>
    )
}

export default ForgotPassword