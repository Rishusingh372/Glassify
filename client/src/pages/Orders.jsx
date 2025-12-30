import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../features/order/orderSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(state => state.order);
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchOrders(token));
  }, []);

  return (
    <div>
      <h2>My Orders</h2>

      {orders.map(order => (
        <div key={order._id}>
          <p>Order ID: {order._id}</p>
          <p>Total: ₹{order.totalAmount}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
