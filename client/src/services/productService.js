import api from "./api";

/**
 * Get all products
 */
export const fetchProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

/**
 * Get single product by ID
 * @param {string} id
 */
export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
