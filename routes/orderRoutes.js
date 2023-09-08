const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.get("/user/:userId/orders", async (req, res) => {
  const { userId } = req.params;
  const { page = 1 } = req.query; // default to page 1 if not provided
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const orders = await Order.find({ buyer: userId })
      .skip(offset)
      .limit(limit)
      .populate("products.product") // Optional: if you want product details too.
      .exec();

    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/order", async (req, res) => {
  try {
    // Create a new order using the request body
    const order = new Order(req.body);

    // Save the order to the database
    await order.save();

    // Send a successful response along with the order details
    res.status(201).send(order);
  } catch (error) {
    // If there's an error (e.g., validation error), send a 400 response with the error message
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
