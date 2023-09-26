const Category = require('../models/categoryModel');

const getAllCategories = async () => {
  const categories = await Category.find().lean();
  
  const mapToHierarchy = (categories, parentId = null) => {
    const result = [];
    categories.filter(category => category.parentId === parentId).forEach(category => {
      const children = mapToHierarchy(categories, category._id.toString());
      if (children.length) {
        category.children = children;
      }
      result.push(category);
    });
    return result;
  };
  
  return mapToHierarchy(categories);
};

module.exports = {
  getAllCategories
};
