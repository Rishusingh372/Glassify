import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/product/productSlice";
import orderReducer from "../features/order/orderSlice";

import persistConfig from "./persistConfig";
import { persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  product: productReducer,
  order: orderReducer,
});

export default persistReducer(persistConfig, rootReducer);
