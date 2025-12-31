import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../features/order/orderSlice";
import { clearCart } from "../features/cart/cartSlice";
import { createPaymentOrder } from "../services/paymentService";
import { useState } from "react";
import { CreditCard, Lock, Shield, CheckCircle } from "lucide-react";

const Checkout = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const { items } = useSelector(state => state.cart);
  const { token, user } = useSelector(state => state.auth);

  const subtotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;
  const totalWithTax = Math.round(total);

  const handlePayment = async () => {
    if (paymentMethod === "razorpay") {
      await handleRazorpayPayment();
    } else if (paymentMethod === "cod") {
      handleCODPayment();
    }
  };

  const handleRazorpayPayment = async () => {
    setLoading(true);
    try {
      // 1️⃣ Backend se Razorpay order create
      const order = await createPaymentOrder(totalWithTax, token);

      // 2️⃣ Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "RAZORPAY_KEY_ID",
        amount: order.amount,
        currency: "INR",
        name: "EyeGlasses Store",
        description: "EyeGlasses Purchase",
        order_id: order.id,
        handler: function (response) {
          // 3️⃣ Payment success → Order save
          dispatch(createOrder({
            orderData: {
              items,
              totalAmount: totalWithTax,
              paymentId: response.razorpay_payment_id,
              paymentMethod: "Razorpay",
            },
            token,
          }));

          dispatch(clearCart());
          setLoading(false);
          alert("Payment Successful 🎉");
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: {
          color: "#0d6efd",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      setLoading(false);
      alert("Payment failed. Please try again.");
    }
  };

  const handleCODPayment = () => {
    dispatch(createOrder({
      orderData: {
        items,
        totalAmount: totalWithTax,
        paymentMethod: "COD",
      },
      token,
    })).then(() => {
      dispatch(clearCart());
      alert("Order placed successfully! Cash on Delivery selected.");
    });
  };

  const shippingAddress = {
    name: user?.name || "John Doe",
    street: "123 Main Street",
    city: "Mumbai",
    state: "Maharashtra",
    zip: "400001",
    phone: "+91 9876543210"
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Checkout</h1>
      <p className="text-gray-600 mb-8">Complete your purchase with secure payment</p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Address & Payment */}
        <div className="lg:w-2/3 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Shipping Address</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Edit
              </button>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-700"><span className="font-medium">Name:</span> {shippingAddress.name}</p>
              <p className="text-gray-700"><span className="font-medium">Address:</span> {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.zip}</p>
              <p className="text-gray-700"><span className="font-medium">Phone:</span> {shippingAddress.phone}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>
            
            <div className="space-y-4">
              <div 
                className={`border-2 rounded-lg p-4 cursor-pointer transition duration-200 ${paymentMethod === "razorpay" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                onClick={() => setPaymentMethod("razorpay")}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${paymentMethod === "razorpay" ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}>
                    {paymentMethod === "razorpay" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800">Credit/Debit Card & UPI</h3>
                        <p className="text-sm text-gray-600">Pay securely with Razorpay</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CreditCard size={20} className="text-gray-400" />
                        <Shield size={20} className="text-green-500" />
                      </div>
                    </div>
                    {paymentMethod === "razorpay" && (
                      <p className="mt-2 text-sm text-gray-500">
                        <Lock size={14} className="inline mr-1" />
                        Your payment is secured with 256-bit encryption
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div 
                className={`border-2 rounded-lg p-4 cursor-pointer transition duration-200 ${paymentMethod === "cod" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                onClick={() => setPaymentMethod("cod")}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${paymentMethod === "cod" ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}>
                    {paymentMethod === "cod" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800">Cash on Delivery</h3>
                        <p className="text-sm text-gray-600">Pay when you receive your order</p>
                      </div>
                      <CheckCircle size={20} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            {/* Order Items */}
            <div className="max-h-60 overflow-y-auto mb-6 space-y-4">
              {items.map(item => (
                <div key={item._id} className="flex items-center border-b pb-4">
                  <img 
                    src={item.image || "https://via.placeholder.com/60x60?text=Glasses"} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.brand}</p>
                    <p className="text-sm">Qty: {item.quantity || 1}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">₹{item.price * (item.quantity || 1)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (18%)</span>
                <span className="font-medium">₹{tax.toFixed(2)}</span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total Amount</span>
                  <span className="text-blue-600">₹{totalWithTax}</span>
                </div>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full py-3 px-4 rounded-md font-semibold text-white transition duration-200 flex items-center justify-center ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'}`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : paymentMethod === "cod" ? (
                "Place Order (COD)"
              ) : (
                "Pay Now"
              )}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              <Lock size={12} className="inline mr-1" />
              Your payment is secured with SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;