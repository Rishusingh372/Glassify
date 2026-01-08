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

/**
 * Update product by ID
 * @param {string} id
 * @param {FormData} formData
 */
export const updateProduct = async (id, formData) => {
  const response = await api.put(`/admin/products/${id}`, formData, {
    headers: { 
      'Content-Type': 'multipart/form-data',
      'Authorization': localStorage.getItem("adminToken")
    }
  });
  return response.data;
};

/**
 * Create new product
 * @param {FormData} formData
 */
export const createProduct = async (formData) => {
  const response = await api.post("/admin/products", formData, {
    headers: { 
      'Content-Type': 'multipart/form-data',
      'Authorization': localStorage.getItem("adminToken")
    }
  });
  return response.data;
};
