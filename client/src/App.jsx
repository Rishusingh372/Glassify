import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { calculateTotals } from "./features/cart/cartSlice";
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
  }, [dispatch]);
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* User Header - Shows for all non-admin routes */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow">
          {/* All Routes - React Router will handle which one shows */}
          <Routes>
            {/* AppRoutes will handle user routes */}
            <Route path="/*" element={<AppRoutes />} />
            {/* AdminRoutes will handle admin routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </main>

        {/* User Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
