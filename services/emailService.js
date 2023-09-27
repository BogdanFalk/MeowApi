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
