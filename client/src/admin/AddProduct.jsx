import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    brand: "",
    gender: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.entries(product).forEach(([key, value]) =>
        formData.append(key, value)
      );

      images.forEach((img) => formData.append("images", img));

      await api.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/products");
    } catch (error) {
      console.error("Add product error:", error);
      alert(error.response?.data?.message || "Product add failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
        <input name="brand" placeholder="Brand" onChange={handleChange} required />
        <input name="gender" placeholder="Men/Women/Unisex/Kids" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} />

        <input type="file" multiple accept="image/*" onChange={handleImageChange} />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
