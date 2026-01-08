
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, LogIn, Shield, User } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, role } = useSelector(state => state.auth);

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    
    if (token && storedRole) {
      if (storedRole === 'admin') {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  // Redirect after successful login
  useEffect(() => {
    if (status === "success" && role) {
      if (role === 'admin') {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [status, role, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password, isAdmin: isAdminLogin }));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            {isAdminLogin ? (
              <Shield size={32} className="text-white" />
            ) : (
              <User size={32} className="text-white" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            {isAdminLogin ? "Admin Login" : "User Login"}
          </h2>
          <p className="mt-2 text-gray-600">
            {isAdminLogin 
              ? "Access the admin dashboard" 
              : "Sign in to your account"}
          </p>
          
          {/* Toggle Switch */}
          <div className="mt-6 flex items-center justify-center space-x-4">
            <button
              type="button"
              onClick={() => setIsAdminLogin(false)}
              className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                !isAdminLogin 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <User size={18} className="inline mr-2" />
              User
            </button>
            
            <button
              type="button"
              onClick={() => setIsAdminLogin(true)}
              className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                isAdminLogin 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Shield size={18} className="inline mr-2" />
              Admin
            </button>
          </div>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            {!isAdminLogin && (
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                Forgot password?
              </a>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg font-medium text-white transition duration-200 ${
              status === "loading" 
                ? 'bg-gray-400 cursor-not-allowed' 
                : isAdminLogin
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            }`}
          >
            {status === "loading" ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Signing in...
              </>
            ) : (
              <>
                <LogIn size={20} className="mr-2" />
                {isAdminLogin ? "Admin Sign In" : "User Sign In"}
              </>
            )}
          </button>
          
          {!isAdminLogin && (
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-800">
                  Create an account
                </Link>
              </p>
            </div>
          )}
        </form>
        
        {/* Admin Note */}
        {isAdminLogin && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <Shield size={16} className="inline mr-1" />
              <strong>Note:</strong> Only users with admin privileges can access this panel.
              Contact administrator if you don't have admin access.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
