
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight,
  Plus,
  Minus
} from "lucide-react";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector(state => state.cart);
  
  // Calculate totals
  const subtotal = items.reduce((total, item) => 
    total + (item.price * (item.qty || 1)), 0
  );
  
  const tax = subtotal * 0.18; // 18% GST
  const shipping = subtotal > 999 ? 0 : 50; // Free shipping above ₹999
  const total = subtotal + tax + shipping;

  const handleQuantityChange = (id, change) => {
    const item = items.find(item => item._id === id);
    if (item) {
      const newQty = Math.max(1, (item.qty || 1) + change);
      dispatch(updateQuantity({ id, qty: newQty }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  if (items.length === 0) return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
          <ShoppingBag size={96} className="mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-gray-700 mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added any glasses to your cart yet.</p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200"
        >
          Start Shopping
          <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="hidden md:grid grid-cols-12 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-700 border-b">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
            </div>
            
            {items.map(item => (
              <div key={item._id} className="p-6 border-b border-gray-200 hover:bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex items-center mb-4 md:mb-0 md:w-6/12">
                    <img 
                      src={item.image || item.images?.[0]?.url || "https://via.placeholder.com/100x100?text=Glasses"} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.brand} • {item.gender}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-0 md:w-6/12">
                    <div className="md:col-span-2 text-center">
                      <span className="md:hidden font-medium text-gray-600">Price: </span>
                      <span className="text-lg font-bold text-blue-600">₹{item.price}</span>
                    </div>
                    
                    <div className="md:col-span-2 text-center">
                      <span className="md:hidden font-medium text-gray-600">Qty: </span>
                      <div className="flex items-center justify-center">
                        <button 
                          onClick={() => handleQuantityChange(item._id, -1)}
                          className="w-8 h-8 bg-gray-100 rounded-l-md hover:bg-gray-200 flex items-center justify-center"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-12 text-center border-y border-gray-100 py-1">
                          {item.qty || 1}
                        </span>
                        <button 
                          onClick={() => handleQuantityChange(item._id, 1)}
                          className="w-8 h-8 bg-gray-100 rounded-r-md hover:bg-gray-200 flex items-center justify-center"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 text-center">
                      <span className="md:hidden font-medium text-gray-600">Total: </span>
                      <span className="text-lg font-bold text-gray-800">
                        ₹{item.price * (item.qty || 1)}
                      </span>
                    </div>
                    
                    <div className="col-span-2 flex justify-end">
                      <button 
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({items.length} items)</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? "Free" : `₹${shipping}`}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (18%)</span>
                <span className="font-medium">₹{tax.toFixed(2)}</span>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">₹{total.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
              </div>
            </div>

            <Link 
              to="/checkout"
              className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center font-semibold py-3 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 transition duration-200 mb-4"
            >
              Proceed to Checkout
            </Link>
            
            <Link 
              to="/"
              className="block w-full text-center text-blue-600 font-medium py-2 border border-blue-600 rounded-md hover:bg-blue-50 transition duration-200"
            >
              Continue Shopping
            </Link>
            
            <div className="mt-6 text-sm text-gray-500">
              <p className="flex items-center mb-1">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Free shipping on orders above ₹999
              </p>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                30-day return policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
