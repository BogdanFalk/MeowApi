const Category = require("../models/Category");

const getAllCategories = async () => {
  const categories = await Category.find().lean();

  console.log("Categories from DB:", categories); // Check if categories are retrieved from the DB

  const mapToHierarchy = (categories, parentId = null) => {
    const result = [];

    categories
      .filter((category) => String(category.parentId) === String(parentId))
      .forEach((category) => {
        console.log("Mapping category:", category); // Check which categories are being processed

        const children = mapToHierarchy(categories, category._id.toString());
        if (children.length) {
          category.children = children;
        }
        result.push(category);
      });

    return result;
  };

  const hierarchicalCategories = mapToHierarchy(categories);
  console.log("Hierarchical Categories:", hierarchicalCategories); // Check the final hierarchical structure

  return hierarchicalCategories;
};

module.exports = {
  getAllCategories,
};
