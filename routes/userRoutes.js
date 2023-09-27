const express = require("express");
const userService = require("../services/userService");
const { sendEmail } = require("../services/emailService");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).send({ user });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).send({ error: "Email is already registered." });
    } else {
      res.status(400).send({ error: err.message });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    req.session.userId = user._id;
    res.send({ user });
  } catch (error) {
    if (
      error.message === "User not found!" ||
      error.message === "Password is incorrect!"
    ) {
      res.status(401).send({ error: error.message });
    } else {
      res.status(400).send({ error: error.message });
    }
  }
});

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const subject = `Contact Form Submission from ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
  const html = `
    <h1>Contact Form Submission</h1>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
  `;

  const success = await sendEmail(
    "contact@e20.ro",
    "office@e20.ro",
    subject,
    text,
    html
  );

  if (success) {
    res.status(200).json({ message: "Email successfully sent!" });
  } else {
    res.status(500).json({ error: "There was an error sending the email" });
  }
});

module.exports = router;
