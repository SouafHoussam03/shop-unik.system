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
                    
                ]
            },
        ]
    }
])


export default router