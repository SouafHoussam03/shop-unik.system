import React, { useState } from 'react'

import { CgClose } from "react-icons/cg"

import {
    FaCloudUploadAlt,
    FaBoxOpen
} from "react-icons/fa"

import { MdDelete } from "react-icons/md"

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import productCategory from '../helpers/productCategory'
import uploadImage from '../helpers/uploadImage'
import DisplayImage from './DisplayImage'
import SummaryApi from '../common'

import { toast } from 'react-toastify'

const UploadProduct = ({
    onClose,
    fetchData
}) => {

    const [data, setData] = useState({

        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: "",

        // ================= SEO =================
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
        slug: ""
    })

    const [openFullScreenImage, setOpenFullScreenImage] =
        useState(false)

    const [fullScreenImage, setFullScreenImage] =
        useState("")

    const [loading, setLoading] = useState(false)

    // ================= QUILL =================
    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['link'],
            ['clean']
        ]
    }

    // ================= HANDLE CHANGE =================
    const handleOnChange = (e) => {

        const { name, value } = e.target

        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // ================= UPLOAD IMAGE =================
    const handleUploadProduct = async (e) => {

        const file = e.target.files[0]

        if (!file) return

        setLoading(true)

        try {

            const uploadImageCloudinary =
                await uploadImage(file)

            setData((prev) => ({
                ...prev,
                productImage: [
                    ...prev.productImage,
                    uploadImageCloudinary.url
                ]
            }))

        } catch (error) {

            toast.error("Image upload failed")
        }

        setLoading(false)
    }

    // ================= DELETE IMAGE =================
    const handleDeleteProductImage = (index) => {

        const newProductImage =
            [...data.productImage]

        newProductImage.splice(index, 1)

        setData((prev) => ({
            ...prev,
            productImage: [...newProductImage]
        }))
    }

    // ================= SUBMIT =================
    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const response = await fetch(
                SummaryApi.uploadProduct.url,
                {
                    method:
                        SummaryApi.uploadProduct.method,

                    credentials: 'include',

                    headers: {
                        "content-type": "application/json"
                    },

                    body: JSON.stringify(data)
                }
            )

            const responseData =
                await response.json()

            if (responseData.success) {

                toast.success(
                    responseData?.message
                )

                onClose()

                fetchData()
            }

            if (responseData.error) {

                toast.error(
                    responseData?.message
                )
            }

        } catch (error) {

            toast.error("Something went wrong")
        }
    }

    return (

        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4'>

            <div className='bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[92vh] overflow-hidden'>

                {/* ================= HEADER ================= */}
                <div className='flex justify-between items-center px-6 py-5 border-b bg-gradient-to-r from-red-600 to-black text-white'>

                    <div className='flex items-center gap-3'>

                        <div className='bg-white/20 p-3 rounded-full text-xl'>
                            <FaBoxOpen />
                        </div>

                        <div>

                            <h2 className='text-2xl font-bold'>
                                Upload Product
                            </h2>

                            <p className='text-sm text-red-100'>
                                UNIK SYSTEM Admin Panel
                            </p>

                        </div>

                    </div>

                    <button
                        type='button'
                        onClick={onClose}
                        className='text-3xl hover:rotate-90 transition-all duration-300'
                    >
                        <CgClose />
                    </button>

                </div>

                {/* ================= FORM ================= */}
                <form
                    onSubmit={handleSubmit}
                    className='p-6 overflow-y-auto h-full pb-40'
                >

                    {/* ================= PRODUCT INFO ================= */}
                    <div className='grid lg:grid-cols-2 gap-5'>

                        {/* PRODUCT NAME */}
                        <div>

                            <label className='font-semibold text-gray-700'>
                                Product Name
                            </label>

                            <input
                                type='text'
                                placeholder='Enter product name'
                                name='productName'
                                value={data.productName}
                                onChange={handleOnChange}
                                className='w-full mt-2 p-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                required
                            />

                        </div>

                        {/* BRAND */}
                        <div>

                            <label className='font-semibold text-gray-700'>
                                Brand Name
                            </label>

                            <input
                                type='text'
                                placeholder='Enter brand name'
                                name='brandName'
                                value={data.brandName}
                                onChange={handleOnChange}
                                className='w-full mt-2 p-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                required
                            />

                        </div>

                        {/* CATEGORY */}
                        <div>

                            <label className='font-semibold text-gray-700'>
                                Category
                            </label>

                            <select
                                required
                                value={data.category}
                                name='category'
                                onChange={handleOnChange}
                                className='w-full mt-2 p-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                            >

                                <option value="">
                                    Select Category
                                </option>

                                {
                                    productCategory.map((el, index) => (

                                        <option
                                            value={el.value}
                                            key={el.value + index}
                                        >
                                            {el.label}
                                        </option>

                                    ))
                                }

                            </select>

                        </div>

                        {/* PRICE */}
                        <div>

                            <label className='font-semibold text-gray-700'>
                                Original Price
                            </label>

                            <input
                                type='number'
                                placeholder='Enter price'
                                value={data.price}
                                name='price'
                                onChange={handleOnChange}
                                className='w-full mt-2 p-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                required
                            />

                        </div>

                        {/* SELLING PRICE */}
                        <div>

                            <label className='font-semibold text-gray-700'>
                                Selling Price
                            </label>

                            <input
                                type='number'
                                placeholder='Enter selling price'
                                value={data.sellingPrice}
                                name='sellingPrice'
                                onChange={handleOnChange}
                                className='w-full mt-2 p-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                required
                            />

                        </div>

                    </div>

                    {/* ================= IMAGE UPLOAD ================= */}
                    <div className='mt-8'>

                        <label className='font-semibold text-gray-700'>
                            Product Images
                        </label>

                        <label htmlFor='uploadImageInput'>

                            <div className='mt-3 border-2 border-dashed border-red-300 rounded-3xl bg-red-50 hover:bg-red-100 transition-all p-12 flex flex-col justify-center items-center cursor-pointer'>

                                <div className='text-red-600 text-6xl'>
                                    <FaCloudUploadAlt />
                                </div>

                                <p className='mt-4 text-lg font-semibold text-gray-700'>

                                    {
                                        loading
                                            ? "Uploading..."
                                            : "Click to Upload Product Images"
                                    }

                                </p>

                                <input
                                    type='file'
                                    id='uploadImageInput'
                                    className='hidden'
                                    accept='image/*'
                                    onChange={handleUploadProduct}
                                />

                            </div>

                        </label>

                    </div>

                    {/* ================= IMAGE PREVIEW ================= */}
                    <div className='flex flex-wrap gap-4 mt-6'>

                        {
                            data?.productImage.map((el, index) => (

                                <div
                                    key={index}
                                    className='relative group'
                                >

                                    <img
                                        src={el}
                                        alt='product'
                                        className='w-32 h-32 rounded-3xl object-cover border shadow cursor-pointer hover:scale-105 transition-all duration-300'
                                        onClick={() => {

                                            setOpenFullScreenImage(true)

                                            setFullScreenImage(el)
                                        }}
                                    />

                                    <button
                                        type='button'
                                        onClick={() =>
                                            handleDeleteProductImage(index)
                                        }
                                        className='absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all'
                                    >

                                        <MdDelete />

                                    </button>

                                </div>
                            ))
                        }

                    </div>

                    {/* ================= DESCRIPTION ================= */}
                    <div className='mt-8'>

                        <label className='font-semibold text-gray-700'>
                            Product Description
                        </label>

                        <div className='mt-2 bg-white rounded-3xl border overflow-hidden focus-within:border-red-500'>

                            <ReactQuill
                                theme='snow'
                                value={data.description}
                                onChange={(value) =>
                                    setData((prev) => ({
                                        ...prev,
                                        description: value
                                    }))
                                }
                                modules={quillModules}
                                placeholder='Enter product description'
                                className='min-h-[250px]'
                            />

                        </div>

                    </div>

                    {/* ================= SEO SECTION ================= */}
                    <div className='mt-10 border-t pt-8'>

                        <div className='flex items-center gap-3 mb-6'>

                            <div className='bg-red-600 text-white p-3 rounded-2xl shadow-md text-xl'>
                                🔥
                            </div>

                            <div>

                                <h2 className='text-2xl font-bold text-gray-800'>
                                    SEO Optimization
                                </h2>

                                <p className='text-gray-500 text-sm'>
                                    Improve Google ranking for this product
                                </p>

                            </div>

                        </div>

                        <div className='grid lg:grid-cols-2 gap-5'>

                            {/* SEO TITLE */}
                            <div className='lg:col-span-2'>

                                <label className='font-semibold text-gray-700'>
                                    SEO Title
                                </label>

                                <input
                                    type='text'
                                    placeholder='Best toile tendue maroc | UNIK SYSTEM'
                                    value={data.seoTitle}
                                    name='seoTitle'
                                    onChange={handleOnChange}
                                    className='w-full mt-2 p-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                />

                            </div>

                            {/* SLUG */}
                            <div className='lg:col-span-2'>

                                <label className='font-semibold text-gray-700'>
                                    Product Slug
                                </label>

                                <input
                                    type='text'
                                    placeholder='toile-tendue-maroc'
                                    value={data.slug}
                                    name='slug'
                                    onChange={handleOnChange}
                                    className='w-full mt-2 p-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                />

                            </div>

                            {/* SEO DESCRIPTION */}
                            <div className='lg:col-span-2'>

                                <label className='font-semibold text-gray-700'>
                                    SEO Description
                                </label>

                                <textarea
                                    placeholder='Professional toile tendue maroc by UNIK SYSTEM...'
                                    value={data.seoDescription}
                                    name='seoDescription'
                                    onChange={handleOnChange}
                                    rows={5}
                                    className='w-full mt-2 p-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500 resize-none'
                                />

                            </div>

                            {/* SEO KEYWORDS */}
                            <div className='lg:col-span-2'>

                                <label className='font-semibold text-gray-700'>
                                    SEO Keywords
                                </label>

                                <input
                                    type='text'
                                    placeholder='toile tendue maroc, pergola maroc, store maroc'
                                    value={data.seoKeywords}
                                    name='seoKeywords'
                                    onChange={handleOnChange}
                                    className='w-full mt-2 p-4 rounded-2xl border bg-slate-50 outline-none focus:border-red-500'
                                />

                            </div>

                        </div>

                    </div>

                    {/* ================= BUTTON ================= */}
                    <button className='w-full mt-10 bg-red-600 hover:bg-black text-white py-5 rounded-full text-lg font-bold transition-all duration-300 hover:scale-[1.02] shadow-lg'>

                        Upload Product

                    </button>

                </form>

            </div>

            {/* ================= FULL IMAGE ================= */}
            {
                openFullScreenImage && (

                    <DisplayImage
                        onClose={() =>
                            setOpenFullScreenImage(false)
                        }
                        imgUrl={fullScreenImage}
                    />
                )
            }

        </div>
    )
}

export default UploadProduct