import { useDispatch } from "react-redux";
import { filterByPrice } from "../../features/product/productSlice";

const PriceFilter = () => {
  const dispatch = useDispatch();

  return (
    <div className="relative">
      <select 
        onChange={e => dispatch(filterByPrice(Number(e.target.value)))}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
      >
        <option value="">All Prices</option>
        <option value="1000">Under ₹1000</option>
        <option value="2000">Under ₹2000</option>
        <option value="3000">Under ₹3000</option>
        <option value="5000">Under ₹5000</option>
        <option value="10000">Under ₹10000</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default PriceFilter;