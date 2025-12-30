import { useDispatch } from "react-redux";
import { filterByPrice } from "../../features/product/productSlice";

const PriceFilter = () => {
  const dispatch = useDispatch();

  return (
    <select onChange={e => dispatch(filterByPrice(Number(e.target.value)))}>
      <option value="">Price</option>
      <option value="1000">Under ₹1000</option>
      <option value="2000">Under ₹2000</option>
    </select>
  );
};

export default PriceFilter;
