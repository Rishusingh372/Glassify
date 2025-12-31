
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";

import AdminLogin from "../admin/AdminLogin";
import AdminDashboard from "../admin/AdminDashboard";
import AdminProducts from "../admin/AdminProducts";
import AddProduct from "../admin/AddProduct";
import AdminOrders from "../admin/AdminOrders";
import OrderDetails from "../admin/OrderDetails";

// Admin route protection component
const AdminProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("adminToken");
  return isAdmin ? children : <Navigate to="/admin/login" />;
};

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Public admin route */}
      <Route path="/admin/login" element={<AdminLogin />} />
      
      {/* Protected admin routes with layout */}
      <Route path="/admin" element={
        <AdminProtectedRoute>
          <AdminLayout />
        </AdminProtectedRoute>
      }>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:id" element={<OrderDetails />} />
        <Route path="" element={<Navigate to="/admin/dashboard" />} />
      </Route>
      
      {/* Catch all other admin routes */}
      <Route path="/admin/*" element={<Navigate to="/admin/login" />} />
    </Routes>
  );
};

export default AdminRoutes;
