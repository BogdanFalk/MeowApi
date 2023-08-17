const Product = require('../models/Product');

const addProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

const getProducts = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return await Product.find().populate("user").skip(skip).limit(limit).exec();
};

const getProductById = async (id) => {
    return await Product.findById(id).populate("user");
};

const deleteProductById = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = {
    addProduct,
    getProducts,
    getProductById,
    deleteProductById
};
