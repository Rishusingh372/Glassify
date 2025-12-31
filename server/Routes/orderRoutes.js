import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createOrder, myOrders } from "../controllers/orderController.js";

const router = express.Router();
router.post("/", protect, createOrder);
router.get("/my-orders", protect, myOrders);
export default router;
