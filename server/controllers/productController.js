import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

/* CREATE PRODUCT */
export const createProduct = async (req, res) => {
  try {
    const { name, price, brand, gender, description } = req.body;

    if (!name || !price || !brand || !gender) {
      return res.status(400).json({ message: "All required fields are mandatory" });
    }

    if (!["Men", "Women", "Unisex", "Kids"].includes(gender)) {
      return res.status(400).json({ message: "Invalid gender value" });
    }

    const images = [];

    if (req.files && req.files.length > 0) {
      if (!cloudinary) {
        return res.status(500).json({
          message: "Image upload service not configured",
        });
      }

      for (const file of req.files) {
        try {
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              { folder: "products" },
              (err, result) => {
                if (err) reject(err);
                else resolve(result);
              }
            ).end(file.buffer);
          });

          images.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        } catch (uploadError) {
          return res.status(500).json({
            message: "Image upload failed",
            error: uploadError.message,
          });
        }
      }
    }

    const product = await Product.create({
      name,
      price: Number(price),
      brand,
      gender,
      description: description || "",
      images,
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, product });

  } catch (error) {
    console.error("🔥 Create Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE PRODUCT */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, price, brand, gender, description } = req.body;

    if (req.files && req.files.length > 0) {
      if (!cloudinary) {
        return res.status(500).json({
          message: "Image upload service not configured",
        });
      }

      for (const file of req.files) {
        try {
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              { folder: "products" },
              (err, result) => {
                if (err) reject(err);
                else resolve(result);
              }
            ).end(file.buffer);
          });

          product.images.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        } catch (uploadError) {
          return res.status(500).json({
            message: "Image upload failed",
            error: uploadError.message,
          });
        }
      }
    }

    product.name = name;
    product.price = Number(price);
    product.brand = brand;
    product.gender = gender;
    product.description = description || "";

    await product.save();

    res.json({ success: true, product });

  } catch (error) {
    console.error("🔥 Update Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* DELETE PRODUCT */
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("🔥 Delete Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* GET ALL PRODUCTS */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ products });
  } catch (error) {
    console.error("🔥 Get Products Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* GET SINGLE PRODUCT BY ID */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ product });
  } catch (error) {
    console.error("🔥 Get Product By ID Error:", error);
    res.status(500).json({ message: error.message });
  }
};
