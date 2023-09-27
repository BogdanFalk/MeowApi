const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false,
  auth: {
    user: "apikey",
    pass: "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",
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
