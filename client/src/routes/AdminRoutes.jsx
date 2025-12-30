import { Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "../admin/AdminLogin";
import AdminDashboard from "../admin/AdminDashboard";
import AdminProducts from "../admin/AdminProducts";
import AddProduct from "../admin/AddProduct";
import AdminOrders from "../admin/AdminOrders";
import OrderDetails from "../admin/OrderDetails";

const AdminRoutes = () => {
  const isAdmin = localStorage.getItem("adminToken");

  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />

      {isAdmin ? (
        <>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/admin/login" />} />
      )}
    </Routes>
  );
};

export default AdminRoutes;
