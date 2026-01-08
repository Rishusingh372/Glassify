import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/admin/orders", {
      headers: { Authorization: localStorage.getItem("adminToken") }
    }).then(res => setOrders(res.data.orders || [])).catch(err => {
      console.error("Error fetching orders:", err);
      setOrders([]);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Orders</h2>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {orders.map(order => (
            <li key={order._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 truncate">
                    Order #{order._id?.slice(-8)}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    User: {order.user}
                  </p>
                  <p className="text-sm text-gray-500">
                    Total: ₹{order.totalAmount}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                  <Link 
                    to={`/admin/orders/${order._id}`}
                    className="ml-4 text-blue-600 hover:text-blue-900"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {orders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No orders found</p>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;