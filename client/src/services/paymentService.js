import api from "./api";

export const createPaymentOrder = async (amount, token) => {
  const res = await api.post(
    "/payment/create-order",
    { amount },
    { headers: { Authorization: token } }
  );
  return res.data;
};
