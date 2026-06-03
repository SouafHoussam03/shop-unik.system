import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useCallback } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import NavButton from './components/NavButton';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';



function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  // ✅ fetch user details
  const fetchUserDetails = useCallback(async () => {
    try {
      const res = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include'
      });

      const data = await res.json();

      if (data?.success) {
        dispatch(setUserDetails(data.data));
      } else {
        dispatch(setUserDetails(null)); // ✔️ reset إذا ماشي login
      }
    } catch (error) {
      console.error("User fetch error:", error);
      dispatch(setUserDetails(null));
    }
  }, [dispatch]);

  // ✅ fetch cart count
  const fetchUserAddToCart = useCallback(async () => {
    try {
      const res = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: 'include'
      });

      const data = await res.json();

      setCartProductCount(data?.data?.count || 0);
    } catch (error) {
      console.error("Cart fetch error:", error);
      setCartProductCount(0); // ✔️ fallback
    }
  }, []);

  // ✅ run on mount
  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, [fetchUserDetails, fetchUserAddToCart]);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount,
          fetchUserAddToCart
        }}
      >
        <ToastContainer position="top-center" autoClose={2000} />

        <Header />
        <ScrollToTop />

        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <NavButton />
        <WhatsAppButton />
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;