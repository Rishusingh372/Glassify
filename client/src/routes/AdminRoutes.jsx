
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";

import AdminDashboard from "../admin/AdminDashboard";
import AdminProducts from "../admin/AdminProducts";
import AddProduct from "../admin/AddProduct";
import AdminOrders from "../admin/AdminOrders";
import OrderDetails from "../admin/OrderDetails";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Protected admin routes */}
      <Route path="/" element={
        <ProtectedRoute adminOnly={true}>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:id" element={<OrderDetails />} />
        <Route path="" element={<AdminDashboard />} />
      </Route>
      
      {/* Catch all other admin routes */}
      <Route path="*" element={
        <ProtectedRoute adminOnly={true}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AdminRoutes;
