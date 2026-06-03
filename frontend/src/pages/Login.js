import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"

import SummaryApi from "../common"
import Context from "../context"
import { setUserDetails } from "../store/userSlice"

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const context = useContext(Context)

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!data.email.trim() || !data.password.trim()) {
            toast.error("Veuillez remplir tous les champs")
            return
        }

        try {
            setLoading(true)

            const response = await fetch(SummaryApi.signIn.url, {
                method: SummaryApi.signIn.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const result = await response.json()

            if (result.success) {
                toast.success(result.message || "Connexion réussie")
                dispatch(setUserDetails(result.data))
                context?.fetchUserDetails?.()
                context?.fetchUserAddToCart?.()
                navigate("/")
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
                        Login
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Connectez-vous à votre compte
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
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="Votre email"
                            className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:border-[#ed1c24]"
                            required
                        />
                    </div>

                    <div>
                        <label className="font-semibold text-[#5f5d58] flex items-center gap-2">
                            <FaLock className="text-[#ed1c24]" />
                            Mot de passe
                        </label>

                        <div className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 bg-white flex items-center focus-within:border-[#ed1c24]">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                placeholder="Votre mot de passe"
                                className="w-full outline-none"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="text-gray-500 hover:text-[#ed1c24]"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="text-right">
                        <Link
                            to="/forgot-password"
                            className="text-[#ed1c24] font-semibold hover:underline"
                        >
                            Mot de passe oublié ?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#ed1c24] hover:bg-[#5f5d58] disabled:bg-red-300 text-white py-3 rounded-xl font-bold transition-all"
                    >
                        {loading ? "Connexion..." : "Login"}
                    </button>

                    <p className="text-center text-gray-600">
                        Vous n'avez pas de compte ?{" "}
                        <Link
                            to="/sign-up"
                            className="text-[#ed1c24] font-bold hover:underline"
                        >
                            Create Account
                        </Link>
                    </p>

                </form>
            </div>
        </section>
    )
}

export default Login