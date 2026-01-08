import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/admin/orders/${id}`, {
      headers: { Authorization: localStorage.getItem("adminToken") },
    }).then(res => setOrder(res.data.order));
  }, [id]);

  const updateStatus = async (newStatus) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.put(`/admin/orders/${id}`, { status: newStatus }, {
        headers: { Authorization: localStorage.getItem("adminToken") },
      });
      setOrder(res.data.order);
    } catch (err) {
      setError("Failed to update order status");
      console.error("Update status error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!order) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-medium">{order._id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">User</p>
              <p className="font-medium">{order.user ? order.user.name : 'Unknown User'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-xl font-bold text-green-600">₹{order.totalAmount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'success'
                  ? 'bg-green-100 text-green-800'
                  : order.status === 'reject'
                  ? 'bg-red-100 text-red-800'
                  : order.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : order.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {order.status}
              </span>
              {order.status === 'pending' && (
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => updateStatus('success')}
                    disabled={loading}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Mark as Success'}
                  </button>
                  <button
                    onClick={() => updateStatus('reject')}
                    disabled={loading}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Mark as Reject'}
                  </button>
                </div>
              )}
              {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Order Items</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map(item => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {item.image && (
                          <img 
                            className="h-10 w-10 rounded-full mr-3" 
                            src={item.image} 
                            alt={item.name}
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.qty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{item.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{item.price * item.qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;