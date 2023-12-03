const express = require('express');
const router = express.Router();
const categoryService = require('../services/categoryService');

router.get('/', async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/leaf',async (req, res) => {
  try {
    const categories = await categoryService.getAllLeafCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

module.exports = router;
