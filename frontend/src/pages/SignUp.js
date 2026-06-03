import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
    FaCamera,
    FaEnvelope,
    FaEye,
    FaEyeSlash,
    FaLock,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaUser
} from "react-icons/fa"
import { toast } from "react-toastify"

import loginIcons from "../assest/signin.gif"
import imageTobase64 from "../helpers/imageTobase64"
import SummaryApi from "../common"

const SignUp = () => {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
        profilePic: ""
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleUploadPic = async (e) => {
        const file = e.target.files[0]

        if (!file) return

        const imagePic = await imageTobase64(file)

        setData((prev) => ({
            ...prev,
            profilePic: imagePic
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (
            !data.name.trim() ||
            !data.email.trim() ||
            !data.phone.trim() ||
            !data.address.trim()
        ) {
            toast.error("Veuillez remplir tous les champs")
            return
        }

        if (data.password.length < 5) {
            toast.error("Le mot de passe doit contenir au moins 5 caractères")
            return
        }

        if (data.password !== data.confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas")
            return
        }

        try {
            setLoading(true)

            const response = await fetch(SummaryApi.signUP.url, {
                method: SummaryApi.signUP.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const result = await response.json()

            if (result.success) {
                toast.success(result.message || "Compte créé avec succès")
                navigate("/login")
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
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-gray-200 overflow-hidden">

                <div className="px-8 pt-8 pb-6 text-center border-b">
                    

                    <h1 className="text-3xl font-black text-[#5f5d58] mt-6">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Créez votre compte UNIK SYSTEM
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5">

                    <div className="flex justify-center">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#ed1c24] shadow bg-white">
                            <img
                                src={data.profilePic || loginIcons}
                                alt="profile"
                                className="w-full h-full object-cover"
                            />

                            <label>
                                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white py-1.5 flex justify-center items-center gap-1 cursor-pointer text-xs">
                                    <FaCamera />
                                    Photo
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleUploadPic}
                                />
                            </label>
                        </div>
                    </div>

                    <InputField
                        icon={<FaUser />}
                        label="Nom complet"
                        name="name"
                        value={data.name}
                        onChange={handleOnChange}
                        placeholder="Votre nom complet"
                    />

                    <InputField
                        icon={<FaEnvelope />}
                        label="Email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleOnChange}
                        placeholder="Votre email"
                    />

                    <InputField
                        icon={<FaPhoneAlt />}
                        label="Téléphone"
                        type="tel"
                        name="phone"
                        value={data.phone}
                        onChange={handleOnChange}
                        placeholder="+212 6..."
                    />

                    <InputField
                        icon={<FaMapMarkerAlt />}
                        label="Adresse"
                        name="address"
                        value={data.address}
                        onChange={handleOnChange}
                        placeholder="Votre adresse complète"
                    />

                    <PasswordField
                        label="Mot de passe"
                        name="password"
                        value={data.password}
                        onChange={handleOnChange}
                        show={showPassword}
                        setShow={setShowPassword}
                    />

                    <PasswordField
                        label="Confirmer mot de passe"
                        name="confirmPassword"
                        value={data.confirmPassword}
                        onChange={handleOnChange}
                        show={showConfirmPassword}
                        setShow={setShowConfirmPassword}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#ed1c24] hover:bg-[#5f5d58] disabled:bg-red-300 text-white py-3 rounded-xl font-bold transition-all"
                    >
                        {loading ? "Création..." : "Create Account"}
                    </button>

                    <p className="text-center text-gray-600">
                        Vous avez déjà un compte ?{" "}
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

const InputField = ({
    icon,
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder
}) => {
    return (
        <div>
            <label className="font-semibold text-[#5f5d58] flex items-center gap-2">
                <span className="text-[#ed1c24]">
                    {icon}
                </span>
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:border-[#ed1c24]"
                required
            />
        </div>
    )
}

const PasswordField = ({
    label,
    name,
    value,
    onChange,
    show,
    setShow
}) => {
    return (
        <div>
            <label className="font-semibold text-[#5f5d58] flex items-center gap-2">
                <FaLock className="text-[#ed1c24]" />
                {label}
            </label>

            <div className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 bg-white flex items-center focus-within:border-[#ed1c24]">
                <input
                    type={show ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={label}
                    className="w-full outline-none"
                    required
                />

                <button
                    type="button"
                    onClick={() => setShow((prev) => !prev)}
                    className="text-gray-500 hover:text-[#ed1c24]"
                >
                    {show ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
        </div>
    )
}

export default SignUp