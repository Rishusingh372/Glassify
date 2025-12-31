import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../services/productService";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async () => {
    return await fetchProducts();
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    filtered: [],
    status: "idle",
  },
  reducers: {
    filterByBrand: (state, action) => {
      state.filtered = state.products.filter(
        p => p.brand === action.payload
      );
    },
    filterByGender: (state, action) => {
      state.filtered = state.products.filter(
        p => p.gender === action.payload
      );
    },
    filterByPrice: (state, action) => {
      state.filtered = state.products.filter(
        p => p.price <= action.payload
      );
    },
    clearFilter: (state) => {
      state.filtered = state.products;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.filtered = action.payload.products;
        state.status = "success";
      });
  },
});

export const {
  filterByBrand,
  filterByGender,
  filterByPrice,
  clearFilter,
} = productSlice.actions;

export default productSlice.reducer;
