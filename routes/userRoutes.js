const express = require("express");
const userService = require("../services/userService");
const { sendEmail } = require("../services/emailService");
const { uploadHandler, uploadToGCS } = require("../helpers/googlemulter");

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

router.put("/:id", async (req, res) => {
  try {
    const user = await userService.updateUserProfile(req.params.id, req.body);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
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
    "sicoealexandra97@gmail.com",
    subject,
    text,
    html
  );

  if (success === false) {
    res.status(500).json({ error: "Oops a fost o problema la trimiterea mesajului." });
  } else {
    res.status(200).json({ message: "Mesaj trimis cu success!" });
  }
});

router.post("/:id/image", uploadHandler, uploadToGCS, async (req, res) => {
  try {
    // Check if image file is present in the request
    console.log(req);
    if (!req.file || !req.file.cloudStoragePublicUrl) {
      throw new Error("File upload failed");
    }


    // Get user ID from request parameters
    const userId = req.params.id;

    // Get the image URL from the request after it has been uploaded to Google Cloud Storage
    const imageUrl = req.file.cloudStoragePublicUrl; // Assuming the uploaded image URL is available in req.file.url
    console.log(imageUrl)
    // Update the user document with the image URL
    await userService.updateUserImage(userId, imageUrl);

    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



module.exports = router;
