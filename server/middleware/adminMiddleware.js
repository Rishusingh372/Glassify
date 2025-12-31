
import jwt from "jsonwebtoken";

export const adminProtect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "No token provided" 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user is admin
    if (decoded.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: "Admin access required" 
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(401).json({ 
      success: false, 
      message: "Invalid or expired token" 
    });
  }
};
