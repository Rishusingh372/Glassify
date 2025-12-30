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
    <div>
      <h2>All Products</h2>

      {products.map(p => (
        <div key={p._id}>
          {p.name} - ₹{p.price}
        </div>
      ))}
    </div>
  );
};

export default AdminProducts;
