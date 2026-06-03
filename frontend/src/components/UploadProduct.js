import React, { useMemo, useState } from "react"
import { CgClose } from "react-icons/cg"
import { FaBoxOpen, FaCloudUploadAlt, FaSearch, FaSpinner } from "react-icons/fa"
import { MdDelete } from "react-icons/md"

import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

import productCategory from "../helpers/productCategory"
import uploadImage from "../helpers/uploadImage"
import DisplayImage from "./DisplayImage"
import SummaryApi from "../common"
import { toast } from "react-toastify"

const initialForm = {
    productName: "",
    brandName: "",
    category: "",
    subCategory: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    slug: ""
}

const slugify = (value) => {
    return value
        .toString()
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
}

const UploadProduct = ({ onClose, fetchData }) => {
    const [data, setData] = useState(initialForm)
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState("")
    const [imageLoading, setImageLoading] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)

    const selectedCategory = useMemo(() => {
        return productCategory.find((cat) => cat.value === data.category)
    }, [data.category])

    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["link"],
            ["clean"]
        ]
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            const nextData = {
                ...prev,
                [name]: value
            }

            if (name === "productName" && !prev.slug) {
                nextData.slug = slugify(value)
            }

            if (name === "productName" && !prev.seoTitle) {
                nextData.seoTitle = `${value} | UNIK SYSTEM`
            }

            return nextData
        })
    }

    const handleCategoryChange = (e) => {
        const value = e.target.value

        setData((prev) => ({
            ...prev,
            category: value,
            subCategory: ""
        }))
    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files?.[0]

        if (!file) return

        if (!file.type.startsWith("image/")) {
            toast.error("Veuillez sélectionner une image valide")
            return
        }

        try {
            setImageLoading(true)

            const uploadedImage = await uploadImage(file)

            const imageUrl = uploadedImage?.secure_url || uploadedImage?.url

            if (!imageUrl) {
                toast.error("Image non reçue depuis Cloudinary")
                return
            }

            setData((prev) => ({
                ...prev,
                productImage: [...prev.productImage, imageUrl]
            }))

            toast.success("Image ajoutée avec succès")
        } catch (error) {
            toast.error("Erreur lors de l'upload de l'image")
        } finally {
            setImageLoading(false)
            e.target.value = ""
        }
    }

    const handleDeleteProductImage = (index) => {
        setData((prev) => ({
            ...prev,
            productImage: prev.productImage.filter((_, imageIndex) => imageIndex !== index)
        }))
    }

    const validateForm = () => {
        if (!data.productName.trim()) {
            toast.error("Veuillez entrer le nom du produit")
            return false
        }

        if (!data.brandName.trim()) {
            toast.error("Veuillez entrer le nom de la marque")
            return false
        }

        if (!data.category) {
            toast.error("Veuillez choisir une catégorie")
            return false
        }

        if (selectedCategory?.subCategories?.length > 0 && !data.subCategory) {
            toast.error("Veuillez choisir une sous-catégorie")
            return false
        }

        if (data.productImage.length === 0) {
            toast.error("Veuillez ajouter au moins une image")
            return false
        }

        if (Number(data.price) <= 0 || Number(data.sellingPrice) <= 0) {
            toast.error("Veuillez entrer des prix valides")
            return false
        }

        if (Number(data.sellingPrice) > Number(data.price)) {
            toast.error("Le prix de vente ne doit pas dépasser le prix original")
            return false
        }

        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        try {
            setSubmitLoading(true)

            const payload = {
                ...data,
                productName: data.productName.trim(),
                brandName: data.brandName.trim(),
                slug: data.slug.trim() || slugify(data.productName),
                seoTitle: data.seoTitle.trim() || `${data.productName.trim()} | UNIK SYSTEM`,
                price: Number(data.price),
                sellingPrice: Number(data.sellingPrice)
            }

            const response = await fetch(SummaryApi.uploadProduct.url, {
                method: SummaryApi.uploadProduct.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            const responseData = await response.json()

            if (responseData.success) {
                toast.success(responseData.message || "Produit ajouté avec succès")
                fetchData?.()
                onClose?.()
            }

            if (responseData.error) {
                toast.error(responseData.message || "Erreur lors de l'ajout du produit")
            }
        } catch (error) {
            toast.error("Une erreur est survenue")
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
            <div className="h-[92vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">

                <div className="flex items-center justify-between border-b bg-white px-6 py-5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-xl text-white shadow-md">
                            <FaBoxOpen />
                        </div>

                        <div>
                            <h2 className="text-2xl font-black text-gray-800">
                                Ajouter un produit
                            </h2>

                            <p className="text-sm text-gray-500">
                                Gestion des produits UNIK SYSTEM
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-2xl text-gray-600 transition-all hover:bg-red-600 hover:text-white"
                    >
                        <CgClose />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="h-full overflow-y-auto p-6 pb-36">
                    <div className="rounded-3xl border bg-slate-50 p-5">
                        <h3 className="mb-5 text-xl font-black text-gray-800">
                            Informations du produit
                        </h3>

                        <div className="grid gap-5 lg:grid-cols-2">
                            <InputField
                                label="Nom du produit"
                                name="productName"
                                value={data.productName}
                                onChange={handleOnChange}
                                placeholder="Ex: Plafond tendu imprimé"
                                required
                            />

                            <InputField
                                label="Marque"
                                name="brandName"
                                value={data.brandName}
                                onChange={handleOnChange}
                                placeholder="Ex: UNIK SYSTEM"
                                required
                            />

                            <div>
                                <label className="font-bold text-gray-700">
                                    Catégorie
                                </label>

                                <select
                                    required
                                    value={data.category}
                                    name="category"
                                    onChange={handleCategoryChange}
                                    className="mt-2 w-full rounded-2xl border bg-white p-4 outline-none focus:border-red-500"
                                >
                                    <option value="">Choisir une catégorie</option>

                                    {productCategory.map((item) => (
                                        <option value={item.value} key={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="font-bold text-gray-700">
                                    Sous-catégorie
                                </label>

                                <select
                                    value={data.subCategory}
                                    name="subCategory"
                                    onChange={handleOnChange}
                                    disabled={!data.category || !selectedCategory?.subCategories?.length}
                                    className="mt-2 w-full rounded-2xl border bg-white p-4 outline-none focus:border-red-500 disabled:cursor-not-allowed disabled:bg-slate-100"
                                >
                                    <option value="">Choisir une sous-catégorie</option>

                                    {selectedCategory?.subCategories?.map((sub) => (
                                        <option key={sub.value} value={sub.value}>
                                            {sub.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <InputField
                                label="Prix original"
                                type="number"
                                name="price"
                                value={data.price}
                                onChange={handleOnChange}
                                placeholder="Ex: 1200"
                                required
                            />

                            <InputField
                                label="Prix de vente"
                                type="number"
                                name="sellingPrice"
                                value={data.sellingPrice}
                                onChange={handleOnChange}
                                placeholder="Ex: 990"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-6 rounded-3xl border bg-white p-5">
                        <h3 className="mb-4 text-xl font-black text-gray-800">
                            Images du produit
                        </h3>

                        <label htmlFor="uploadImageInput">
                            <div className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-red-300 bg-red-50 p-10 text-center transition-all hover:bg-red-100">
                                <div className="text-6xl text-red-600">
                                    {imageLoading ? <FaSpinner className="animate-spin" /> : <FaCloudUploadAlt />}
                                </div>

                                <p className="mt-4 text-lg font-bold text-gray-700">
                                    {imageLoading ? "Upload en cours..." : "Cliquez pour ajouter des images"}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    JPG, PNG, WEBP acceptés
                                </p>

                                <input
                                    type="file"
                                    id="uploadImageInput"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleUploadProduct}
                                    disabled={imageLoading}
                                />
                            </div>
                        </label>

                        {data.productImage.length > 0 && (
                            <div className="mt-5 flex flex-wrap gap-4">
                                {data.productImage.map((image, index) => (
                                    <div key={image + index} className="group relative">
                                        <img
                                            src={image}
                                            alt="produit"
                                            className="h-32 w-32 cursor-pointer rounded-2xl border object-cover shadow-sm transition-all hover:scale-105"
                                            onClick={() => {
                                                setOpenFullScreenImage(true)
                                                setFullScreenImage(image)
                                            }}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => handleDeleteProductImage(index)}
                                            className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white opacity-0 shadow transition-all group-hover:opacity-100"
                                        >
                                            <MdDelete />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-6 rounded-3xl border bg-white p-5">
                        <h3 className="mb-4 text-xl font-black text-gray-800">
                            Description
                        </h3>

                        <div className="overflow-hidden rounded-2xl border focus-within:border-red-500">
                            <ReactQuill
                                theme="snow"
                                value={data.description}
                                onChange={(value) =>
                                    setData((prev) => ({
                                        ...prev,
                                        description: value
                                    }))
                                }
                                modules={quillModules}
                                placeholder="Décrivez le produit, ses avantages, ses dimensions, ses matériaux..."
                                className="min-h-[240px]"
                            />
                        </div>
                    </div>

                    <div className="mt-6 rounded-3xl border bg-slate-50 p-5">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-600 text-white">
                                <FaSearch />
                            </div>

                            <div>
                                <h3 className="text-xl font-black text-gray-800">
                                    Référencement SEO
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Optimisez l'affichage du produit sur Google.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 lg:grid-cols-2">
                            <InputField
                                label="Titre SEO"
                                name="seoTitle"
                                value={data.seoTitle}
                                onChange={handleOnChange}
                                placeholder="Ex: Plafond tendu au Maroc | UNIK SYSTEM"
                            />

                            <InputField
                                label="Slug du produit"
                                name="slug"
                                value={data.slug}
                                onChange={handleOnChange}
                                placeholder="ex: plafond-tendu-maroc"
                            />

                            <div className="lg:col-span-2">
                                <label className="font-bold text-gray-700">
                                    Description SEO
                                </label>

                                <textarea
                                    name="seoDescription"
                                    value={data.seoDescription}
                                    onChange={handleOnChange}
                                    rows={4}
                                    placeholder="Ex: Découvrez les solutions de plafond tendu UNIK SYSTEM au Maroc..."
                                    className="mt-2 w-full resize-none rounded-2xl border bg-white p-4 outline-none focus:border-red-500"
                                />
                            </div>

                            <div className="lg:col-span-2">
                                <label className="font-bold text-gray-700">
                                    Mots-clés SEO
                                </label>

                                <input
                                    type="text"
                                    name="seoKeywords"
                                    value={data.seoKeywords}
                                    onChange={handleOnChange}
                                    placeholder="plafond tendu maroc, décoration murale, unik system"
                                    className="mt-2 w-full rounded-2xl border bg-white p-4 outline-none focus:border-red-500"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={submitLoading || imageLoading}
                        className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-red-600 py-5 text-lg font-black text-white shadow-lg transition-all hover:bg-black disabled:cursor-not-allowed disabled:bg-red-300"
                    >
                        {submitLoading && <FaSpinner className="animate-spin" />}
                        {submitLoading ? "Ajout du produit..." : "Ajouter le produit"}
                    </button>
                </form>
            </div>

            {openFullScreenImage && (
                <DisplayImage
                    onClose={() => setOpenFullScreenImage(false)}
                    imgUrl={fullScreenImage}
                />
            )}
        </div>
    )
}

const InputField = ({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    required = false
}) => {
    return (
        <div>
            <label className="font-bold text-gray-700">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="mt-2 w-full rounded-2xl border bg-white p-4 outline-none focus:border-red-500"
            />
        </div>
    )
}

export default UploadProduct