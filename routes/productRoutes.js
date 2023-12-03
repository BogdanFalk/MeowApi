const express = require("express");
const productService = require("../services/productService");
const { uploadHandler, uploadToGCS } = require("../helpers/googlemulter");

const router = express.Router();

router.post("/", uploadHandler, uploadToGCS, async (req, res) => {
  try {
    // Check if the file upload process was successful
    if (!req.file || !req.file.cloudStoragePublicUrl) {
      throw new Error("File upload failed");
    }

    const productData = {
      ...req.body,
      images: [req.file.cloudStoragePublicUrl],
    };

    const product = await productService.addProduct(productData);
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  const { page, limit } = req.query;
  try {
    const products = await productService.getProducts(
      Number(page),
      Number(limit)
    );
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await productService.deleteProductById(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
