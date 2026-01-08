
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { calculateTotals } from "../../features/cart/cartSlice";
import { Shield, User, ShoppingCart } from "lucide-react";

const Header = () => {
  const { user, role } = useSelector(state => state.auth);
  const { totalItems } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate cart totals on component mount
  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Check localStorage for user data on mount
  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      const storedRole = localStorage.getItem("role");
      if (storedUser && storedRole) {
        // User is logged in via localStorage
      }
    }
  }, [user]);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-3xl">👓</span>
            <div>
              <h1 className="text-2xl font-bold">EyeGlasses</h1>
              <p className="text-xs text-blue-100">Premium Eyewear</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                  isActive 
                    ? 'bg-blue-700 text-white' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`
              }
            >
              Home
            </NavLink>
            
            <NavLink 
              to="/cart" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition duration-200 flex items-center space-x-1 ${
                  isActive 
                    ? 'bg-blue-700 text-white' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`
              }
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="bg-yellow-400 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                  {totalItems}
                </span>
              )}
            </NavLink>

            {user ? (
              <>
                {role === 'admin' ? (
                  // Admin Navigation
                  <>
                    <NavLink 
                      to="/admin/dashboard" 
                      className={({ isActive }) => 
                        `px-3 py-2 rounded-md text-sm font-medium transition duration-200 flex items-center ${
                          isActive 
                            ? 'bg-purple-700 text-white' 
                            : 'text-purple-100 hover:bg-purple-700 hover:text-white'
                        }`
                      }
                    >
                      <Shield size={18} className="mr-1" />
                      Admin Panel
                    </NavLink>
                  </>
                ) : (
                  // User Navigation
                  <>
                    <NavLink 
                      to="/orders" 
                      className={({ isActive }) => 
                        `px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                          isActive 
                            ? 'bg-blue-700 text-white' 
                            : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                        }`
                      }
                    >
                      My Orders
                    </NavLink>
                  </>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition duration-200"
                >
                  Logout
                </button>
                
                <div className="hidden md:flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-sm font-bold">
                      {user.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <span className="ml-2 text-sm">
                    {role === 'admin' ? 'Admin' : 'User'}
                  </span>
                </div>
              </>
            ) : (
              <>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                      isActive 
                        ? 'bg-blue-700 text-white' 
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                    }`
                  }
                >
                  <User size={18} className="inline mr-1" />
                  Login
                </NavLink>
                <NavLink 
                  to="/signup" 
                  className="px-4 py-2 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition duration-200"
                >
                  Signup
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
