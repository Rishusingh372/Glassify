
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
  totalAmount: 0,
  totalItems: 0,
};

const calculate = (items) => {
  const totalItems = items.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return { totalItems, totalAmount };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        item => item._id === newItem._id
      );

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.items.push({ ...newItem, qty: 1 });
      }

      const totals = calculate(state.items);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        item => item._id !== action.payload
      );

      const totals = calculate(state.items);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item._id === id);

      if (item) {
        item.quantity = Math.max(1, quantity);
      }

      const totals = calculate(state.items);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
      localStorage.removeItem("cart");
    },

    // ✅ MISSING FUNCTION — NOW ADDED
    calculateTotals: (state) => {
      const totals = calculate(state.items);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
