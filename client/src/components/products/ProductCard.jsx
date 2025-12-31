
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Ensure product has required properties
    const productToAdd = {
      _id: product._id,
      name: product.name,
      price: product.price,
      brand: product.brand,
      gender: product.gender,
      image: product.images?.[0]?.url || product.image,
      qty: 1
    };
    
    dispatch(addToCart(productToAdd));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-gray-200">
      {/* Clickable Image → Product Details */}
      <Link to={`/product/${product._id}`}>
        <div className="h-64 overflow-hidden bg-gray-100">
          <img
            src={product.images?.[0]?.url || product.image || "https://via.placeholder.com/300x200?text=No+Image"}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <Link to={`/product/${product._id}`}>
              <h3 className="font-semibold text-lg text-gray-800 hover:text-blue-600 transition duration-200">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-600">{product.brand}</p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
            {product.gender}
          </span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-purple-700 transition duration-200 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
