import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
    const query = useLocation()
    const [data, setData] = useState([]) // ✔️ default array
    const [loading, setLoading] = useState(false)

    const fetchProduct = async () => {
        try {
            setLoading(true)

            const response = await fetch(
                SummaryApi.searchProduct.url + query.search
            )

            const dataResponse = await response.json()

            // ✔️ حماية من undefined
            setData(dataResponse?.data || [])

        } catch (error) {
            console.error("Fetch error:", error)
            setData([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.search]) // ✔️ مهم

    return (
        <div className='container mx-auto p-4'>

            {loading && (
                <p className='text-lg text-center'>Loading ...</p>
            )}

            <p className='text-lg font-semibold my-3'>
                Search Results : {data?.length || 0}
            </p>

            {
                data?.length === 0 && !loading && (
                    <p className='bg-white text-lg text-center p-4'>
                        No Data Found....
                    </p>
                )
            }

            {
                data?.length > 0 && !loading && (
                    <VerticalCard loading={loading} data={data} />
                )
            }

        </div>
    )
}

export default SearchProduct