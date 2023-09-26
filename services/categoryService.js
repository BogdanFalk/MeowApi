const Category = require('../models/Category');

const getAllCategories = async () => {
    try {
        const categories = await Category.find({ parentId: null }).populate({
            path: 'children',
            populate: {
                path: 'children',
                // potentially add more populate here for deeper levels
            }
        });
        return categories;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllCategories,
};