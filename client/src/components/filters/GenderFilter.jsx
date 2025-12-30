import { useDispatch } from "react-redux";
import { filterByGender } from "../../features/product/productSlice";

const GenderFilter = () => {
  const dispatch = useDispatch();

  return (
    <select onChange={e => dispatch(filterByGender(e.target.value))}>
      <option value="">Gender</option>
      <option value="Men">Men</option>
      <option value="Women">Women</option>
    </select>
  );
};

export default GenderFilter;
