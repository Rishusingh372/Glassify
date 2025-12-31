const Footer = () => {
  return (
    <footer className="mt-auto bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-2xl font-bold">👓 EyeGlasses Store</p>
            <p className="text-gray-400">Premium eyewear for everyone</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400 mb-2">
              © {new Date().getFullYear()} EyeGlasses Store. All rights reserved.
            </p>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                Contact Us
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-500 text-sm">
          <p>Designed with ❤️ for eyewear enthusiasts</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;