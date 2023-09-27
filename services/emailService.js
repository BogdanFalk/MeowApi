const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (from, to, subject, text, html) => {
  const msg = {
    from: from ? from : "bogdan37falk@gmail.com",
    to,
    subject,
    text,
    html,
  };

  try {
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
        return true;
      })
      .catch((error) => {
        throw error;
      });
  
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = {
  sendEmail,
};
