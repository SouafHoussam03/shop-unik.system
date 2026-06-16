import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'

const getObjectFromList = (list) => {
    const obj = {}

    list.forEach((item) => {
        obj[item] = true
    })

    return obj
}

const CategoryProduct = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const primaryRed = '#F82222'
    const darkGray = '#6E6A63'

    const categories = useMemo(() => productCategory, [])

    const initialFilters = useMemo(() => {
        const params = new URLSearchParams(location.search)

        return {
            category: getObjectFromList(params.getAll('category')),
            subCategory: getObjectFromList(params.getAll('subCategory'))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [openFilter, setOpenFilter] = useState(false)
    const [sortBy, setSortBy] = useState('')

    const [selectCategory, setSelectCategory] = useState(initialFilters.category)
    const [selectSubCategory, setSelectSubCategory] = useState(initialFilters.subCategory)

    const filterCategoryList = useMemo(() => {
        return Object.keys(selectCategory).filter((key) => selectCategory[key])
    }, [selectCategory])

    const filterSubCategoryList = useMemo(() => {
        return Object.keys(selectSubCategory).filter((key) => selectSubCategory[key])
    }, [selectSubCategory])

    useEffect(() => {
        const params = new URLSearchParams()

        filterCategoryList.forEach((item) => {
            params.append('category', item)
        })

        filterSubCategoryList.forEach((item) => {
            params.append('subCategory', item)
        })

        const newSearch = params.toString()
        const currentSearch = location.search.replace('?', '')

        if (newSearch !== currentSearch) {
            navigate(
                newSearch ? `/product-category?${newSearch}` : '/product-category',
                { replace: true }
            )
        }
    }, [filterCategoryList, filterSubCategoryList, location.search, navigate])

    const fetchData = async () => {
        try {
            setLoading(true)

            const response = await fetch(SummaryApi.filterProduct.url, {
                method: SummaryApi.filterProduct.method,
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    category: filterCategoryList,
                    subCategory: filterSubCategoryList
                })
            })

            const dataResponse = await response.json()
            setData(dataResponse?.data || [])
        } catch (error) {
            console.log(error)
            setData([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterCategoryList, filterSubCategoryList])

    const sortedData = useMemo(() => {
        if (sortBy === 'asc') {
            return [...data].sort((a, b) => a.sellingPrice - b.sellingPrice)
        }

        if (sortBy === 'dsc') {
            return [...data].sort((a, b) => b.sellingPrice - a.sellingPrice)
        }

        return data
    }, [data, sortBy])

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target

        setSelectCategory((prev) => ({
            ...prev,
            [value]: checked
        }))
    }

    const handleSelectSubCategory = (e) => {
        const { value, checked } = e.target

        setSelectSubCategory((prev) => ({
            ...prev,
            [value]: checked
        }))
    }

    const handleResetFilter = () => {
        setSelectCategory({})
        setSelectSubCategory({})
        setSortBy('')
        setOpenFilter(false)
    }

    const activeFilterCount = filterCategoryList.length + filterSubCategoryList.length

    const FilterContent = () => (
        <>
            <div className='mb-8 flex items-center justify-between gap-4'>
                <div>
                    <h2
                        className='text-3xl font-black uppercase'
                        style={{ color: darkGray }}
                    >
                        <span style={{ color: primaryRed }}>UNIK</span> SYSTEM
                    </h2>

                    <div
                        className='mt-2 h-1 w-24 rounded-full'
                        style={{ backgroundColor: primaryRed }}
                    />
                </div>

                {activeFilterCount > 0 && (
                    <button
                        type='button'
                        onClick={handleResetFilter}
                        className='rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50'
                    >
                        Reset
                    </button>
                )}
            </div>

            <div className='mb-8'>
                <h3
                    className='mb-4 text-lg font-black uppercase'
                    style={{ color: darkGray }}
                >
                    Sort By
                </h3>

                <form className='flex flex-col gap-4'>
                    <label className='flex cursor-pointer items-center gap-3'>
                        <input
                            type='radio'
                            name='sortBy'
                            checked={sortBy === 'asc'}
                            onChange={(e) => setSortBy(e.target.value)}
                            value='asc'
                        />
                        <span>Price Low To High</span>
                    </label>

                    <label className='flex cursor-pointer items-center gap-3'>
                        <input
                            type='radio'
                            name='sortBy'
                            checked={sortBy === 'dsc'}
                            onChange={(e) => setSortBy(e.target.value)}
                            value='dsc'
                        />
                        <span>Price High To Low</span>
                    </label>
                </form>
            </div>

            <div className='space-y-8'>
                {categories.map((category) => (
                    <div key={category.value}>
                        <label
                            className='mb-4 flex cursor-pointer items-center gap-3 text-lg font-black'
                            style={{ color: darkGray }}
                        >
                            <input
                                type='checkbox'
                                value={category.value}
                                checked={Boolean(selectCategory[category.value])}
                                onChange={handleSelectCategory}
                            />
                            {category.label}
                        </label>

                        <div className='ml-6 flex flex-col gap-3'>
                            {category?.subCategories?.map((sub) => (
                                <label
                                    key={sub.value}
                                    className='flex cursor-pointer items-center gap-3 text-sm transition-all hover:text-red-600'
                                >
                                    <input
                                        type='checkbox'
                                        value={sub.value}
                                        checked={Boolean(selectSubCategory[sub.value])}
                                        onChange={handleSelectSubCategory}
                                    />
                                    {sub.label}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )

    return (
        <section className='container mx-auto px-4 py-6'>
            <div className='mb-5 lg:hidden'>
                <button
                    type='button'
                    onClick={() => setOpenFilter(true)}
                    className='flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 py-3 font-bold text-white shadow-lg'
                >
                    Filter Products
                    {activeFilterCount > 0 && (
                        <span className='rounded-full bg-white px-2 py-0.5 text-xs text-red-600'>
                            {activeFilterCount}
                        </span>
                    )}
                </button>
            </div>

            {openFilter && (
                <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden'>
                    <button
                        type='button'
                        className='absolute inset-0'
                        onClick={() => setOpenFilter(false)}
                        aria-label='Close filters'
                    />

                    <div className='absolute left-0 top-0 h-full w-[85%] overflow-y-auto bg-white p-5 shadow-2xl'>
                        <div className='mb-6 flex items-center justify-between'>
                            <h2 className='text-2xl font-black'>Filters</h2>

                            <button
                                type='button'
                                onClick={() => setOpenFilter(false)}
                                className='text-3xl font-bold'
                            >
                                ×
                            </button>
                        </div>

                        <FilterContent />
                    </div>
                </div>
            )}

            <div className='grid grid-cols-1 gap-6 lg:grid-cols-[320px,1fr]'>
                <aside className='sticky top-24 hidden h-[calc(100vh-120px)] overflow-y-auto rounded-3xl border border-gray-100 bg-white p-6 shadow-xl lg:block'>
                    <FilterContent />
                </aside>

                <div>
                    <div className='mb-6 flex items-center justify-between'>
                        <h2
                            className='text-2xl font-black'
                            style={{ color: darkGray }}
                        >
                            Search Results :
                            <span style={{ color: primaryRed }}>
                                {' '}
                                {sortedData.length}
                            </span>
                        </h2>
                    </div>

                    <div className='min-h-[calc(100vh-120px)]'>
                        <VerticalCard
                            data={sortedData}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CategoryProduct