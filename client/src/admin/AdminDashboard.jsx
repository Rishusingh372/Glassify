import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      <nav className="flex flex-wrap gap-4 mb-8">
        <Link 
          to="/admin/products" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Products
        </Link>
        <Link 
          to="/admin/orders" 
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
        >
          Orders
        </Link>
        <Link 
          to="/admin/add-product" 
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200"
        >
          Add Product
        </Link>
      </nav>
      
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium text-gray-600">Total Products</h3>
            <p className="text-2xl font-bold">--</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium text-gray-600">Total Orders</h3>
            <p className="text-2xl font-bold">--</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium text-gray-600">Pending Orders</h3>
            <p className="text-2xl font-bold">--</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;