
import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, paymentId, paymentMethod, shippingAddress } = req.body;

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      paymentId,
      paymentMethod,
      shippingAddress
    });

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating order"
    });
  }
};

export const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('items.product', 'name brand images');

    res.json({
      success: true,
      orders
    });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders"
    });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product', 'name brand images');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    // Check if user owns the order or is admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching order"
    });
  }
};
