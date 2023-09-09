const mongoose = require('mongoose');

const productEmbeddedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: String,
    price: {
        type: Number,
        required: true
    },
    images: [String],
    description: String
}, { _id: false }); // This ensures that MongoDB doesn't automatically assign an _id to each embedded product


const orderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [productEmbeddedSchema],
    totalPrice: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);