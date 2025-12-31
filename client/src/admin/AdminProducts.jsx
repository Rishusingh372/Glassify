import { useEffect, useState } from "react";
import api from "../services/api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/admin/products", {
      headers: { Authorization: localStorage.getItem("adminToken") }
    }).then(res => setProducts(res.data));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Products</h2>
        <div className="text-sm text-gray-600">
          {products.length} products
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <div 
            key={p._id} 
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
          >
            {p.image && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">{p.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{p.brand} • {p.gender}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-600">₹{p.price}</span>
                <button className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;