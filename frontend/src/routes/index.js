import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import ForgotPassword from '../pages/ForgotPassowrd'
import Profile from '../pages/Profile'
import ResetPassword from '../pages/Reset-password'
import Dashboard from '../pages/Dashboard'  
import PageNotFound from '../pages/PageNotFound'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Devis from '../pages/Devis'
import Checkout from '../pages/Checkout'
import Livraison from '../pages/Livraison'
import AdminUsersCartDelivery from '../pages/AdminUsersCartDelivery'
import PaymentSuccess from '../pages/PaymentSuccess'
import PaymentCancel from '../pages/PaymentCancel'
import DiscoverProducts from '../pages/DiscoverProducts'



const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path: "/checkout",
                element: <Checkout />
            },
            {
                path: "/livraison",
                element: <Livraison />
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassowrd/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "profile",
                element : <Profile/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />
            },
            {
                path : "reset-password/:token",
                element : <ResetPassword/>
            },  
            {
                path: "*",
                element: <PageNotFound />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/devis",
                element: <Devis />
            },
            {
                path: "/success",
                element: <PaymentSuccess />
            },
            {
                path: "/cancel",
                element: <PaymentCancel />
            },
            {
                path: "/Découvrir-Nos-Produits",
                element: <DiscoverProducts/>
            },



            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "Dashboard",
                        element : <Dashboard/>
                    },
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    },
                    {
                        path: "users-cart-delivery",
                        element: <AdminUsersCartDelivery />
                    },
                    
                ]
            },
        ]
    }
])


export default router