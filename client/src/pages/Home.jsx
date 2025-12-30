import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../features/product/productSlice";

import ProductList from "../components/products/ProductList";
import BrandFilter from "../components/filters/BrandFilter";
import GenderFilter from "../components/filters/GenderFilter";
import PriceFilter from "../components/filters/PriceFilter";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <h2>EyeGlasses Store</h2>

      <div style={{ display: "flex", gap: 10 }}>
        <BrandFilter />
        <GenderFilter />
        <PriceFilter />
      </div>

      <ProductList />
    </>
  );
};

export default Home;
