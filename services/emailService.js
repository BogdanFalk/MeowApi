const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("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");

const sendEmail = async (from, to, subject, text, html) => {
  const msg = {
    from,
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
        return false
      });
  
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = {
  sendEmail,
};
