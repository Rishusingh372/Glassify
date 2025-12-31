import { Link } from "react-router-dom";
import { Home, Search, Frown } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
            <Frown size={64} className="text-gray-400" />
          </div>
          <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-full blur-lg opacity-70"></div>
          <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full blur-lg opacity-70"></div>
        </div>
        
        <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8 text-lg">
          Oops! The page you're looking for seems to have wandered off. 
          Maybe it's trying on some new glasses?
        </p>
        
        <div className="space-y-4">
          <Link 
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-200"
          >
            <Home size={20} className="mr-2" />
            Back to Home
          </Link>
          
          <p className="text-gray-500 text-sm mt-6">
            Need help? Try searching or check out our{" "}
            <Link to="/" className="text-blue-600 hover:underline">popular products</Link>
          </p>
        </div>
        
        <div className="mt-12 p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-center space-x-2 text-gray-500 mb-4">
            <Search size={20} />
            <span className="font-medium">Quick Links</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800 hover:underline">Home</Link>
            <Link to="/cart" className="text-blue-600 hover:text-blue-800 hover:underline">Cart</Link>
            <Link to="/login" className="text-blue-600 hover:text-blue-800 hover:underline">Login</Link>
            <Link to="/signup" className="text-blue-600 hover:text-blue-800 hover:underline">Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;