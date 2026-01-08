
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { calculateTotals } from "./features/cart/cartSlice";
import { setCredentials } from "./features/auth/authSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Routes
import AppRoutes from "./routes/AppRoutes";
import AdminRoutes from "./routes/AdminRoutes";

// Layout
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize cart totals when app loads
    dispatch(calculateTotals());
    
    // Restore auth state from localStorage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");
    
    if (token && user) {
      dispatch(setCredentials({
        token,
        user: JSON.parse(user),
        role
      }));
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* User Header - Shows for all routes */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow">
        {/* All Routes - React Router will handle which one shows */}
        <Routes>
          {/* AdminRoutes will handle admin routes - prioritized first */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          {/* AppRoutes will handle user routes */}
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
        </main>

        {/* User Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
