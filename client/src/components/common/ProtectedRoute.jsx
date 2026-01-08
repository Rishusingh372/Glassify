
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { token, role } = useSelector(state => state.auth);
  
  // Check localStorage as fallback
  const localToken = localStorage.getItem("token");
  const localRole = localStorage.getItem("role");
  
  const isAuthenticated = token || localToken;
  const userRole = role || localRole;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && userRole !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
