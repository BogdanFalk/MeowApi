const express = require("express");
const router = express.Router();
const orderService = require("../services/orderService");

router.get("/user/:userId/orders", async (req, res) => {
  try {
    const result = await orderService.getUserOrders(req.params.userId, req.query.page);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/user/:userId/lastOrder", async (req, res) => {
  try {
    const result = await orderService.getUserOrders(req.params.userId);    
    res.status(200).send(result.orders[0]);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/order", async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
