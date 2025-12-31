
import express from "express";
import { adminLogin } from "../controllers/adminController.js";
import { adminProtect } from "../middleware/adminMiddleware.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import upload from "../middleware/uploadMiddleware.js";
import { createProduct, updateProduct, deleteProduct, getProducts } from "../controllers/productController.js";

const router = express.Router();

// Admin Login
router.post("/login", adminLogin);

// Get all products (admin)
router.get("/products", adminProtect, getProducts);

// Add product
router.post("/add-product", adminProtect, upload.array("images", 5), createProduct);

// Update product
router.put("/products/:id", adminProtect, upload.array("images", 5), updateProduct);

// Delete product
router.delete("/products/:id", adminProtect, deleteProduct);

// Get all orders (admin)
router.get("/orders", adminProtect, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders"
    });
  }
});

// Get single order
router.get("/orders/:id", adminProtect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }
    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching order"
    });
  }
});

// Update order status
router.put("/orders/:id", adminProtect, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating order"
    });
  }
});

// Admin dashboard stats
router.get("/dashboard", adminProtect, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" }
        }
      }
    ]);

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name');

    res.json({
      success: true,
      stats: {
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0
      },
      recentOrders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard data"
    });
  }
});

export default router;
