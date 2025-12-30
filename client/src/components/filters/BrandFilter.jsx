import { useDispatch } from "react-redux";
import { filterByBrand } from "../../features/product/productSlice";

const BrandFilter = () => {
  const dispatch = useDispatch();

  return (
    <select onChange={e => dispatch(filterByBrand(e.target.value))}>
      <option value="">Brand</option>
      <option value="RayBan">RayBan</option>
      <option value="Titan">Titan</option>
    </select>
  );
};

export default BrandFilter;
