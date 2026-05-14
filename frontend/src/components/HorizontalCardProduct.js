/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);

  // ================= ADD TO CART =================
  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  // ================= FETCH PRODUCTS =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetchCategoryWiseProduct(category);

      setData(response?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  // ================= SCROLL =================
  const scrollRight = () => {
    scrollElement.current.scrollLeft += 350;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 350;
  };

  return (
    <div className="container mx-auto px-4 my-10 relative">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          {heading}
        </h2>

        <div className="hidden md:flex gap-3">
          <button
            onClick={scrollLeft}
            className="bg-white border shadow-md hover:bg-red-600 hover:text-white transition-all duration-300 rounded-full p-3"
          >
            <FaAngleLeft />
          </button>

          <button
            onClick={scrollRight}
            className="bg-white border shadow-md hover:bg-red-600 hover:text-white transition-all duration-300 rounded-full p-3"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>

      {/* PRODUCTS */}
      <div
        ref={scrollElement}
        className="flex gap-5 overflow-x-scroll scrollbar-none scroll-smooth"
      >

        {/* LOADING */}
        {loading
          ? [...Array(8)].map((_, index) => (
              <div
                key={index}
                className="min-w-[300px] bg-white rounded-2xl overflow-hidden shadow-md animate-pulse"
              >
                <div className="h-52 bg-slate-200"></div>

                <div className="p-4 space-y-3">
                  <div className="h-5 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>

                  <div className="flex gap-3">
                    <div className="h-5 w-20 bg-slate-200 rounded"></div>
                    <div className="h-5 w-16 bg-slate-200 rounded"></div>
                  </div>

                  <div className="h-10 bg-slate-200 rounded-xl"></div>
                </div>
              </div>
            ))
          : data.map((product) => (
              <Link
                to={`/product/${product?._id}`}
                key={product?._id}
                className="min-w-[300px] md:min-w-[320px] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
              >

                {/* IMAGE */}
                <div className="bg-gray-100 h-56 flex items-center justify-center overflow-hidden">
                  <img
                    src={product?.productImage?.[0] || "/no-image.png"}
                    alt={product?.productName}
                    className="h-full object-contain group-hover:scale-110 transition-all duration-500"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5">

                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {product?.productName}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1 capitalize">
                    {product?.category}
                  </p>

                  {/* PRICE */}
                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-2xl font-bold text-red-600">
                      {displayINRCurrency(product?.sellingPrice)}
                    </span>

                    <span className="text-gray-400 line-through text-sm">
                      {displayINRCurrency(product?.price)}
                    </span>
                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={(e) => handleAddToCart(e, product?._id)}
                    className="mt-5 w-full bg-red-600 hover:bg-black transition-all duration-300 text-white py-3 rounded-xl font-medium"
                  >
                    Add To Cart
                  </button>

                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;