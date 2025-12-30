import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/admin/orders", {
      headers: { Authorization: localStorage.getItem("adminToken") }
    }).then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>Orders</h2>

      {orders.map(order => (
        <div key={order._id}>
          <p>User: {order.user}</p>
          <Link to={`/admin/orders/${order._id}`}>View</Link>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
