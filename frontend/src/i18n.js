import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
    fr: {
        translation: {
            login: "Connexion",
            createAccount: "Créer un compte",
            forgotPassword: "Mot de passe oublié",
            email: "Email",
            password: "Mot de passe",
            confirmPassword: "Confirmer le mot de passe",
            fullName: "Nom complet",
            phone: "Téléphone",
            address: "Adresse",
            submit: "Envoyer",
            logout: "Déconnexion",
            cart: "Panier",
            profile: "Profil",
            searchProducts: "Rechercher des produits...",
            home: "Accueil",
            about: "Qui sommes-nous",
            contact: "Contact",
            devis: "Demander un devis"
        }
    },

    ar: {
        translation: {
            login: "تسجيل الدخول",
            createAccount: "إنشاء حساب",
            forgotPassword: "نسيت كلمة المرور",
            email: "البريد الإلكتروني",
            password: "كلمة المرور",
            confirmPassword: "تأكيد كلمة المرور",
            fullName: "الاسم الكامل",
            phone: "الهاتف",
            address: "العنوان",
            submit: "إرسال",
            logout: "تسجيل الخروج",
            cart: "السلة",
            profile: "الملف الشخصي",
            searchProducts: "ابحث عن المنتجات...",
            home: "الرئيسية",
            about: "من نحن",
            contact: "اتصل بنا",
            devis: "طلب عرض سعر"
        }
    },

    en: {
        translation: {
            login: "Login",
            createAccount: "Create Account",
            forgotPassword: "Forgot Password",
            email: "Email",
            password: "Password",
            confirmPassword: "Confirm Password",
            fullName: "Full Name",
            phone: "Phone",
            address: "Address",
            submit: "Submit",
            logout: "Logout",
            cart: "Cart",
            profile: "Profile",
            searchProducts: "Search products...",
            home: "Home",
            about: "About Us",
            contact: "Contact",
            devis: "Request a Quote"
        }
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem("language") || "fr",
        fallbackLng: "fr",
        interpolation: {
            escapeValue: false
        }
    })

export default i18n