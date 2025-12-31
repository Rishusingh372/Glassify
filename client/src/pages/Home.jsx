import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../features/product/productSlice";

import ProductList from "../components/products/ProductList";
import BrandFilter from "../components/filters/BrandFilter";
import GenderFilter from "../components/filters/GenderFilter";
import PriceFilter from "../components/filters/PriceFilter";
import { Filter, Sparkles } from "lucide-react";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Discover Your Perfect <span className="text-blue-600">Eyewear</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Premium glasses that combine style, comfort, and clarity. Find your perfect pair today!
        </p>
        <div className="flex items-center justify-center mt-4">
          <Sparkles size={20} className="text-yellow-500 mr-2" />
          <span className="text-sm text-gray-500">Free shipping on orders over ₹999</span>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <Filter size={20} className="text-gray-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Filter Products</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Brand</label>
            <BrandFilter />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Gender</label>
            <GenderFilter />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Price</label>
            <PriceFilter />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-6">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Trending</span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">New Arrivals</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Premium</span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Bestsellers</span>
        </div>
      </div>

      {/* Products Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
          <p className="text-gray-600">
            Showing <span className="font-bold text-blue-600">all</span> products
          </p>
        </div>
        
        <ProductList />
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Quality Guaranteed</h3>
          <p className="text-gray-600">Premium materials with 1-year warranty</p>
        </div>
        
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
          <p className="text-gray-600">On all orders above ₹999</p>
        </div>
        
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
          <p className="text-gray-600">100% secure payment processing</p>
        </div>
      </div>
    </div>
  );
};

export default Home;