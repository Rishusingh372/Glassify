import api from "./api";

export const placeOrder = async (orderData, token) => {
  const res = await api.post("/orders", orderData, {
    headers: { Authorization: token },
  });
  return res.data;
};

export const getUserOrders = async (token) => {
  const res = await api.get("/orders/my-orders", {
    headers: { Authorization: token },
  });
  return res.data;
};
