import React, { useEffect, useRef, useState } from "react"
import { FaTimes, FaWhatsapp } from "react-icons/fa"

const whatsappContacts = [
    {
        title: "Service Commercial",
        phoneLabel: "+212 6 00 00 00 00",
        phone: "212600000000",
        message: "Bonjour UNIK SYSTEM"
    },
    {
        title: "Support Technique",
        phoneLabel: "+212 6 11 11 11 11",
        phone: "212611111111",
        message: "Bonjour Support UNIK SYSTEM"
    },
    {
        title: "Devis & Infos",
        phoneLabel: "+212 6 22 22 22 22",
        phone: "212622222222",
        message: "Bonjour je veux un devis"
    }
]

const WhatsAppButton = () => {
    const [open, setOpen] = useState(false)
    const wrapperRef = useRef(null)

    useEffect(() => {
        if (!open) return

        const handleClickOutside = (event) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setOpen(false)
            }
        }

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("keydown", handleEscape)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleEscape)
        }
    }, [open])

    return (
        <div
            ref={wrapperRef}
            className='fixed bottom-6 left-3 z-50'
        >
            {
                open && (
                    <div className='mb-5 w-[320px] max-w-[calc(100vw-48px)] bg-white rounded-[30px] shadow-2xl overflow-hidden animate-fadeIn border'>

                        <div className='bg-green-500 text-white px-6 py-5 flex items-start justify-between gap-4'>

                            <div>
                                <h2 className='text-2xl font-bold'>
                                    WhatsApp
                                </h2>

                                <p className='text-sm text-green-50 mt-1 leading-6'>
                                    Comment pouvons-nous vous aider ?
                                </p>
                            </div>

                            <button
                                type='button'
                                onClick={() => setOpen(false)}
                                aria-label='Close WhatsApp popup'
                                className='text-2xl hover:rotate-90 transition-all duration-300 mt-1'
                            >
                                <FaTimes />
                            </button>

                        </div>

                        <div className='p-5 flex flex-col gap-4'>

                            {
                                whatsappContacts.map((item) => (
                                    <a
                                        key={item.phone}
                                        href={`https://wa.me/${item.phone}?text=${encodeURIComponent(item.message)}`}
                                        target='_blank'
                                        rel='noreferrer'
                                        onClick={() => setOpen(false)}
                                        className='flex items-center gap-4 p-4 rounded-2xl hover:bg-green-50 transition-all duration-300 group border'
                                    >
                                        <div className='bg-green-100 text-green-600 p-3 rounded-full text-xl group-hover:scale-110 transition-all duration-300'>
                                            <FaWhatsapp />
                                        </div>

                                        <div>
                                            <h3 className='font-bold text-gray-800'>
                                                {item.title}
                                            </h3>

                                            <p className='text-sm text-gray-500'>
                                                {item.phoneLabel}
                                            </p>
                                        </div>
                                    </a>
                                ))
                            }

                        </div>

                    </div>
                )
            }

            <button
                type='button'
                onClick={() => setOpen((prev) => !prev)}
                aria-label={open ? "Close WhatsApp contacts" : "Open WhatsApp contacts"}
                className='w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white text-3xl flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110'
            >
                <FaWhatsapp />
            </button>
        </div>
    )
}

export default WhatsAppButton
