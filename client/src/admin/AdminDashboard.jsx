import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>

      <nav style={{ display: "flex", gap: 20 }}>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/orders">Orders</Link>
        <Link to="/admin/add-product">Add Product</Link>
      </nav>
    </div>
  );
};

export default AdminDashboard;
