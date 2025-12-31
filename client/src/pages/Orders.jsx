import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../features/order/orderSlice";
import { Package, Clock, CheckCircle, Truck, XCircle } from "lucide-react";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector(state => state.order);
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchOrders(token));
  }, [dispatch, token]);

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
      case 'processing':
        return <Package className="text-blue-500" size={20} />;
      case 'shipped':
        return <Truck className="text-purple-500" size={20} />;
      case 'delivered':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Package className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-96">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your orders...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
        <p className="text-gray-600">Track and manage all your orders in one place</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package size={48} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-3">No orders yet</h2>
          <p className="text-gray-500 mb-6">You haven't placed any orders. Start shopping to see your orders here!</p>
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Orders</p>
                  <p className="text-3xl font-bold">{orders.length}</p>
                </div>
                <Package size={32} className="opacity-80" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Delivered</p>
                  <p className="text-3xl font-bold">
                    {orders.filter(o => o.status?.toLowerCase() === 'delivered').length}
                  </p>
                </div>
                <CheckCircle size={32} className="opacity-80" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Spent</p>
                  <p className="text-3xl font-bold">
                    ₹{orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)}
                  </p>
                </div>
                <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Order History</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {orders.map(order => (
                <div key={order._id} className="p-6 hover:bg-gray-50 transition duration-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        {getStatusIcon(order.status)}
                        <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status || 'Processing'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Order #<span className="font-mono">{order._id?.slice(-8)}</span>
                      </p>
                    </div>
                    
                    <div className="mt-2 md:mt-0 text-right">
                      <p className="text-2xl font-bold text-blue-600">₹{order.totalAmount}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                      <p className="font-medium">{order.paymentMethod || 'Razorpay'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {order.paymentStatus || 'Paid'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Items:</p>
                    <div className="flex flex-wrap gap-2">
                      {order.items?.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center bg-gray-50 rounded-md px-3 py-2">
                          <img 
                            src={item.image || "https://via.placeholder.com/40x40?text=G"} 
                            alt={item.name}
                            className="w-8 h-8 rounded mr-2"
                          />
                          <span className="text-sm font-medium">{item.name}</span>
                          <span className="text-sm text-gray-500 ml-2">x{item.qty || 1}</span>
                        </div>
                      ))}
                      {order.items?.length > 3 && (
                        <div className="bg-gray-100 rounded-md px-3 py-2">
                          <span className="text-sm font-medium text-gray-600">
                            +{order.items.length - 3} more
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition duration-200 text-sm font-medium">
                      View Details
                    </button>
                    {order.status?.toLowerCase() === 'delivered' && (
                      <button className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 text-sm font-medium">
                        Buy Again
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;