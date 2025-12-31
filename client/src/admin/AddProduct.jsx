import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    brand: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/admin/add-product", product, {
      headers: { Authorization: localStorage.getItem("adminToken") }
    });
    navigate("/admin/products");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Product</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <input
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <input
            name="brand"
            placeholder="Brand"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <input
            name="gender"
            placeholder="Gender"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;