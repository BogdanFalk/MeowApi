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


const getAllLeafCategories = async () => {
  const topLevelCategories = await Category.find({ parentId: null }).lean();

  for (const category of topLevelCategories) {
    category.leafCategories = await findLeafCategories(category._id, []);
  }

  return topLevelCategories;
};

const findLeafCategories = async (parentId, leafCategories) => {
  const childCategories = await Category.find({ parentId: parentId }).lean();

  if (childCategories.length === 0) {
    // If there are no child categories, this is a leaf category
    const parentCategory = await Category.findById(parentId).lean();
    leafCategories.push({ id: parentId, title: parentCategory.title });
  } else {
    for (const childCategory of childCategories) {
      await findLeafCategories(childCategory._id, leafCategories);
    }
  }

  return leafCategories;
};

module.exports = {
  getAllCategories,
  getAllLeafCategories
};
