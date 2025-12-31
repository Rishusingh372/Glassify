
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";
import Product from "./models/Product.js";

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB Connected");
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    console.log("🗑️ Cleared existing data");

    // Create admin users
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash("Admin@123", salt);
    const userPassword = await bcrypt.hash("User@123", salt);

    const users = [
      {
        name: "Super Admin",
        email: "admin@eyeglasses.com",
        password: adminPassword,
        role: "admin"
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password: userPassword,
        role: "user"
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: userPassword,
        role: "user"
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create sample products
    const products = [
      {
        name: "Ray-Ban Aviator",
        brand: "RayBan",
        gender: "Unisex",
        price: 2999,
        description: "Classic aviator sunglasses with UV protection",
        images: [
          {
            public_id: "sample1",
            url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400"
          }
        ],
        createdBy: createdUsers[0]._id
      },
      {
        name: "Titan Octane",
        brand: "Titan",
        gender: "Men",
        price: 1899,
        description: "Premium metal frame glasses",
        images: [
          {
            public_id: "sample2",
            url: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w-400"
          }
        ],
        createdBy: createdUsers[0]._id
      },
      {
        name: "Gucci GG0290S",
        brand: "Gucci",
        gender: "Women",
        price: 5999,
        description: "Luxury designer sunglasses",
        images: [
          {
            public_id: "sample3",
            url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400"
          }
        ],
        createdBy: createdUsers[0]._id
      }
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} products`);

    // Display login credentials
    console.log("\n🔐 Login Credentials:");
    console.log("=".repeat(40));
    console.log("\n👑 ADMIN:");
    console.log("URL: http://localhost:5173/admin/login");
    console.log("Email: admin@eyeglasses.com");
    console.log("Password: Admin@123");
    
    console.log("\n👤 USERS:");
    console.log("URL: http://localhost:5173/login");
    console.log("Email: john@example.com");
    console.log("Password: User@123");
    console.log("Email: jane@example.com");
    console.log("Password: User@123");

    console.log("\n🎉 Database seeded successfully!");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();
