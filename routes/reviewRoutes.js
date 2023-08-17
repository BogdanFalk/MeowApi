const express = require('express');
const reviewService = require('../services/reviewService');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const review = await reviewService.addReview(req.body);
        res.status(201).send(review);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/product/:productId', async (req, res) => {
    try {
        const reviews = await reviewService.getReviewsByProductId(req.params.productId);
        res.status(200).send(reviews);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
