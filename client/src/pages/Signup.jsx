import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Eye, EyeOff, CheckCircle } from "lucide-react";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(signup({ 
        name: form.name, 
        email: form.email, 
        password: form.password 
      })).then(() => navigate("/"));
    }
  };

  const passwordChecks = [
    { label: "At least 6 characters", met: form.password.length >= 6 },
    { label: "Contains uppercase", met: /[A-Z]/.test(form.password) },
    { label: "Contains number", met: /\d/.test(form.password) },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="mt-2 text-gray-600">Join thousands of happy customers</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'}`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 pr-12 ${errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
              
              {/* Password Strength */}
              {form.password && (
                <div className="mt-3 space-y-2">
                  {passwordChecks.map((check, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle 
                        size={16} 
                        className={`mr-2 ${check.met ? 'text-green-500' : 'text-gray-300'}`} 
                      />
                      <span className={`text-sm ${check.met ? 'text-green-600' : 'text-gray-500'}`}>
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 pr-12 ${errors.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition duration-200"
          >
            <UserPlus size={20} className="mr-2" />
            Create Account
          </button>
          
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;