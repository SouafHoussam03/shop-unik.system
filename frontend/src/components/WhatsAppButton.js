import React, { useEffect, useRef, useState } from "react"
import { FaTimes, FaWhatsapp } from "react-icons/fa"

const brand = {
  red: "#EE2D2B",
  gray: "#5F5D56",
  light: "#F7F7F5",
  white: "#FFFFFF",
  whatsapp: "#25D366",
  whatsappDark: "#1DA851",
}

const whatsappContacts = [
  {
    title: "Service Commercial",
    phoneLabel: "+212 6 00 00 00 00",
    phone: "212600000000",
    message: "Bonjour UNIK SYSTEM",
  },
  {
    title: "Support Technique",
    phoneLabel: "+212 6 11 11 11 11",
    phone: "212611111111",
    message: "Bonjour Support UNIK SYSTEM",
  },
  {
    title: "Devis & Infos",
    phoneLabel: "+212 6 22 22 22 22",
    phone: "212622222222",
    message: "Bonjour je veux un devis",
  },
]

const WhatsAppButton = () => {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
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
    <div ref={wrapperRef} className="fixed bottom-2 left-2 z-50">
      {open && (
        <div className="mb-5 w-[340px] max-w-[calc(100vw-48px)] overflow-hidden rounded-3xl border border-[#5F5D56]/10 bg-white shadow-2xl animate-fadeIn">
          <div className="relative overflow-hidden bg-[#F7F7F5] px-6 py-5">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#EE2D2B]/15 blur-2xl" />
            <div className="absolute -bottom-12 left-4 h-28 w-28 rounded-full bg-[#25D366]/20 blur-2xl" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[4px] text-[#EE2D2B]">
                  UNIK SYSTEM
                </p>

                <h2 className="mt-2 text-2xl font-black text-[#5F5D56]">
                  WhatsApp
                </h2>

                <p className="mt-1 text-sm leading-6 text-[#5F5D56]/75">
                  Choisissez le service que vous voulez contacter.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer WhatsApp popup"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-[#EE2D2B] shadow-md transition-all duration-300 hover:rotate-90 hover:bg-[#EE2D2B] hover:text-white"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 bg-white p-4">
            {whatsappContacts.map((item) => (
              <a
                key={item.phone}
                href={`https://wa.me/${item.phone}?text=${encodeURIComponent(
                  item.message
                )}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="group flex items-center gap-4 rounded-2xl border border-[#5F5D56]/10 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#25D366]/40 hover:bg-[#F7F7F5] hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/12 text-xl text-[#25D366] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#25D366] group-hover:text-white">
                  <FaWhatsapp />
                </div>

                <div>
                  <h3 className="font-black text-[#5F5D56]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-[#5F5D56]/65">
                    {item.phoneLabel}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Fermer les contacts WhatsApp" : "Ouvrir les contacts WhatsApp"}
        className="relative flex h-14 w-14 items-center justify-center rounded-full text-3xl text-white shadow-2xl transition-all duration-300 hover:scale-110"
        style={{
          background: `linear-gradient(135deg, ${brand.whatsapp}, ${brand.whatsappDark})`,
        }}
      >
        <span
          className="absolute inset-0 rounded-full opacity-30 animate-ping"
          style={{ backgroundColor: brand.whatsapp }}
        />

        <FaWhatsapp className="relative z-10" />
      </button>
    </div>
  )
}

export default WhatsAppButton