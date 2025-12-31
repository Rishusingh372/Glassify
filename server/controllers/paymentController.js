
import razorpay from "../config/razorpay.js";
import crypto from "crypto";

export const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);
    
    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error("Create payment order error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating payment order"
    });
  }
};

export const verifyPayment = (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ 
        success: true,
        message: "Payment verified successfully" 
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: "Invalid payment signature" 
      });
    }
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({
      success: false,
      message: "Error verifying payment"
    });
  }
};
