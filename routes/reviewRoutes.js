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

router.get('/user/:userId', async (req, res) => {
    try {
        const reviews = await reviewService.getReviewsByUserId(req.params.userId);
        res.status(200).send(reviews);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/product/:productId/user/:userId', async (req, res) => {
    try {
        const { productId, userId } = req.params;
        const review = await reviewService.getUserReviewForProduct(productId, userId);
        if (review) {
            res.status(200).send(review);
        } else {
            res.status(404).send({ error: 'Review not found' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


router.get("/average/:id", async (req, res) => {
    try {
      const avgscore = await reviewService.getAverageScoreByProductId(
        req.params.id
      );
      if (avgscore) {
        res.status(200).send(avgscore);
      } else {
        res.status(404).send({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });


module.exports = router;
