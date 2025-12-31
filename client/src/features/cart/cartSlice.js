
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
  totalAmount: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);
      
      if (existingItem) {
        existingItem.qty = (existingItem.qty || 1) + 1;
      } else {
        state.items.push({ ...newItem, qty: 1 });
      }
      
      // Update totals
      state.totalItems = state.items.reduce((total, item) => total + (item.qty || 1), 0);
      state.totalAmount = state.items.reduce(
        (total, item) => total + (item.price * (item.qty || 1)), 
        0
      );
      
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item._id !== itemId);
      
      // Update totals
      state.totalItems = state.items.reduce((total, item) => total + (item.qty || 1), 0);
      state.totalAmount = state.items.reduce(
        (total, item) => total + (item.price * (item.qty || 1)), 
        0
      );
      
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    
    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find(item => item._id === id);
      
      if (item) {
        item.qty = Math.max(1, qty); // Ensure quantity is at least 1
      }
      
      // Update totals
      state.totalItems = state.items.reduce((total, item) => total + (item.qty || 1), 0);
      state.totalAmount = state.items.reduce(
        (total, item) => total + (item.price * (item.qty || 1)), 
        0
      );
      
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
      localStorage.removeItem("cart");
    },
    
    // Initialize cart totals when app loads
    calculateTotals: (state) => {
      state.totalItems = state.items.reduce((total, item) => total + (item.qty || 1), 0);
      state.totalAmount = state.items.reduce(
        (total, item) => total + (item.price * (item.qty || 1)), 
        0
      );
    }
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  calculateTotals 
} = cartSlice.actions;

export default cartSlice.reducer;
