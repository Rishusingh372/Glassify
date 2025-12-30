import { BrowserRouter as Router } from "react-router-dom";

// Routes
import AppRoutes from "./routes/AppRoutes";
import AdminRoutes from "./routes/AdminRoutes";

// Layout
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

function App() {
  return (
    <Router>
      {/* User Header */}
      <Header />

      {/* User Routes */}
      <AppRoutes />

      {/* Admin Routes (separate) */}
      <AdminRoutes />

      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
