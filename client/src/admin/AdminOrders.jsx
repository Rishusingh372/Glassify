import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    api.get("/admin/orders", {
      headers: { Authorization: localStorage.getItem("adminToken") }
    })
    .then(res => setOrders(res.data.orders || []))
    .catch(err => {
      console.error("Error fetching orders:", err);
      setOrders([]);
    });
  };

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(
        `/admin/orders/${orderId}`,
        { status },
        { headers: { Authorization: localStorage.getItem("adminToken") } }
      );

      // Update UI instantly
      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (err) {
      console.error("Status update failed", err);
      alert("Failed to update status");
    }
  };

  const statusBadge = status => {
    switch (status) {
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Orders</h2>

      <div className="bg-white shadow sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {orders.map(order => (
            <li key={order._id} className="px-4 py-4 sm:px-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                  <p className="text-sm font-medium text-blue-600">
                    Order #{order._id.slice(-8)}
                  </p>
                  <p className="text-sm text-gray-500">
                    User: {order.user?.name || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Total: ₹{order.totalAmount}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusBadge(order.status)}`}>
                    {order.status}
                  </span>

                  <button
                    onClick={() => updateStatus(order._id, "Shipped")}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Shipped
                  </button>

                  <button
                    onClick={() => updateStatus(order._id, "Pending")}
                    className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Pending
                  </button>

                  <button
                    onClick={() => updateStatus(order._id, "Cancelled")}
                    className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Rejected
                  </button>

                  <Link
                    to={`/admin/orders/${order._id}`}
                    className="text-blue-600 text-sm hover:underline ml-2"
                  >
                    View
                  </Link>
                </div>

              </div>
            </li>
          ))}
        </ul>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No orders found
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
