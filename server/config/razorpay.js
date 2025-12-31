
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

// Check if Razorpay credentials exist
const key_id = process.env.RAZORPAY_KEY_ID;
const key_secret = process.env.RAZORPAY_KEY_SECRET;

if (!key_id || !key_secret) {
  console.warn("⚠️  Razorpay credentials not found. Payment features will be disabled.");
  console.warn("   Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env file");
}

// Create Razorpay instance only if credentials exist
let razorpayInstance = null;

if (key_id && key_secret) {
  razorpayInstance = new Razorpay({
    key_id: key_id,
    key_secret: key_secret,
  });
  console.log("✅ Razorpay initialized successfully");
} else {
  console.log("⚠️  Razorpay running in test mode");
  
  // Create a mock Razorpay instance for development
  razorpayInstance = {
    orders: {
      create: async (options) => {
        console.log("Mock Razorpay: Creating order", options);
        return {
          id: `order_${Date.now()}`,
          amount: options.amount,
          currency: options.currency,
          status: 'created'
        };
      }
    }
  };
}

export default razorpayInstance;
