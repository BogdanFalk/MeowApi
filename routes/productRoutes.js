const express = require('express');
const productService = require('../services/productService');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const product = await productService.addProduct(req.body);
        res.status(201).send(product);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    const { page, limit } = req.query;
    try {
        const products = await productService.getProducts(Number(page), Number(limit));
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await productService.deleteProductById(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
