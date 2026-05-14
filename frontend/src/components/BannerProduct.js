import React, {
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react'

// import image1 from '../assest/banner/img1.webp'
// import image2 from '../assest/banner/img2.webp'
// import image3 from '../assest/banner/img3.jpg'
// import image4 from '../assest/banner/img4.jpg'
// import image5 from '../assest/banner/img5.webp'
import image6 from '../assest/banner/img6.png'
import image7 from '../assest/banner/img7.png'
import image8 from '../assest/banner/img8.jpeg'

import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'

import {
    FaAngleLeft,
    FaAngleRight
} from "react-icons/fa6"

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const desktopImages = useMemo(() => [
        // image1,
        // image2,
        // image3,
        // image4,
        // image5,
        image6,
        image7,
        image8,
        
    ], [])

    const mobileImages = useMemo(() => [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ], [])

    const totalImages = desktopImages.length

    const nextImage = useCallback(() => {
        setCurrentImage((prev) =>
            prev === totalImages - 1 ? 0 : prev + 1
        )
    }, [totalImages])

    const previousImage = useCallback(() => {
        setCurrentImage((prev) =>
            prev === 0 ? totalImages - 1 : prev - 1
        )
    }, [totalImages])

    const goToImage = useCallback((index) => {
        setCurrentImage(index)
    }, [])

    useEffect(() => {
        if (isPaused || totalImages <= 1) return

        const interval = setInterval(() => {
            nextImage()
        }, 5000)

        return () => clearInterval(interval)
    }, [isPaused, nextImage, totalImages])

    return (
        <section className='container mx-auto px-4 my-4'>

            <div
                className='h-56 md:h-80 lg:h-[390px] w-full bg-slate-200 relative overflow-hidden  shadow-sm group'
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >

                <div className='absolute z-20 inset-0 hidden md:flex items-center pointer-events-none'>

                    <div className='flex justify-between w-full px-4 text-2xl'>

                        <button
                            type='button'
                            onClick={previousImage}
                            aria-label='Previous banner'
                            className='pointer-events-auto bg-white/90 hover:bg-white text-gray-800 shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all hover:scale-110'
                        >
                            <FaAngleLeft />
                        </button>

                        <button
                            type='button'
                            onClick={nextImage}
                            aria-label='Next banner'
                            className='pointer-events-auto bg-white/90 hover:bg-white text-gray-800 shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all hover:scale-110'
                        >
                            <FaAngleRight />
                        </button>

                    </div>

                </div>

                <div className='hidden md:flex h-full w-full overflow-hidden'>

                    {
                        desktopImages.map((imageUrl, index) => (
                            <div
                                className='w-full h-full min-w-full min-h-full transition-transform duration-700 ease-in-out'
                                key={imageUrl}
                                style={{
                                    transform: `translateX(-${currentImage * 100}%)`
                                }}
                            >
                                <img
                                    src={imageUrl}
                                    alt={`UNIK SYSTEM banner ${index + 1}`}
                                    className='w-full h-full object-cover'
                                    loading={index === 0 ? "eager" : "lazy"}
                                />
                            </div>
                        ))
                    }

                </div>

                <div className='flex md:hidden h-full w-full overflow-hidden'>

                    {
                        mobileImages.map((imageUrl, index) => (
                            <div
                                className='w-full h-full min-w-full min-h-full transition-transform duration-700 ease-in-out'
                                key={imageUrl}
                                style={{
                                    transform: `translateX(-${currentImage * 100}%)`
                                }}
                            >
                                <img
                                    src={imageUrl}
                                    alt={`UNIK SYSTEM mobile banner ${index + 1}`}
                                    className='w-full h-full object-cover'
                                    loading={index === 0 ? "eager" : "lazy"}
                                />
                            </div>
                        ))
                    }

                </div>

                <div className='absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2'>

                    {
                        desktopImages.map((_, index) => (
                            <button
                                type='button'
                                key={index}
                                onClick={() => goToImage(index)}
                                aria-label={`Go to banner ${index + 1}`}
                                className={`h-2.5 rounded-full transition-all ${
                                    currentImage === index
                                        ? "w-8 bg-red-600"
                                        : "w-2.5 bg-white/80 hover:bg-white"
                                }`}
                            />
                        ))
                    }

                </div>

            </div>

        </section>
    )
}

export default BannerProduct
