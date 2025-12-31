import { useDispatch } from "react-redux";
import { filterByGender } from "../../features/product/productSlice";

const GenderFilter = () => {
  const dispatch = useDispatch();

  return (
    <div className="relative">
      <select 
        onChange={e => dispatch(filterByGender(e.target.value))}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
      >
        <option value="">All Genders</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Unisex">Unisex</option>
        <option value="Kids">Kids</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default GenderFilter;