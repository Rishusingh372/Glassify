
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await User.findOne({ email });
    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: "Admin not found" 
      });
    }

    // Check if user has admin role
    if (admin.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: "Access denied. Admin only." 
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid password" 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: admin._id, 
        email: admin.email,
        role: admin.role,
        name: admin.name 
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      admin: { 
        id: admin._id, 
        email: admin.email,
        name: admin.name,
        role: admin.role 
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};
