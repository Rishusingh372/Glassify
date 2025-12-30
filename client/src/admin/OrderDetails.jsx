import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/admin/orders/${id}`, {
      headers: { Authorization: localStorage.getItem("adminToken") },
    }).then(res => setOrder(res.data));
  }, []);

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2>Order Details</h2>
      <p>User: {order.user}</p>
      <p>Total: ₹{order.totalAmount}</p>
      <p>Status: {order.status}</p>

      {order.items.map(item => (
        <div key={item._id}>
          {item.name} x {item.qty}
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
