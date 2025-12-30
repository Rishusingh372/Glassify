import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { filtered, status } = useSelector(state => state.product);

  if (status === "loading") return <h3>Loading...</h3>;

  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
      {filtered.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
