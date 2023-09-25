const Review = require("../models/Review");

const addReview = async (reviewData) => {
  const review = new Review(reviewData);
  return await review.save();
};

const getReviewsByProductId = async (productId) => {
  return await Review.find({ product: productId }).populate("user").exec();
};

const getReviewsByUserId = async (userId) => {
  return await Review.find({ user: userId }).populate("product").exec();
};

const getUserReviewForProduct = async (productId, userId) => {
  return await Review.findOne({ product: productId, user: userId }).exec();
};

module.exports = {
  addReview,
  getReviewsByProductId,
  getReviewsByUserId,
  getUserReviewForProduct,
};
