const AdminModel = require("../models/adminModel");
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinary');
const ProductModel = require("../models/productModel");
// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'product_images', // folder name Cloudinary account
        format: async (req, file) => 'jpg', // supports promises as well
        public_id: (req, file) => Date.now() + '-' + file.originalname,
    },
});

const upload = multer({ storage: storage }).array('images', 10); //image size



const adminLogin = async (req, res) => {
    const { adminid, password } = req.body;
    const admin = await AdminModel.findOne({ adminid });
    if (!admin) {
        res.status(404).send({ msg: "Invalid Admin ID" });
    }

    if (admin.password != password) {
        res.status(401).send({ msg: "Invalid Password" });
    }

    res.status(200).send({ admin, msg: "Login Succesfully" });
}

const addProduct = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).send("Error uploading files: " + err.message);
        }

        try {
            const { name, category, description, price } = req.body;
            console.log(req.files);
            const imageUrls = req.files.map(file => file.path);
            const product = await ProductModel.create({
                name: name,
                category: category,
                description: description,
                price: price,
                defaultImage: imageUrls[0],
                images: imageUrls
            })
            /*
            const newProduct = new ProductModel({
                name: Pname,
                brand: Pbrand,
                price: Pprice,
                description: Pdescription,
                category: Pcategory,
                tags: Ptags,
                images: imageUrls,
                defaultImage: imageUrls[0] 
            });

            await newProduct.save();
             */
            res.status(200).send("Data saved successfully!");
        
        } catch (error) {
            res.status(500).send("Error saving data: " + error.message);
        }
    });
}

module.exports = {
    adminLogin,
    addProduct
}