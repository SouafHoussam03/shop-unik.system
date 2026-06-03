import React, {
    useEffect,
    useMemo,
    useState
} from 'react'

import {
    useLocation,
    useNavigate
} from 'react-router-dom'

import productCategory from '../helpers/productCategory'

import VerticalCard from '../components/VerticalCard'

import SummaryApi from '../common'

const CategoryProduct = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    // MOBILE FILTER
    const [openFilter, setOpenFilter] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    // COLORS
    const primaryRed = "#F82222"
    const darkGray = "#6E6A63"

    // URL PARAMS
    const urlSearch = new URLSearchParams(location.search)

    const urlCategoryListinArray =
        urlSearch.getAll("category")

    const urlSubCategoryListinArray =
        urlSearch.getAll("subCategory")

    // CATEGORY OBJECT
    const urlCategoryListObject = {}

    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true
    })

    // SUB CATEGORY OBJECT
    const urlSubCategoryListObject = {}

    urlSubCategoryListinArray.forEach(el => {
        urlSubCategoryListObject[el] = true
    })

    const [selectCategory, setSelectCategory] =
        useState(urlCategoryListObject)

    const [selectSubCategory, setSelectSubCategory] =
        useState(urlSubCategoryListObject)

    const [filterCategoryList, setFilterCategoryList] =
        useState([])

    const [filterSubCategoryList, setFilterSubCategoryList] =
        useState([])

    const [sortBy, setSortBy] = useState("")

    // FETCH PRODUCTS
    const fetchData = async () => {

        try {

            setLoading(true)

            const response = await fetch(
                SummaryApi.filterProduct.url,
                {
                    method: SummaryApi.filterProduct.method,

                    headers: {
                        "content-type": "application/json"
                    },

                    body: JSON.stringify({
                        category: filterCategoryList,
                        subCategory: filterSubCategoryList
                    })
                }
            )

            const dataResponse = await response.json()

            setData(dataResponse?.data || [])

        } catch (error) {

            console.log(error)

        } finally {

            setLoading(false)
        }
    }

    useEffect(() => {

        fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterCategoryList, filterSubCategoryList])

    // HANDLE CATEGORY
    const handleSelectCategory = (e) => {

        const { value, checked } = e.target

        setSelectCategory((prev) => {
            return {
                ...prev,
                [value]: checked
            }
        })
    }

    // HANDLE SUB CATEGORY
    const handleSelectSubCategory = (e) => {

        const { value, checked } = e.target

        setSelectSubCategory((prev) => {
            return {
                ...prev,
                [value]: checked
            }
        })
    }

    // URL UPDATE
    useEffect(() => {

        const arrayOfCategory =
            Object.keys(selectCategory)
                .filter(key => selectCategory[key])

        const arrayOfSubCategory =
            Object.keys(selectSubCategory)
                .filter(key => selectSubCategory[key])

        setFilterCategoryList(arrayOfCategory)

        setFilterSubCategoryList(arrayOfSubCategory)

        const categoryQuery =
            arrayOfCategory.map(el =>
                `category=${el}`
            )

        const subCategoryQuery =
            arrayOfSubCategory.map(el =>
                `subCategory=${el}`
            )

        const finalQuery = [
            ...categoryQuery,
            ...subCategoryQuery
        ].join("&")

        navigate(`/product-category?${finalQuery}`)

    }, [selectCategory, selectSubCategory, navigate])

    // SORT
    const handleOnChangeSortBy = (e) => {

        const { value } = e.target

        setSortBy(value)

        if (value === 'asc') {

            setData(prev =>
                [...prev].sort(
                    (a, b) =>
                        a.sellingPrice - b.sellingPrice
                )
            )
        }

        if (value === 'dsc') {

            setData(prev =>
                [...prev].sort(
                    (a, b) =>
                        b.sellingPrice - a.sellingPrice
                )
            )
        }
    }

    // MEMOIZED CATEGORIES
    const categories = useMemo(() => {
        return productCategory
    }, [])

    return (

        <section className='container mx-auto px-4 py-6'>

            {/* MOBILE FILTER BUTTON */}

            <div className='lg:hidden mb-5'>

                <button
                    onClick={() => setOpenFilter(true)}
                    className='w-full bg-red-600 text-white py-3 rounded-2xl font-bold shadow-lg'
                >
                    Filter Products
                </button>

            </div>


            {/* MOBILE FILTER */}

            {
                openFilter && (

                    <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden'>

                        <div className='absolute left-0 top-0 h-full w-[85%] bg-white shadow-2xl overflow-y-auto p-5'>

                            {/* HEADER */}

                            <div className='flex items-center justify-between mb-6'>

                                <h2 className='text-2xl font-black'>
                                    Filters
                                </h2>

                                <button
                                    onClick={() => setOpenFilter(false)}
                                    className='text-3xl font-bold'
                                >
                                    ×
                                </button>

                            </div>


                            {/* SORT */}

                            <div className='mb-8'>

                                <h3 className='text-lg font-black uppercase mb-4'>
                                    Sort By
                                </h3>

                                <form className='flex flex-col gap-4'>

                                    <label className='flex items-center gap-3 cursor-pointer'>

                                        <input
                                            type='radio'
                                            name='sortBy'
                                            checked={sortBy === 'asc'}
                                            onChange={handleOnChangeSortBy}
                                            value={"asc"}
                                        />

                                        <span>
                                            Price Low To High
                                        </span>

                                    </label>

                                    <label className='flex items-center gap-3 cursor-pointer'>

                                        <input
                                            type='radio'
                                            name='sortBy'
                                            checked={sortBy === 'dsc'}
                                            onChange={handleOnChangeSortBy}
                                            value={"dsc"}
                                        />

                                        <span>
                                            Price High To Low
                                        </span>

                                    </label>

                                </form>

                            </div>


                            {/* CATEGORY */}

                            <div className='space-y-8'>

                                {
                                    categories.map((category) => (

                                        <div key={category.value}>

                                            <label className='flex items-center gap-3 font-black text-lg cursor-pointer mb-4'>

                                                <input
                                                    type='checkbox'
                                                    value={category.value}
                                                    checked={
                                                        selectCategory[category.value]
                                                    }
                                                    onChange={
                                                        handleSelectCategory
                                                    }
                                                />

                                                {category.label}

                                            </label>


                                            {/* SUB */}

                                            <div className='ml-6 flex flex-col gap-3'>

                                                {
                                                    category?.subCategories?.map(
                                                        (sub) => (

                                                            <label
                                                                key={sub.value}
                                                                className='flex items-center gap-3 cursor-pointer text-sm'
                                                            >

                                                                <input
                                                                    type='checkbox'
                                                                    value={sub.value}
                                                                    checked={
                                                                        selectSubCategory[sub.value]
                                                                    }
                                                                    onChange={
                                                                        handleSelectSubCategory
                                                                    }
                                                                />

                                                                {sub.label}

                                                            </label>

                                                        )
                                                    )
                                                }

                                            </div>

                                        </div>

                                    ))
                                }

                            </div>

                        </div>

                    </div>

                )
            }


            {/* MAIN LAYOUT */}

            <div className='grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-6'>


                {/* SIDEBAR DESKTOP */}

                <div className='hidden lg:block bg-white rounded-3xl shadow-xl border border-gray-100 p-6 h-[calc(100vh-120px)] overflow-y-auto sticky top-24'>

                    {/* TITLE */}

                    <div className='mb-8'>

                        <h2
                            className='text-3xl font-black uppercase'
                            style={{
                                color: darkGray
                            }}
                        >
                            <span style={{ color: primaryRed }}>
                                UNIK
                            </span>{" "}
                            SYSTEM
                        </h2>

                        <div
                            className='w-24 h-1 rounded-full mt-2'
                            style={{
                                backgroundColor: primaryRed
                            }}
                        />

                    </div>


                    {/* SORT */}

                    <div className='mb-8'>

                        <h3
                            className='text-lg font-black uppercase mb-4'
                            style={{
                                color: darkGray
                            }}
                        >
                            Sort By
                        </h3>

                        <form className='flex flex-col gap-4'>

                            <label className='flex items-center gap-3 cursor-pointer'>

                                <input
                                    type='radio'
                                    name='sortBy'
                                    checked={sortBy === 'asc'}
                                    onChange={handleOnChangeSortBy}
                                    value={"asc"}
                                />

                                <span>
                                    Price Low To High
                                </span>

                            </label>

                            <label className='flex items-center gap-3 cursor-pointer'>

                                <input
                                    type='radio'
                                    name='sortBy'
                                    checked={sortBy === 'dsc'}
                                    onChange={handleOnChangeSortBy}
                                    value={"dsc"}
                                />

                                <span>
                                    Price High To Low
                                </span>

                            </label>

                        </form>

                    </div>


                    {/* CATEGORY */}

                    <div className='space-y-8'>

                        {
                            categories.map((category) => (

                                <div key={category.value}>

                                    <label
                                        className='flex items-center gap-3 font-black text-lg cursor-pointer mb-4'
                                        style={{
                                            color: darkGray
                                        }}
                                    >

                                        <input
                                            type='checkbox'
                                            value={category.value}
                                            checked={
                                                selectCategory[category.value]
                                            }
                                            onChange={
                                                handleSelectCategory
                                            }
                                        />

                                        {category.label}

                                    </label>


                                    {/* SUB CATEGORY */}

                                    <div className='ml-6 flex flex-col gap-3'>

                                        {
                                            category?.subCategories?.map(
                                                (sub) => (

                                                    <label
                                                        key={sub.value}
                                                        className='flex items-center gap-3 cursor-pointer text-sm hover:text-red-600 transition-all'
                                                    >

                                                        <input
                                                            type='checkbox'
                                                            value={sub.value}
                                                            checked={
                                                                selectSubCategory[sub.value]
                                                            }
                                                            onChange={
                                                                handleSelectSubCategory
                                                            }
                                                        />

                                                        {sub.label}

                                                    </label>

                                                )
                                            )
                                        }

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                </div>


                {/* PRODUCTS */}

                <div>

                    <div className='flex items-center justify-between mb-6'>

                        <h2
                            className='text-2xl font-black'
                            style={{
                                color: darkGray
                            }}
                        >
                            Search Results :
                            <span
                                style={{
                                    color: primaryRed
                                }}
                            >
                                {" "} {data.length}
                            </span>
                        </h2>

                    </div>


                    <div className='min-h-[calc(100vh-120px)]'>

                        <VerticalCard
                            data={data}
                            loading={loading}
                        />

                    </div>

                </div>

            </div>

        </section>

    )
}

export default CategoryProduct