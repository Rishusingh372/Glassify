import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
} from "../controllers/productController.js";

import upload from "../middleware/uploadMiddleware.js";
import { adminProtect } from "../middleware/adminMiddleware.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getProducts);
router.get("/:id", getProductById);

/* ADMIN */
router.post("/", adminProtect, upload.array("images", 5), createProduct);
router.put("/:id", adminProtect, upload.array("images", 5), updateProduct);
router.delete("/:id", adminProtect, deleteProduct);

export default router;
