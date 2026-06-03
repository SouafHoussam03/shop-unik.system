import React from "react"
import { useTranslation } from "react-i18next"

const languages = [
    { code: "fr", label: "FR" },
    { code: "ar", label: "AR" },
    { code: "en", label: "EN" }
]

const LanguageSwitcher = () => {
    const { i18n } = useTranslation()

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
        localStorage.setItem("language", lang)

        document.documentElement.lang = lang
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
    }

    return (
        <div className="flex items-center gap-1 bg-slate-100 border rounded-full p-1">
            {languages.map((item) => (
                <button
                    key={item.code}
                    type="button"
                    onClick={() => changeLanguage(item.code)}
                    className={`px-3 py-1 rounded-full text-xs font-black transition-all ${
                        i18n.language === item.code
                            ? "bg-red-600 text-white shadow"
                            : "text-gray-600 hover:text-red-600"
                    }`}
                >
                    {item.label}
                </button>
            ))}
        </div>
    )
}

export default LanguageSwitcher