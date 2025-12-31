
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword,
      role: 'user' // Default role
    });

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email,
        role: user.role,
        name: user.name 
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Remove password from response
    user.password = undefined;

    res.status(201).json({
      success: true,
      user,
      token
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email,
        role: user.role,
        name: user.name 
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Remove password from response
    user.password = undefined;

    res.json({
      success: true,
      user,
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
