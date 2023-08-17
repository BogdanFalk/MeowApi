const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    score: {
        type: Number, // You can use mongoose's Decimal128 for precise values if needed
        required: true,
        min: 0, // assuming 0 as the minimum score value
        max: 5  // assuming 5 as the maximum score value
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
