import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

import ACOUSTIX from "./logo/ACOUSTIX.png"
import ARCHITEX from "./logo/ARCHITEX.png"
import ARTFLOW from "./logo/ARTFLOW.png"
import CLIPTEX from "./logo/cliptex.png"
import LUMINA from "./logo/lumina.png"
import SOFTEX from "./logo/SOFTEX.png"
import SOLARIS from "./logo/SOLARIS.png"
import WALLDRES from "./logo/WALLDRES.png"

import {
  FaBars,
  FaTimes,
  FaHome,
  FaEnvelope,
  FaInfoCircle,
  FaFileSignature,
  FaArrowRight,
} from "react-icons/fa"

const brand = {
  red: "#EE2D2B",
  redDark: "#C91F1E",
  gray: "#5F5D56",
  grayDark: "#3F3E39",
  light: "#F7F7F5",
  white: "#FFFFFF",
}

const topLinks = [
  { label: "ACCUEIL", path: "/", icon: FaHome },
  { label: "QUI SOMMES-NOUS", path: "/about", icon: FaInfoCircle },
  { label: "CONTACT", path: "/contact", icon: FaEnvelope },
  { label: "DEMANDER UN DEVIS", path: "/devis", icon: FaFileSignature },
]

const productCategories = [
  { label: "ACOUSTIX", category: "solutions-acoustiques", logo: ACOUSTIX },
  { label: "ARCHITEX", category: "plafond-tendu", logo: ARCHITEX },
  { label: "ARTFLOW", category: "mur-tendu-imprime", logo: ARTFLOW },
  { label: "CLIPTEX", category: "lightbox", logo: CLIPTEX },
  { label: "LUMINA", category: "lightbox", logo: LUMINA },
  { label: "SOFTEX", category: "papier-peint", logo: SOFTEX },
  { label: "SOLARIS", category: "film-solaire", logo: SOLARIS },
  { label: "WALLDRES", category: "mur-tendu-imprime", logo: WALLDRES },
]

const NavButton = () => {
  const [open, setOpen] = useState(false)

  const categoryPath = (category) => {
    return `/product-category?category=${category}`
  }

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("keydown", handleEscape)

    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[999] overflow-y-auto bg-[#F7F7F5] text-[#5F5D56]"
        style={{
              backgroundImage: `
                linear-gradient(
                  120deg,
                  rgba(247,247,245,0.76),
                  rgba(247,247,245,0.68)
                ),
                url("https://res.cloudinary.com/duzr5nyne/image/upload/q_auto/f_auto/v1779352038/WhatsApp_Image_2026-04-15_at_10.21.36_f26iyo.jpg")
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",

              
            }}
        >
          <div
            className="absolute inset-0"
          />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(95,93,86,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(95,93,86,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />

          <div className="absolute top-10 right-0 h-80 w-80 rounded-full bg-[#EE2D2B]/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#5F5D56]/15 blur-3xl animate-pulse" />

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fermer le menu"
            className="fixed right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl text-[#EE2D2B] shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#EE2D2B] hover:text-white"
          >
            <FaTimes />
          </button>

          <div className="relative container mx-auto flex min-h-screen flex-col px-4 py-12 lg:py-16">
            <div className="mx-auto mb-10 h-1 w-24 rounded-full bg-[#EE2D2B]" />

            <nav className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {topLinks.map((item) => {
                const Icon = item.icon

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between rounded-2xl border border-[#5F5D56]/15 bg-white/85 px-5 py-4 text-[#5F5D56] shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#EE2D2B]/40 hover:bg-white"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EE2D2B]/10 text-[#EE2D2B] transition-all group-hover:bg-[#EE2D2B] group-hover:text-white">
                        <Icon className="text-sm" />
                      </span>

                      <span className="text-sm font-black uppercase tracking-wide">
                        {item.label}
                      </span>
                    </span>

                    <FaArrowRight className="text-xs text-[#EE2D2B] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </NavLink>
                )
              })}
            </nav>

            <div className="mt-14 flex-1">
              <div className="mb-10 text-center">
                <p className="mb-3 text-sm font-black uppercase tracking-[5px] text-[#EE2D2B]">
                  UNIK SYSTEM
                </p>

                <h2 className="text-3xl font-black uppercase text-[#5F5D56] md:text-5xl">
                  Nos Marques
                </h2>
              </div>

              <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                {productCategories.map((category) => (
                  <NavLink
                    key={category.label}
                    to={categoryPath(category.category)}
                    onClick={() => setOpen(false)}
                    className="group rounded-2xl border border-[#5F5D56]/15 bg-white/90 p-5 text-center shadow-xl backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-[#EE2D2B]/40 hover:bg-white"
                  >
                    <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[#5F5D56]/10 bg-[#F7F7F5] p-4 transition-all duration-300 group-hover:scale-105 group-hover:border-[#EE2D2B]/40 md:h-32 md:w-32">
                      <img
                        src={category.logo}
                        alt={category.label}
                        className="h-full w-full object-contain transition-all duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="mt-5 flex items-center justify-center gap-2">
                      <span className="text-sm font-black uppercase tracking-wide text-[#5F5D56] transition-colors group-hover:text-[#EE2D2B] md:text-base">
                        {category.label}
                      </span>

                      <FaArrowRight className="text-xs text-[#EE2D2B] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        className="fixed right-2 top-1/2 z-50 flex h-14 w-14 items-center justify-center rounded-full text-xl text-white shadow-2xl transition-all duration-300 hover:scale-110 sm:bottom-7 sm:top-auto"
        style={{
          background: `linear-gradient(135deg, ${brand.red}, ${brand.gray})`,
        }}
      >
        <span
          className="absolute inset-0 rounded-full opacity-30 animate-ping"
          style={{ backgroundColor: brand.red }}
        />

        <FaBars className="relative z-10" />
      </button>
    </>
  )
}

export default NavButton