import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../features/order/orderSlice";
import { clearCart } from "../features/cart/cartSlice";
import { createPaymentOrder } from "../services/paymentService";

const Checkout = () => {
  const dispatch = useDispatch();

  const { items, totalAmount } = useSelector(state => state.cart);
  const { token, user } = useSelector(state => state.auth);

  const handlePayment = async () => {
    // 1️⃣ Backend se Razorpay order create
    const order = await createPaymentOrder(totalAmount, token);

    // 2️⃣ Razorpay options
    const options = {
      key: "RAZORPAY_KEY_ID", // test key
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
            totalAmount,
            paymentId: response.razorpay_payment_id,
            paymentMethod: "Razorpay",
          },
          token,
        }));

        dispatch(clearCart());
        alert("Payment Successful 🎉");
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: "#0d6efd",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total Amount: ₹{totalAmount}</p>

      <button onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;
