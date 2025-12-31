
import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

/* =========================
   CREATE PRODUCT
========================= */
export const createProduct = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Admin access required"
      });
    }

    const images = [];

    // Upload images to Cloudinary
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { folder: "eyeglasses" }
        );

        images.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    }

    // Create product
    const product = await Product.create({
      ...req.body,
      images,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message
    });
  }
};

/* =========================
   UPDATE PRODUCT
========================= */
export const updateProduct = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Admin access required"
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Update basic fields
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.brand = req.body.brand || product.brand;
    product.gender = req.body.gender || product.gender;
    product.description = req.body.description || product.description;

    // Upload new images if provided
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { folder: "eyeglasses" }
        );

        product.images.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    }

    await product.save();
    
    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message
    });
  }
};

/* =========================
   DELETE SINGLE IMAGE
========================= */
export const deleteProductImage = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Admin access required"
      });
    }

    const { productId, imageId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const image = product.images.id(imageId);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found"
      });
    }

    // Delete from cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    // Remove from array
    product.images.pull(imageId);
    await product.save();
    
    res.json({
      success: true,
      message: "Image deleted successfully"
    });
  } catch (error) {
    console.error("Delete image error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting image",
      error: error.message
    });
  }
};

/* =========================
   DELETE PRODUCT
========================= */
export const deleteProduct = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Admin access required"
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Delete all images from cloudinary
    for (const img of product.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await product.deleteOne();
    
    res.json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message
    });
  }
};

/* =========================
   GET PRODUCT BY ID
========================= */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message
    });
  }
};

/* =========================
   GET PRODUCTS
========================= */
export const getProducts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      brand, 
      gender, 
      minPrice, 
      maxPrice,
      search 
    } = req.query;

    const query = {};

    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (gender) query.gender = gender;
    
    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .exec();

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message
    });
  }
};
