const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "bogdan37falk@gmail.com",
    pass: "7kaLcKAhFgEH9XwO",
  },
});

const sendEmail = async (from, to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: from ? from : "bogdan37falk@gmail.com",
      to,
      subject,
      text,
      html,
    });
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = {
  sendEmail,
};
