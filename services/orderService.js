const Order = require("../models/Order");

async function getUserOrders(userId, page = 1) {
  const limit = 10;
  const offset = (page - 1) * limit;

  const orders = await Order.find({ buyer: userId }, "-buyer")
    .skip(offset)
    .limit(limit)
    .exec();

  const totalOrders = await Order.countDocuments({ buyer: userId });

  return {
    orders,
    totalPages: Math.ceil(totalOrders / limit),
    currentPage: page,
  };
}

async function createOrder(orderData) {
  // Create a new order using the provided data
  const order = new Order(orderData);

  // Save the order to the database
  await order.save();

  return order;
}

module.exports = {
  getUserOrders,
  createOrder,
};
