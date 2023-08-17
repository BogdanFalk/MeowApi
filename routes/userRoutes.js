const express = require('express');
const userService = require('../services/userService');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).send({ user });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).send({ error: 'Email is already registered.' });
    } else {
      res.status(400).send({ error: err.message });
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    req.session.userId = user._id;
    res.send({ user });
  } catch (error) {
    if (error.message === 'User not found!' || error.message === 'Password is incorrect!') {
      res.status(401).send({ error: error.message });
    } else {
      res.status(400).send({ error: error.message });
    }
  }
});

module.exports = router;
