import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { filtered, status } = useSelector(state => state.product);

  if (status === "loading") return (
    <div className="flex justify-center items-center h-96">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading products...</p>
      </div>
    </div>
  );

  if (filtered.length === 0) return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
      <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
    </div>
  );

  return (
    <>
      <div className="mb-6">
        <p className="text-gray-600">
          Showing <span className="font-bold">{filtered.length}</span> products
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;