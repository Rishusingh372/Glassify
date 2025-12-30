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
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export default orderSlice.reducer;
