import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const productState = useSelector(state => state.product);
  const { filtered = [], status = 'idle', error } = productState || {};

  if (status === "loading") return (
    <div className="flex justify-center items-center h-96">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading products...</p>
      </div>
    </div>
  );

  if (status === "failed") return (
    <div className="text-center py-12">
      <div className="text-red-400 mb-4">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Failed to load products</h3>
      <p className="text-gray-500">{error || "Something went wrong. Please try again later."}</p>
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