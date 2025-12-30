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
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <input name="brand" placeholder="Brand" onChange={handleChange} />
      <input name="gender" placeholder="Gender" onChange={handleChange} />

      <button>Add</button>
    </form>
  );
};

export default AddProduct;
