import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { placeOrder, getUserOrders } from "../../services/orderService";

export const createOrder = createAsyncThunk(
  "order/create",
  async ({ orderData, token }) => {
    return await placeOrder(orderData, token);
  }
);

export const fetchOrders = createAsyncThunk(
  "order/fetch",
  async (token) => {
    return await getUserOrders(token);
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload.order);
      })
      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;
