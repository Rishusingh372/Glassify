import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
  getProducts,
  getProductById,
} from "../controllers/productController.js";

import upload from "../middleware/uploadMiddleware.js";
import { adminProtect } from "../middleware/adminMiddleware.js";

const router = express.Router();

/* Public */
router.get("/", getProducts);
router.get("/:id", getProductById);

/* Admin */
router.post(
  "/",
  adminProtect,
  upload.array("images", 5),
  createProduct
);

router.put(
  "/:id",
  adminProtect,
  upload.array("images", 5),
  updateProduct
);

router.delete(
  "/:id",
  adminProtect,
  deleteProduct
);

router.delete(
  "/:productId/image/:imageId",
  adminProtect,
  deleteProductImage
);

export default router;
