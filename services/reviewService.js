const Review = require('../models/Review');

const addReview = async (reviewData) => {
    const review = new Review(reviewData);
    return await review.save();
};

const getReviewsByProductId = async (productId) => {
    return await Review.find({ product: productId }).populate('user').exec();
};

module.exports = {
    addReview,
    getReviewsByProductId
};
